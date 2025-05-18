import * as React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "secondary" | "ghost";
  size?: "default" | "icon";
  className?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "default", size = "default", className = "", ...props },
    ref
  ) => {
    const base =
      "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
    const variants: Record<string, string> = {
      default:
        "bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-300",
      primary:
        "bg-primary text-primary-foreground hover:bg-primary/90 border border-primary",
      secondary:
        "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-secondary",
      ghost: "bg-transparent hover:bg-gray-100 border border-transparent",
    };
    const sizes: Record<string, string> = {
      default: "h-10 px-4 py-2 text-sm",
      icon: "h-10 w-10 p-0",
    };
    return (
      <button
        ref={ref}
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
