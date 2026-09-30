import { cn } from "@/lib/utils";

/* --------------------------------------------------------------------------
   CARD
   --------------------------------------------------------------------------
   Clean, minimal card with subtle border. No excessive rounding or shadows.
   Industrial and precise.
   -------------------------------------------------------------------------- */

interface CardProps {
  children: React.ReactNode;
  className?: string;
  /** Adds hover lift effect */
  hoverable?: boolean;
  /** Padding size */
  padding?: "none" | "sm" | "md" | "lg";
  as?: "div" | "article" | "li";
}

const paddingStyles = {
  none: "",
  sm: "p-[var(--space-4)]",
  md: "p-[var(--space-6)]",
  lg: "p-[var(--space-8)]",
};

export function Card({
  children,
  className,
  hoverable = false,
  padding = "md",
  as: Component = "div",
}: CardProps) {
  return (
    <Component
      className={cn(
        "bg-[var(--color-bg-primary)]",
        "border border-[var(--color-border-default)]",
        "rounded-[var(--radius-md)]",
        paddingStyles[padding],
        hoverable && [
          "transition-all duration-[var(--duration-normal)]",
          "hover:shadow-[var(--shadow-md)]",
          "hover:border-[var(--color-border-strong)]",
        ],
        className
      )}
    >
      {children}
    </Component>
  );
}

/* --------------------------------------------------------------------------
   BADGE
   -------------------------------------------------------------------------- */

type BadgeVariant = "default" | "brand" | "accent" | "success" | "warning" | "error";
type BadgeSize = "sm" | "md" | "lg";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
}

const badgeVariants: Record<BadgeVariant, string> = {
  default: "bg-neutral-100 text-neutral-700 border-neutral-200",
  brand: "bg-brand-50 text-brand-700 border-brand-200",
  accent: "bg-accent-50 text-accent-700 border-accent-200",
  success: "bg-green-50 text-green-700 border-green-200",
  warning: "bg-amber-50 text-amber-700 border-amber-200",
  error: "bg-red-50 text-red-700 border-red-200",
};

const badgeSizes: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-[11px]",
  md: "px-2.5 py-1 text-xs",
  lg: "px-3 py-1.5 text-sm",
};

export function Badge({
  children,
  className,
  variant = "default",
  size = "md",
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-sm border",
        badgeSizes[size],
        badgeVariants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

/* --------------------------------------------------------------------------
   DIVIDER
   -------------------------------------------------------------------------- */

interface DividerProps {
  className?: string;
  orientation?: "horizontal" | "vertical";
}

export function Divider({
  className,
  orientation = "horizontal",
}: DividerProps) {
  return (
    <div
      role="separator"
      className={cn(
        "bg-[var(--color-border-default)]",
        orientation === "horizontal" ? "h-px w-full" : "w-px h-full",
        className
      )}
    />
  );
}
