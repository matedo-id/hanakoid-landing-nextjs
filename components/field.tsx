import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

function FieldShell({
  label,
  htmlFor,
  required,
  error,
  children,
}: {
  label?: string;
  htmlFor?: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("flex flex-col", error && "field--error")}>
      {label && (
        <label htmlFor={htmlFor} className="field-label">
          {label}
          {required && <span className="req">*</span>}
        </label>
      )}
      {children}
      {error && <span className="field-error">{error}</span>}
    </div>
  );
}

type FieldExtras = { label?: string; error?: string };

export function Input({
  label,
  error,
  required,
  id,
  className,
  ...rest
}: FieldExtras & ComponentProps<"input">) {
  return (
    <FieldShell label={label} htmlFor={id} required={required} error={error}>
      <input id={id} required={required} className={cn("input", className)} {...rest} />
    </FieldShell>
  );
}

export function Textarea({
  label,
  error,
  required,
  id,
  className,
  ...rest
}: FieldExtras & ComponentProps<"textarea">) {
  return (
    <FieldShell label={label} htmlFor={id} required={required} error={error}>
      <textarea
        id={id}
        required={required}
        className={cn("textarea", className)}
        {...rest}
      />
    </FieldShell>
  );
}

export function Select({
  label,
  error,
  required,
  id,
  className,
  children,
  ...rest
}: FieldExtras & ComponentProps<"select">) {
  return (
    <FieldShell label={label} htmlFor={id} required={required} error={error}>
      <select
        id={id}
        required={required}
        className={cn("select", className)}
        {...rest}
      >
        {children}
      </select>
    </FieldShell>
  );
}
