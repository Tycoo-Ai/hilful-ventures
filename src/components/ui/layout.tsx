import { cn } from "@/lib/utils";

/* --------------------------------------------------------------------------
   CONTAINER
   --------------------------------------------------------------------------
   Responsive centered container with consistent horizontal padding.
   Adapts max-width based on the `size` prop.
   -------------------------------------------------------------------------- */

type ContainerSize = "sm" | "md" | "lg" | "xl" | "2xl" | "full";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: ContainerSize;
  /** HTML element to render as */
  as?: "div" | "section" | "article" | "main" | "header" | "footer";
}

const sizeStyles: Record<ContainerSize, string> = {
  sm: "max-w-[var(--container-sm)]",
  md: "max-w-[var(--container-md)]",
  lg: "max-w-[var(--container-lg)]",
  xl: "max-w-[var(--container-xl)]",
  "2xl": "max-w-[var(--container-2xl)]",
  full: "max-w-[var(--container-max)]",
};

export function Container({
  children,
  className,
  size = "xl",
  as: Component = "div",
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full px-[var(--container-padding)]",
        sizeStyles[size],
        className
      )}
    >
      {children}
    </Component>
  );
}

/* --------------------------------------------------------------------------
   SECTION
   --------------------------------------------------------------------------
   Vertical page section with consistent spacing. Used to compose page layouts.
   -------------------------------------------------------------------------- */

type SectionSpacing = "sm" | "md" | "lg" | "xl" | "none";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  spacing?: SectionSpacing;
  /** Background color variant */
  background?: "primary" | "secondary" | "inverse" | "brand" | "default";
  id?: string;
}

const spacingStyles: Record<SectionSpacing, string> = {
  none: "",
  sm: "py-[var(--space-8)]",
  md: "py-[var(--space-12)]",
  lg: "py-[var(--space-16)]",
  xl: "py-[var(--space-24)]",
};

const backgroundStyles: Record<string, string> = {
  default: "bg-[var(--color-bg-primary)]",
  primary: "bg-[var(--color-bg-primary)]",
  secondary: "bg-[var(--color-bg-secondary)]",
  inverse: "bg-[var(--color-bg-inverse)] text-[var(--color-text-inverse)]",
  brand: "bg-[var(--color-bg-brand)] text-[var(--color-text-inverse)]",
};

export function Section({
  children,
  className,
  spacing = "lg",
  background = "primary",
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        spacingStyles[spacing],
        backgroundStyles[background],
        className
      )}
    >
      {children}
    </section>
  );
}

/* --------------------------------------------------------------------------
   PAGE HEADER
   --------------------------------------------------------------------------
   Consistent heading block for interior pages (About, Services, etc.)
   -------------------------------------------------------------------------- */

interface PageHeaderProps {
  eyebrow?: string;
  badge?: string;
  title: string;
  description?: string;
  subtitle?: string;
  breadcrumbs?: { label: string; href?: string }[];
  className?: string;
}

export function PageHeader({
  eyebrow,
  badge,
  title,
  description,
  subtitle,
  breadcrumbs,
  className,
}: PageHeaderProps) {
  const metaText = badge || eyebrow;
  const bodyText = subtitle || description;

  return (
    <div className={cn("border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-secondary)] py-[var(--space-10)]", className)}>
      <div className="mx-auto w-full px-[var(--container-padding)] max-w-[var(--container-xl)]">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-3">
            <ol className="flex items-center gap-1.5 text-xs text-neutral-500">
              {breadcrumbs.map((b, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  {i > 0 && <span className="text-neutral-400">/</span>}
                  {b.href ? (
                    <a href={b.href} className="hover:text-neutral-800 transition-colors">
                      {b.label}
                    </a>
                  ) : (
                    <span className="text-neutral-700 font-medium">{b.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        {metaText && (
          <p className="text-[var(--text-sm)] font-medium uppercase tracking-[var(--tracking-widest)] text-[var(--color-text-accent)] mb-2">
            {metaText}
          </p>
        )}
        <h1 className="text-[var(--text-3xl)] md:text-[var(--text-4xl)] lg:text-[var(--text-5xl)] font-bold tracking-[var(--tracking-tight)] leading-[var(--leading-tight)] text-[var(--color-text-primary)]">
          {title}
        </h1>
        {bodyText && (
          <p className="mt-3 text-[var(--text-base)] md:text-[var(--text-lg)] text-[var(--color-text-secondary)] leading-[var(--leading-relaxed)] max-w-3xl">
            {bodyText}
          </p>
        )}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   ASPECT RATIO IMAGE CONTAINER
   --------------------------------------------------------------------------
   Responsive container with controlled aspect ratio for images.
   Supports object positioning and optional blur placeholder.
   -------------------------------------------------------------------------- */

type AspectRatio = "square" | "video" | "wide" | "portrait" | "hero";

interface ImageContainerProps {
  children: React.ReactNode;
  className?: string;
  ratio?: AspectRatio;
}

const ratioStyles: Record<AspectRatio, string> = {
  square: "aspect-square",
  video: "aspect-video",
  wide: "aspect-[21/9]",
  portrait: "aspect-[3/4]",
  hero: "aspect-[16/7]",
};

export function ImageContainer({
  children,
  className,
  ratio = "video",
}: ImageContainerProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        "rounded-[var(--radius-md)]",
        ratioStyles[ratio],
        className
      )}
    >
      {children}
    </div>
  );
}
