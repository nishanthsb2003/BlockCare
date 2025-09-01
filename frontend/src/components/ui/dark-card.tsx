"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

function DarkCard({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "bg-black text-white rounded-xl border border-gray-800 shadow-xl",
        className
      )}
      {...props}
    />
  );
}

function DarkCardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("px-6 pt-6 pb-3", className)} {...props} />;
}

function DarkCardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      className={cn("text-lg font-medium text-white", className)}
      {...props}
    />
  );
}

function DarkCardDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return <p className={cn("text-sm text-gray-400", className)} {...props} />;
}

function DarkCardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("px-6 pb-6", className)} {...props} />;
}

function DarkCardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("px-6 pt-0 pb-6 border-t border-gray-800 mt-4", className)}
      {...props}
    />
  );
}

export {
  DarkCard,
  DarkCardHeader,
  DarkCardTitle,
  DarkCardDescription,
  DarkCardContent,
  DarkCardFooter,
};
