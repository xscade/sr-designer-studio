import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

const Button = React.forwardRef(({ className, variant = "primary", size = "default", asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  
  const variants = {
    primary: "bg-sr-red text-white hover:brightness-110 shadow-lg shadow-sr-red/20 border-transparent",
    secondary: "bg-sr-orange text-white hover:brightness-110 shadow-md shadow-sr-orange/20 border-transparent",
    outline: "border-2 border-sr-black text-sr-black hover:bg-sr-black hover:text-white bg-transparent",
    ghost: "bg-transparent text-sr-black hover:bg-sr-black/5 border-transparent",
    white: "bg-white text-sr-black hover:bg-gray-100 shadow-lg border-transparent",
  };

  const sizes = {
    default: "h-12 px-6 py-2",
    sm: "h-9 px-4 py-1 text-sm",
    lg: "h-14 px-8 py-3 text-lg",
    icon: "h-10 w-10",
  };

  return (
    <Comp
      className={cn(
        "inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sr-red disabled:pointer-events-none disabled:opacity-50 border",
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

export { Button };

