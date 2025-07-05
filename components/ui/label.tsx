import type React from "react"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"

const Label = forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label ref={ref} className={cn("text-sm font-medium text-gray-700 leading-none", className)} {...props} />
  ),
)
Label.displayName = "Label"

export { Label }
