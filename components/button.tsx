import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "wa";
type Size = "lg" | "default" | "sm";

const variantClass: Record<Variant, string> = {
  primary: "btn--primary",
  secondary: "btn--secondary",
  ghost: "btn--ghost",
  wa: "btn--wa",
};

const sizeClass: Record<Size, string> = {
  lg: "btn--lg",
  default: "",
  sm: "btn--sm",
};

interface BaseProps {
  variant?: Variant;
  size?: Size;
  block?: boolean;
  children: ReactNode;
  className?: string;
}

type AnchorProps = BaseProps & {
  href: string;
  external?: boolean;
} & Omit<ComponentProps<"a">, "href" | "className" | "children">;

type ButtonProps = BaseProps &
  Omit<ComponentProps<"button">, "className" | "children">;

function classes(
  variant: Variant,
  size: Size,
  block: boolean,
  className?: string
) {
  return cn(
    "btn",
    variantClass[variant],
    sizeClass[size],
    block && "btn--block",
    className
  );
}

export function Button(props: AnchorProps | ButtonProps) {
  if ("href" in props) {
    const {
      variant = "primary",
      size = "default",
      block = false,
      className,
      children,
      href,
      external,
      ...rest
    } = props;
    const cls = classes(variant, size, block, className);
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cls}
          {...rest}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} {...rest}>
        {children}
      </Link>
    );
  }

  const {
    variant = "primary",
    size = "default",
    block = false,
    className,
    children,
    ...rest
  } = props;
  const cls = classes(variant, size, block, className);
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
