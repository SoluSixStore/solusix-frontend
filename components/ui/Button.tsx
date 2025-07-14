import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

/** Purpose: Reusable button component with multiple variants */
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", children, ...props },
    ref,
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary:
        "bg-lime text-navy hover:bg-lime/90 transform hover:scale-105 focus:ring-lime",
      secondary:
        "bg-navy text-lime border-2 border-lime hover:bg-lime hover:text-navy focus:ring-lime",
      outline:
        "bg-transparent border-2 border-lime text-lime hover:bg-lime hover:text-navy focus:ring-lime",
      ghost: "bg-transparent text-lime hover:bg-lime/10 focus:ring-lime",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm rounded-md",
      md: "px-6 py-3 text-base rounded-lg",
      lg: "px-8 py-4 text-lg rounded-xl",
    };

    return (
      <button
        className={cn(baseClasses, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button };
