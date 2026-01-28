import type { AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children">;

const base =
  "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/40";

const variants: Record<Variant, string> = {
  primary: "border border-sky-400/40 bg-sky-400/10 font-medium hover:bg-sky-400/15",
  secondary: "border border-white/10 bg-white/5 hover:bg-white/8",
  ghost: "hover:bg-white/5 text-zinc-300 hover:text-white",
};

export function ButtonLink({
  href,
  children,
  variant = "secondary",
  className = "",
  ...props
}: ButtonLinkProps) {
  return (
    <a
      href={href}
      className={`${base} ${variants[variant]} ${className}`.trim()}
      {...props}
    >
      {children}
    </a>
  );
}
