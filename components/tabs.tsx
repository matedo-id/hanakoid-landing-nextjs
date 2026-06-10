"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Tabs({
  tabs,
}: {
  tabs: { label: string; content: ReactNode }[];
}) {
  const [active, setActive] = useState(0);
  return (
    <div className="flex flex-col gap-6">
      <div
        role="tablist"
        className="flex gap-1 border-b border-border"
      >
        {tabs.map((tab, i) => {
          const isActive = active === i;
          return (
            <button
              key={i}
              role="tab"
              type="button"
              aria-selected={isActive}
              onClick={() => setActive(i)}
              className={cn(
                "relative -mb-px px-4 py-3 text-sm font-semibold transition-colors",
                isActive ? "text-primary" : "text-muted hover:text-ink-2"
              )}
            >
              {tab.label}
              {isActive && (
                <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-primary" />
              )}
            </button>
          );
        })}
      </div>
      <div role="tabpanel">{tabs[active].content}</div>
    </div>
  );
}
