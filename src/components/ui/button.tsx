import { forwardRef } from "react";
import { cn } from "@/lib/utils";

/* --------------------------------------------------------------------------
   BUTTON
   --------------------------------------------------------------------------
   Design tokens:
   - Minimal border-radius (--radius-md)
   - Firm, industrial feel — not playful
   - Clear hover/focus states
   - Accessible focus ring
   -------------------------------------------------------------------------- */

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "accent";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Makes button full-width */
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-800 text-white hover:bg-brand-700 active:bg-brand-900 border border-brand-800 hover:border-brand-700",
  secondary:
    "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 active:bg-neutral-300 border border-neutral-200",
  outline:
    "bg-transparent text-neutral-800 hover:bg-neutral-50 active:bg-neutral-100 border border-neutral-300 hover:border-neutral-400",
  ghost:
    "bg-transparent text-neutral-700 hover:bg-neutral-100 active:bg-neutral-200 border border-transparent",
  accent:
    "bg-accent-600 text-white hover:bg-accent-700 active:bg-accent-800 border border-accent-600 hover:border-accent-700",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm gap-1.5",
  md: "px-5 py-2.5 text-sm gap-2",
  lg: "px-7 py-3.5 text-base gap-2.5",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      fullWidth = false,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          // Base
          "inline-flex items-center justify-center font-medium",
          "rounded-[var(--radius-md)]",
          "transition-colors duration-[var(--duration-fast)]",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500",
          "disabled:opacity-50 disabled:pointer-events-none",
          "select-none whitespace-nowrap",
          // Variant
          variantStyles[variant],
          // Size
          sizeStyles[size],
          // Full width
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
