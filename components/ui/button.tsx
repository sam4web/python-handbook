"use client";

import { cx } from "@/lib/utils";
import { ButtonHTMLAttributes, ReactNode } from "react";

const baseStyles = "border-2 hover:opacity-85 shadow-xs py-1 px-2";
const variantStyles = {
  primary: `bg-primary border-primary text-primary-foreground ${baseStyles}`,
  outline: `bg-transparent border-secondary-foreground text-secondary-foreground hover:bg-muted-foreground/15 ${baseStyles}`,
  icon: "bg-transparent [&>svg]:size-5 p-1.5 [&>svg]:text-foreground border-transparent border hover:border-secondary hover:shadow-xs hover:[&>svg]:text-primary rounded-md!",
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
        "transition-all text-center cursor-pointer rounded-sm text-foreground font-medium disabled:opacity-75 disabled:translate-y-0!",
        variantStyles[variant],
        className ? className : ""
      )}
      {...props}
    >
      {children}
    </button>
  );
}
