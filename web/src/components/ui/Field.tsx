"use client";

import type { ChangeEvent } from "react";
import { cn } from "@/lib/cn";

export interface FieldProps {
  id: string;
  label?: string;
  placeholder: string;
  type?: string;
  options?: string[];
  multiline?: boolean;
  rows?: number;
  showLabel?: boolean;
  onLight?: boolean;
  value?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  error?: string;
  onChange?: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => void;
  className?: string;
}

export function Field({
  id,
  label,
  placeholder,
  type = "text",
  options,
  multiline = false,
  rows = 4,
  showLabel = false,
  onLight = false,
  value,
  disabled,
  required,
  name,
  error,
  onChange,
  className,
}: FieldProps) {
  const controlClass = cn(
    "w-full box-border rounded-sm border-0 bg-white px-space-4 font-sans text-body font-medium text-ink placeholder:text-text-muted focus-visible:focus-ring disabled:cursor-not-allowed disabled:opacity-50",
    multiline ? "min-h-[120px] resize-y py-3.5" : "h-[52px]",
    onLight && "border-2 border-border-control",
    error && "border-2 border-orange-500",
    className,
  );

  const visibleLabel = label || placeholder;
  const controlled = value !== undefined;

  return (
    <div className="relative flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className={cn(
          showLabel
            ? "text-small font-bold text-ink"
            : "sr-only",
        )}
      >
        {visibleLabel}
      </label>
      {options ? (
        <select
          id={id}
          name={name}
          className={controlClass}
          disabled={disabled}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-label={showLabel ? undefined : visibleLabel}
          {...(controlled
            ? { value, onChange }
            : { defaultValue: "", onChange })}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : multiline ? (
        <textarea
          id={id}
          name={name}
          rows={rows}
          placeholder={placeholder}
          className={controlClass}
          disabled={disabled}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          {...(controlled ? { value, onChange } : { onChange })}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          className={controlClass}
          disabled={disabled}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          {...(controlled ? { value, onChange } : { onChange })}
        />
      )}
      {error ? (
        <p id={`${id}-error`} className="text-caption font-semibold text-orange-500" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
