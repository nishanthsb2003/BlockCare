import React from "react";
import { cn } from "@/lib/utils";

interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
}

export function Footer({ className, ...props }: FooterProps) {
  return (
    <footer
      className={cn("w-full bg-background border-t py-6 md:py-10", className)}
      {...props}
    >
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-center text-sm text-muted-foreground md:text-left">
          &copy; {new Date().getFullYear()} BlockCare. All rights reserved.
        </p>
        <nav className="flex items-center gap-4 text-sm text-muted-foreground">
          <a
            href="#"
            className="hover:underline hover:text-foreground transition-colors"
          >
            Privacy
          </a>
          <a
            href="#"
            className="hover:underline hover:text-foreground transition-colors"
          >
            Terms
          </a>
          <a
            href="#"
            className="hover:underline hover:text-foreground transition-colors"
          >
            Contact
          </a>
        </nav>
      </div>
    </footer>
  );
}
