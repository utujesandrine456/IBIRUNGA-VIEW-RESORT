import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "outline" | "outlineLight" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-brown text-white hover:bg-brown-dark border border-brown",
  outline:
    "bg-transparent text-brown border border-brown hover:bg-brown hover:text-white",
  outlineLight:
    "bg-transparent text-white border border-white hover:bg-white hover:text-brown",
  ghost: "bg-transparent text-brown hover:text-brown-dark px-0",
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  children: ReactNode;
  className?: string;
};

export function Button({
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[13px] font-semibold tracking-[0.14em] uppercase transition-colors duration-300 cursor-pointer ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
