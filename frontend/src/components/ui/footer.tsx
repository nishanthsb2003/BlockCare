import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
}

export function Footer({ className, ...props }: FooterProps) {
  return (
    <footer
      className={cn("w-full bg-background border-t py-6 sm:py-8 md:py-12", className)}
      {...props}
    >
      <div className="container px-4 md:px-6 mx-auto">
        {/* Top section with logo and sections */}
        <div className="grid grid-cols-2 gap-6 xs:gap-8 sm:grid-cols-2 md:grid-cols-4 mb-8">
          {/* Brand column */}
          <div className="flex flex-col col-span-2 sm:col-span-1">
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">BlockCare</h3>
            <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 max-w-xs">
              Secure blockchain-based healthcare records management for patients
              and providers.
            </p>
            <div className="flex space-x-4 mt-2 sm:mt-auto">
              {/* Social Media Icons */}
              <a
                href="#"
                aria-label="Twitter"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a
                href="#"
                aria-label="GitHub"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                  <path d="M9 18c-4.51 2-5-2-7-2"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Services column */}
          <div className="col-span-1">
            <h3 className="text-xs sm:text-sm font-semibold mb-3 sm:mb-4 uppercase tracking-wider">
              Services
            </h3>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Health Records
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Consent Management
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Provider Access
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Data Security
                </Link>
              </li>
            </ul>
          </div>

          {/* Company column */}
          <div className="col-span-1">
            <h3 className="text-xs sm:text-sm font-semibold mb-3 sm:mb-4 uppercase tracking-wider">
              Company
            </h3>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Press
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal column */}
          <div className="col-span-1">
            <h3 className="text-xs sm:text-sm font-semibold mb-3 sm:mb-4 uppercase tracking-wider">
              Legal
            </h3>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  HIPAA Compliance
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-border my-4 sm:my-6"></div>

        {/* Bottom section with copyright and additional links */}
        <div className="flex flex-col items-center justify-between gap-3 sm:gap-4 md:flex-row">
          <p className="text-center text-xs sm:text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} BlockCare. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center md:justify-end items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
            <a
              href="#"
              className="hover:underline hover:text-foreground transition-colors"
            >
              Support
            </a>
            <span className="hidden sm:inline text-muted-foreground/50">|</span>
            <a
              href="#"
              className="hover:underline hover:text-foreground transition-colors"
            >
              Accessibility
            </a>
            <span className="hidden sm:inline text-muted-foreground/50">|</span>
            <a
              href="#"
              className="hover:underline hover:text-foreground transition-colors"
            >
              FAQ
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
