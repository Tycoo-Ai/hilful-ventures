import { forwardRef } from "react";
import { cn } from "@/lib/utils";

/* --------------------------------------------------------------------------
   INPUT
   -------------------------------------------------------------------------- */

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-[var(--text-sm)] font-medium text-[var(--color-text-primary)] mb-[var(--space-2)]"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full px-[var(--space-4)] py-[var(--space-3)]",
            "text-[var(--text-base)] text-[var(--color-text-primary)]",
            "bg-[var(--color-bg-primary)]",
            "border border-[var(--color-border-default)]",
            "rounded-[var(--radius-md)]",
            "transition-colors duration-[var(--duration-fast)]",
            "placeholder:text-[var(--color-text-tertiary)]",
            "hover:border-[var(--color-border-strong)]",
            "focus:border-[var(--color-border-brand)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-500)]/20",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error && "border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-[var(--color-error)]/20",
            className
          )}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="mt-[var(--space-1)] text-[var(--text-sm)] text-[var(--color-error)]" role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${inputId}-helper`} className="mt-[var(--space-1)] text-[var(--text-sm)] text-[var(--color-text-tertiary)]">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

/* --------------------------------------------------------------------------
   TEXTAREA
   -------------------------------------------------------------------------- */

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-[var(--text-sm)] font-medium text-[var(--color-text-primary)] mb-[var(--space-2)]"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            "w-full px-[var(--space-4)] py-[var(--space-3)]",
            "text-[var(--text-base)] text-[var(--color-text-primary)]",
            "bg-[var(--color-bg-primary)]",
            "border border-[var(--color-border-default)]",
            "rounded-[var(--radius-md)]",
            "transition-colors duration-[var(--duration-fast)]",
            "placeholder:text-[var(--color-text-tertiary)]",
            "hover:border-[var(--color-border-strong)]",
            "focus:border-[var(--color-border-brand)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-500)]/20",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "resize-y min-h-[120px]",
            error && "border-[var(--color-error)]",
            className
          )}
          aria-invalid={error ? "true" : undefined}
          {...props}
        />
        {error && (
          <p className="mt-[var(--space-1)] text-[var(--text-sm)] text-[var(--color-error)]" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

/* --------------------------------------------------------------------------
   SELECT
   -------------------------------------------------------------------------- */

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, className, id, ...props }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-[var(--text-sm)] font-medium text-[var(--color-text-primary)] mb-[var(--space-2)]"
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={cn(
            "w-full px-[var(--space-4)] py-[var(--space-3)]",
            "text-[var(--text-base)] text-[var(--color-text-primary)]",
            "bg-[var(--color-bg-primary)]",
            "border border-[var(--color-border-default)]",
            "rounded-[var(--radius-md)]",
            "transition-colors duration-[var(--duration-fast)]",
            "hover:border-[var(--color-border-strong)]",
            "focus:border-[var(--color-border-brand)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-500)]/20",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "appearance-none cursor-pointer",
            error && "border-[var(--color-error)]",
            className
          )}
          aria-invalid={error ? "true" : undefined}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="mt-[var(--space-1)] text-[var(--text-sm)] text-[var(--color-error)]" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
