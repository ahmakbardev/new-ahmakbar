// components/ui/tooltip.tsx
"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils"; // atau ganti dengan `clsx` kalau kamu gak pakai fungsi cn()

type TooltipProps = {
  children: React.ReactNode;
  content: string;
  side?: "top" | "right" | "bottom" | "left";
};

export function Tooltip({ children, content, side = "bottom" }: TooltipProps) {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root delayDuration={100}>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            className={cn(
              "z-50 rounded bg-white px-2 py-1 text-xs text-black shadow-md animate-fade-in",
              "dark:bg-neutral-900 dark:text-white",
            )}
          >
            {content}
            <TooltipPrimitive.Arrow className="fill-white dark:fill-neutral-900" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
