import { cn } from "@/lib/utils";

/** Purpose: Badge component for product labels and status indicators */
interface BadgeProps {
  variant?: "new" | "off" | "premium" | "default";
  children: React.ReactNode;
  className?: string;
}

export function Badge({
  variant = "default",
  children,
  className,
}: BadgeProps) {
  const variants = {
    new: "bg-lime text-navy font-bold",
    off: "bg-red-500 text-white font-bold",
    premium: "bg-gradient-to-r from-lime to-cyan-400 text-navy font-bold",
    default: "bg-gray-200 text-gray-800 font-medium",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-1 text-xs rounded-full",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
