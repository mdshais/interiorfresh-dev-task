import type React from "react"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline"
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant = "default", ...props }, ref) => (
  <button
    className={cn(
      "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2",
      variant === "default"
        ? "bg-blue-600 text-white hover:bg-blue-700"
        : "border border-gray-300 bg-transparent hover:bg-gray-50",
      className,
    )}
    ref={ref}
    {...props}
  />
))
Button.displayName = "Button"

export { Button }
