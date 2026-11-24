"use client";

import type { ChangeEvent } from "react";
import { cn } from "@/lib/cn";

export interface FieldProps {
  id: string;
  label?: string;
  placeholder: string;
  type?: string;
  options?: string[];
  onLight?: boolean;
  value?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  onChange?: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  className?: string;
}

export function Field({
  id,
  label,
  placeholder,
  type = "text",
  options,
  onLight = false,
  value,
  disabled,
  required,
  name,
  onChange,
  className,
}: FieldProps) {
  const controlClass = cn(
    "h-[52px] w-full box-border rounded-sm border-0 bg-white px-space-4 font-sans text-body font-medium text-ink placeholder:text-text-muted focus-visible:focus-ring disabled:cursor-not-allowed disabled:opacity-50",
    onLight && "border-2 border-border-control",
    className,
  );

  const visibleLabel = label || placeholder;
  const controlled = value !== undefined;

  return (
    <div className="relative">
      <label htmlFor={id} className="sr-only">
        {visibleLabel}
      </label>
      {options ? (
        <select
          id={id}
          name={name}
          className={controlClass}
          disabled={disabled}
          required={required}
          aria-label={visibleLabel}
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
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          className={controlClass}
          disabled={disabled}
          required={required}
          {...(controlled ? { value, onChange } : { onChange })}
        />
      )}
    </div>
  );
}
