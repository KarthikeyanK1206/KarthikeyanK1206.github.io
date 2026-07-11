"use client";

import { ArrowUpRight, Code2, Contact, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { profile } from "@/lib/data/profile";

const NAV_ITEMS = [
  { href: "/work", label: "Work" },
  { href: "/experience", label: "Experience" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
];

export function SiteHeader() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);
  const previousPathRef = useRef(path);

  useEffect(() => {
    if (previousPathRef.current !== path) setOpen(false);
    previousPathRef.current = path;
  }, [path]);
  useEffect(() => {
    if (!open) return;
    firstMobileLinkRef.current?.focus();
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  function isActive(href: string) {
    return path === href || path.startsWith(`${href}/`);
  }

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="brand-link" aria-label={`${profile.name}, home`}>
          <span className="brand-mark" aria-hidden="true">KK</span>
          <span className="brand-copy">
            <strong>Karthikeyan</strong>
            <small>Backend & distributed systems</small>
          </span>
        </Link>

        <nav aria-label="Primary navigation" className="desktop-nav">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn("nav-link", isActive(item.href) && "nav-link-active")}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <a
            className="icon-button desktop-social"
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile (opens in a new tab)"
            title="GitHub profile (opens in a new tab)"
          >
            <Code2 size={18} strokeWidth={1.8} />
          </a>
          <a
            className="icon-button desktop-social"
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn profile (opens in a new tab)"
            title="LinkedIn profile (opens in a new tab)"
          >
            <Contact size={18} strokeWidth={1.8} />
          </a>
          <ThemeToggle />
          <button
            ref={menuButtonRef}
            type="button"
            className="icon-button mobile-menu-button"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close navigation" : "Open navigation"}
            title={open ? "Close navigation" : "Open navigation"}
            onClick={() => setOpen((current) => !current)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-navigation"
          className="mobile-nav"
          onBlur={(event) => {
            const navigation = event.currentTarget;
            window.requestAnimationFrame(() => {
              if (!navigation.contains(document.activeElement)) setOpen(false);
            });
          }}
        >
            <nav aria-label="Mobile navigation" className="mobile-nav-inner">
              {NAV_ITEMS.map((item, index) => (
                <Link
                  ref={index === 0 ? firstMobileLinkRef : undefined}
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn("mobile-nav-link", isActive(item.href) && "mobile-nav-link-active")}
                >
                  {item.label}
                </Link>
              ))}
              <div className="mobile-socials">
                <a href={profile.github} target="_blank" rel="noreferrer">
                  <Code2 size={18} /> GitHub <ArrowUpRight size={14} />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer">
                  <Contact size={18} /> LinkedIn <ArrowUpRight size={14} />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </div>
            </nav>
          </div>
      )}
    </header>
  );
}
