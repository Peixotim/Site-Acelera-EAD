import Link, { LinkProps } from "next/link";
import { cn } from "@/lib/utils";
import React from "react";

interface ButtonLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  size?: string;
  variant?: "default" | "outline" | "ghost";
}

export function ButtonLink({ children, className, variant = "default", ...props }: ButtonLinkProps) {
  const base =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none px-4 py-2";
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-orange-dark border border-primary",
    outline: "border border-primary text-primary bg-transparent hover:bg-primary hover:text-white",
    ghost:"hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
  };
  return (
    <Link {...props} className={cn(base, variants[variant], className)}>
      {children}
    </Link>
  );
}
