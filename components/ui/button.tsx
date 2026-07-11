import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-md border px-4 text-sm font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-line-strong bg-surface text-ink hover:border-accent hover:text-accent active:bg-surface-2",
        accent: "border-accent bg-accent text-accent-contrast hover:bg-accent-strong active:bg-accent",
        ghost: "border-transparent bg-transparent text-ink-2 hover:bg-surface-2 hover:text-ink active:bg-surface-3",
      },
      size: {
        default: "min-h-11 px-4",
        sm: "min-h-9 px-3 text-sm",
        icon: "size-11 p-0",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
