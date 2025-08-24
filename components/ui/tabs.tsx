"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        // Pill container: keep neutral surface, let triggers provide primary tints
        "inline-flex items-center gap-2 h-11 w-fit rounded-full p-1 bg-transparent shadow-sm",
        className
      )}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        // Trigger: fluid pill button with smooth transform and color transitions
  "inline-flex items-center justify-center gap-1.5 h-9 px-4 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ease-in-out transform-gpu disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
        // Default (unselected)
        "bg-transparent text-slate-700 dark:text-slate-300 hover:bg-[color-mix(in_oklch,var(--color-primary)_6%,transparent)] hover:scale-[1.02]",
        // Active state: use project primary color variable and a light elevation
        "data-[state=active]:bg-[var(--color-primary)] data-[state=active]:text-[var(--color-primary-foreground)] data-[state=active]:scale-105 data-[state=active]:shadow-lg",
        // Focus ring using theme token
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:ring-offset-2",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
