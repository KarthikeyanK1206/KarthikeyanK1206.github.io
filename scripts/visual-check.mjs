import { chromium } from "playwright-core";
import AxeBuilder from "@axe-core/playwright";

const baseUrl = process.env.PORTFOLIO_URL ?? "http://127.0.0.1:3003";
const executablePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const browser = await chromium.launch({ headless: true, executablePath });

const scenarios = [
  { name: "home-desktop-light", path: "/", width: 1440, height: 1100, colorScheme: "light", reducedMotion: "no-preference" },
  { name: "home-mobile-light", path: "/", width: 390, height: 844, colorScheme: "light" },
  { name: "home-reflow-320", path: "/", width: 320, height: 844, colorScheme: "light" },
  { name: "home-desktop-dark", path: "/", width: 1440, height: 1100, colorScheme: "dark" },
  { name: "work-mobile", path: "/work", width: 390, height: 844, colorScheme: "light" },
  { name: "experience-mobile", path: "/experience", width: 390, height: 844, colorScheme: "light" },
  { name: "about-desktop", path: "/about", width: 1440, height: 1100, colorScheme: "dark" },
  { name: "resume-mobile", path: "/resume", width: 390, height: 844, colorScheme: "light" },
  { name: "nimbus-mobile", path: "/work/nimbusvault", width: 390, height: 844, colorScheme: "light" },
  { name: "nimbus-desktop", path: "/work/nimbusvault", width: 1440, height: 1100, colorScheme: "light" },
  { name: "raplscope-mobile", path: "/work/raplscope", width: 390, height: 844, colorScheme: "light" },
  { name: "raplscope-desktop", path: "/work/raplscope", width: 1440, height: 1100, colorScheme: "light" },
  { name: "raef-mobile", path: "/work/raef", width: 390, height: 844, colorScheme: "dark" },
  { name: "raef-desktop", path: "/work/raef", width: 1440, height: 1100, colorScheme: "dark" },
];

const results = [];

for (const scenario of scenarios) {
  const context = await browser.newContext({
    viewport: { width: scenario.width, height: scenario.height },
    colorScheme: scenario.colorScheme,
    reducedMotion: scenario.reducedMotion ?? "reduce",
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  const consoleErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => consoleErrors.push(error.message));

  const response = await page.goto(`${baseUrl}${scenario.path}`, { waitUntil: "networkidle" });
  const axe = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  const accessibilityViolations = axe.violations.map((violation) => ({
    id: violation.id,
    impact: violation.impact,
    help: violation.help,
    targets: violation.nodes.slice(0, 6).map((node) => node.target),
  }));
  const layout = await page.evaluate(() => {
    const root = document.documentElement;
    const visibleOverflow = [...document.querySelectorAll("body *")]
      .filter((element) => {
        const style = getComputedStyle(element);
        if (style.display === "none" || style.visibility === "hidden") return false;
        const box = element.getBoundingClientRect();
        return box.width > 0 && (box.right > innerWidth + 1 || box.left < -1);
      })
      .slice(0, 8)
      .map((element) => ({
        tag: element.tagName.toLowerCase(),
        className: typeof element.className === "string" ? element.className.slice(0, 120) : "",
        text: element.textContent?.trim().replace(/\s+/g, " ").slice(0, 90) ?? "",
        rect: element.getBoundingClientRect().toJSON(),
      }));

    return {
      innerWidth,
      scrollWidth: root.scrollWidth,
      bodyScrollWidth: document.body.scrollWidth,
      h1: document.querySelector("h1")?.textContent?.trim() ?? null,
      mainTextLength: document.querySelector("main")?.textContent?.trim().length ?? 0,
      visibleOverflow,
    };
  });

  const screenshot = `/private/tmp/kk-${scenario.name}.png`;
  await page.screenshot({ path: screenshot, fullPage: false });
  let architectureScreenshot = null;
  const architectureFigure = page.locator(".architecture-figure").first();
  if (await architectureFigure.count()) {
    architectureScreenshot = `/private/tmp/kk-${scenario.name}-architecture.png`;
    await architectureFigure.screenshot({ path: architectureScreenshot });
  }
  let interactions = null;
  if (scenario.name === "home-mobile-light") {
    const menuButton = page.locator(".mobile-menu-button");
    await menuButton.click();
    await page.waitForSelector("#mobile-navigation");
    interactions = {
      menuExpanded: await menuButton.getAttribute("aria-expanded"),
      focusedAfterOpen: await page.evaluate(() => document.activeElement?.textContent?.trim() ?? null),
    };
    await page.locator("#mobile-navigation a").last().focus();
    await page.keyboard.press("Tab");
    await page.waitForFunction(() => !document.querySelector("#mobile-navigation"));
    interactions.menuPresentAfterTabOut = await page.locator("#mobile-navigation").count();
    interactions.focusedAfterTabOut = await page.evaluate(() => document.activeElement?.textContent?.trim().replace(/\s+/g, " ").slice(0, 80) ?? null);
    await menuButton.click();
    await page.waitForSelector("#mobile-navigation");
    await page.keyboard.press("Escape");
    interactions.menuExpandedAfterEscape = await menuButton.getAttribute("aria-expanded");
    interactions.focusedAfterEscape = await page.evaluate(() => document.activeElement?.getAttribute("aria-label") ?? null);
  }
  if (scenario.name === "home-desktop-light") {
    await page.keyboard.press("Tab");
    interactions = {
      firstTabClass: await page.evaluate(() => document.activeElement?.className ?? null),
    };
    await page.keyboard.press("Enter");
    interactions.focusedAfterSkip = await page.evaluate(() => document.activeElement?.id ?? null);
    await page.getByRole("link", { name: "All case studies" }).focus();
    await page.keyboard.press("Tab");
    const projectCard = page.locator(".preview-card").first();
    await page.waitForTimeout(180);
    interactions.projectFocus = await projectCard.evaluate((card) => ({
      backgroundColor: getComputedStyle(card).backgroundColor,
      arrowTransform: getComputedStyle(card.querySelector(".preview-cta svg")).transform,
    }));
  }
  if (scenario.name === "home-desktop-dark") {
    await page.getByRole("link", { name: "All case studies" }).focus();
    await page.keyboard.press("Tab");
    const projectCard = page.locator(".preview-card").first();
    await page.waitForFunction(() => document.activeElement?.classList.contains("preview-card"));
    await page.waitForTimeout(200);
    interactions = {
      projectFocusReduced: await projectCard.evaluate((card) => ({
        backgroundColor: getComputedStyle(card).backgroundColor,
        backgroundIsTransparent: getComputedStyle(card).backgroundColor === "rgba(0, 0, 0, 0)" || getComputedStyle(card).backgroundColor.endsWith("/ 0)"),
        arrowTransform: getComputedStyle(card.querySelector(".preview-cta svg")).transform,
      })),
    };
  }
  results.push({
    scenario: scenario.name,
    status: response?.status(),
    screenshot,
    architectureScreenshot,
    consoleErrors,
    accessibilityViolations,
    interactions,
    ...layout,
  });
  await context.close();
}

await browser.close();
console.log(JSON.stringify(results, null, 2));

const failures = results.filter((result) =>
  result.status !== 200 ||
  !result.h1 ||
  result.mainTextLength === 0 ||
  result.consoleErrors.length > 0 ||
  result.accessibilityViolations.length > 0 ||
  result.visibleOverflow.length > 0 ||
  result.scrollWidth > result.innerWidth + 1 ||
  result.bodyScrollWidth > result.innerWidth + 1 ||
  (result.scenario === "home-desktop-light" &&
    (result.interactions?.firstTabClass !== "skip-link" ||
      result.interactions?.focusedAfterSkip !== "content" ||
      result.interactions?.projectFocus?.backgroundColor === "rgba(0, 0, 0, 0)" ||
      result.interactions?.projectFocus?.arrowTransform === "none")) ||
  (result.scenario === "home-desktop-dark" &&
    (result.interactions?.projectFocusReduced?.backgroundIsTransparent ||
      result.interactions?.projectFocusReduced?.arrowTransform !== "none")) ||
  (result.scenario === "home-mobile-light" &&
    (result.interactions?.menuExpanded !== "true" ||
      result.interactions?.focusedAfterOpen !== "Work" ||
      result.interactions?.menuExpandedAfterEscape !== "false" ||
      result.interactions?.focusedAfterEscape !== "Open navigation" ||
      result.interactions?.menuPresentAfterTabOut !== 0))
);

if (failures.length > 0) {
  console.error(`Accessibility/visual checks failed: ${failures.map((result) => result.scenario).join(", ")}`);
  process.exitCode = 1;
}
