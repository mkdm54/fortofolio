import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

interface CustomProgressBarProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  indicatorClassName?: string;
}

const CustomProgressBar = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  CustomProgressBarProps
>(({ className, value, indicatorClassName, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-gray-300 border border-portfolio-black", // Track background
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn(
        "h-full flex-1 bg-portfolio-purple-link transition-all rounded-full", // Filled part dengan warna ungu dan ujung membulat
        indicatorClassName
      )}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
CustomProgressBar.displayName = ProgressPrimitive.Root.displayName;

export { CustomProgressBar };
