import { type ButtonHTMLAttributes } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      className={twMerge(
        clsx(
          "inline-flex items-center justify-center rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-burnt focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          {
            "bg-burnt text-white-pure hover:bg-burnt-dark shadow-md":
              variant === "primary",
            "border border-elephant/20 text-elephant hover:bg-elephant/5":
              variant === "outline",
            "text-elephant hover:bg-elephant/5": variant === "ghost",
            "px-4 py-2 text-sm": size === "sm",
            "px-6 py-3 text-base": size === "md",
            "px-8 py-4 text-lg": size === "lg",
          },
          className,
        ),
      )}
      {...props}
    />
  );
}
