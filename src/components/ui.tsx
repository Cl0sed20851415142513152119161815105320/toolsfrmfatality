import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-control px-4 text-sm font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground disabled:pointer-events-none disabled:opacity-40 min-h-11",
  {
    variants: {
      variant: {
        primary: "bg-cash text-ink hover:bg-cash-deep",
        secondary: "border border-line bg-surface text-foreground hover:border-line-strong hover:bg-surface-2",
        ghost: "text-muted hover:bg-surface hover:text-foreground",
        danger: "text-danger hover:bg-surface",
      },
      size: {
        md: "px-4",
        full: "w-full px-4",
        icon: "size-11 px-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function Button({
  asChild = false,
  className,
  variant,
  size,
  type = "button",
  ...props
}: ButtonProps) {
  if (asChild) {
    return <Slot className={cn(buttonVariants({ variant, size }), className)} {...props} />;
  }
  return (
    <button type={type} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}

export function buttonClass(options?: VariantProps<typeof buttonVariants>) {
  return buttonVariants(options);
}

export const fieldClass =
  "w-full rounded-control border border-line bg-background px-3 text-base text-foreground outline-none transition-colors duration-150 placeholder:text-faint focus:border-cash";

export function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-foreground">{label}</span>
      {children}
      {error ? (
        <span className="text-sm text-danger" role="alert">
          {error}
        </span>
      ) : hint ? (
        <span className="text-sm text-faint">{hint}</span>
      ) : null}
    </label>
  );
}
