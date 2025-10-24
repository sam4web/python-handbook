"use client";

import { cx } from "@/lib/utils";
import { ButtonHTMLAttributes, ReactNode } from "react";

const baseStyles = "border-2 hover:opacity-85 hover:-translate-y-0.5 shadow-xs py-1 lg:py-1.5 px-2 lg:px-3";
const variantStyles = {
  primary: `bg-primary border-primary text-primary-foreground ${baseStyles}`,
  icon: "bg-transparent [&>svg]:size-5 p-2.5 [&>svg]:text-foreground border-transparent border hover:border-border hover:shadow-xs hover:[&>svg]:text-primary rounded-lg!",
};

type Props = {
  children: ReactNode;
  variant: keyof typeof variantStyles;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ children, variant, className, title, ...props }: Props) {
  return (
    <button
      title={title ? title : children?.toString()}
      className={cx(
        "transition-all text-center cursor-pointer rounded-sm font-foreground font-medium disabled:opacity-75 disabled:translate-y-0!",
        variantStyles[variant],
        className ? className : ""
      )}
      {...props}
    >
      {children}
    </button>
  );
}
