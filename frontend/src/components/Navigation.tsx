"use client";
import React, { useState } from "react";
import {
  Menu as MenuIcon,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background/70 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Brand */}
          <a
            href="#"
            className="flex items-center gap-2 group"
            aria-label="BlockCare Home"
          >
            <span className="h-6 w-6 rounded-lg bg-gradient-to-br from-primary to-accent shadow-[0_0_20px_rgb(var(--primary)/0.35)]" />
            <span className="text-sm font-semibold tracking-wider bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent group-hover:from-primary group-hover:to-accent transition-colors">
              BlockCare
            </span>
          </a>

          {/* Center: Links */}
          <div className="hidden md:flex items-center gap-8">
            {["HOME", "FEATURES", "PRIVACY", "PRICING", "CONTACT"].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  className="text-foreground/60 hover:text-foreground tracking-widest text-xs rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {item}
                </a>
              )
            )}
          </div>

          {/* Right: Actions */}
          <div className="hidden md:flex items-center gap-4 text-foreground/70">
            <a
              href="#"
              className="hover:text-foreground"
              aria-label="Facebook"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="hover:text-foreground"
              aria-label="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="hover:text-foreground"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="ml-2 inline-flex items-center gap-2 rounded-xl border border-border bg-foreground/5 px-4 py-2 text-xs font-semibold text-foreground hover:bg-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Get started
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-foreground/80"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <MenuIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border py-4">
            <div className="flex flex-col space-y-3">
              {["HOME", "FEATURES", "PRIVACY", "PRICING", "CONTACT"].map(
                (i) => (
                  <a
                    key={i}
                    href="#"
                    className="text-foreground/70 hover:text-foreground px-2 py-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    {i}
                  </a>
                )
              )}
              <div className="flex items-center gap-4 pt-2 border-t border-border">
                <a
                  href="#"
                  className="text-foreground/70 hover:text-foreground"
                >
                  Facebook
                </a>
                <a
                  href="#"
                  className="text-foreground/70 hover:text-foreground"
                >
                  Instagram
                </a>
                <a
                  href="#"
                  className="text-foreground/70 hover:text-foreground"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
