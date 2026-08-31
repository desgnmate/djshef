"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { label: "Music", href: "/#music" },
  { label: "Sets", href: "/#sets" },
  { label: "Story", href: "/#story" },
  { label: "Visuals", href: "/#archive" },
] as const;

export function Navigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    if (!open) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <header className={`site-header${isHome ? " home-header" : ""}${open ? " menu-open" : ""}`}>
      <Link href="/" className="wordmark" aria-label="SHEF home" onClick={() => setOpen(false)}>
        <span className="brand-logo" aria-hidden="true">S</span>
        <span>SHEF</span>
      </Link>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {links.map((link) => (
          <Link href={link.href} key={link.href}>{link.label}</Link>
        ))}
      </nav>

      <button
        className="menu-toggle"
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((value) => !value)}
      >
        <span>{open ? "Close" : "Menu"}</span>
        <span className="menu-lines" aria-hidden="true"><i /><i /></span>
      </button>

      <div className="mobile-menu" id="mobile-menu" aria-hidden={!open}>
        <div className="mobile-menu-links">
          {links.map((link, index) => (
            <Link href={link.href} key={link.href} onClick={() => setOpen(false)}>
              <span className="mobile-menu-index">0{index + 1}</span>
              <span className="mobile-menu-label">{link.label}</span>
            </Link>
          ))}
          <Link href="/press-kit" onClick={() => setOpen(false)}>
            <span className="mobile-menu-index">05</span>
            <span className="mobile-menu-label">Press kit</span>
          </Link>
          <Link href="/booking" onClick={() => setOpen(false)}>
            <span className="mobile-menu-index">06</span>
            <span className="mobile-menu-label">Booking</span>
          </Link>
        </div>
        <p className="mobile-menu-note">No set menu<br />HCMC · Melbourne · beyond</p>
      </div>
    </header>
  );
}
