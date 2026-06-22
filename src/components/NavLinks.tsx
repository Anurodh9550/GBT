"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { mainNav, portalDropdown, academicsDropdown, campusDropdown, siteConfig } from "@/lib/site-config";
import { featuredCourses } from "@/lib/site-data";

function isActive(pathname: string, href: string, matchPaths?: string[]) {
  if (matchPaths) {
    return matchPaths.some(
      (p) => pathname === p || (p !== "/" && pathname.startsWith(p))
    );
  }
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-3 w-3 opacity-60 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function PortalMenuIcon({ type }: { type: "student" | "faculty" }) {
  const cn = "h-5 w-5 shrink-0 text-brand-orange";
  if (type === "student") {
    return (
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-orange/10">
        <svg className={cn} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      </span>
    );
  }
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-orange/10">
      <svg className={cn} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    </span>
  );
}

type DropdownItemProps = {
  href: string;
  onClick?: () => void;
  children: React.ReactNode;
};

function DropdownItem({ href, onClick, children }: DropdownItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium text-neutral-700 transition hover:bg-neutral-50 hover:text-brand-maroon"
    >
      {children}
    </Link>
  );
}

type DropdownNavProps = {
  label: string;
  href: string;
  active: boolean;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  children: React.ReactNode;
  align?: "center" | "right";
  wide?: boolean;
};

function DropdownNav({
  label,
  href,
  active,
  open,
  onOpen,
  onClose,
  children,
  align = "center",
  wide = false,
}: DropdownNavProps) {
  const panelPos =
    align === "right" ? "right-0" : "left-1/2 -translate-x-1/2";

  return (
    <div className="relative" onMouseEnter={onOpen} onMouseLeave={onClose}>
      {/* hover bridge */}
      <div className="absolute left-0 right-0 top-full h-3" />
      <Link
        href={href}
        className={`nav-link flex items-center gap-1 whitespace-nowrap px-2 py-2.5 xl:px-2.5 ${
          active ? "nav-link-active" : "text-neutral-600 hover:text-brand-maroon"
        } ${open ? "text-brand-maroon" : ""}`}
      >
        {label}
        <Chevron open={open} />
      </Link>
      {open && (
        <div
          className={`dropdown-panel absolute top-[calc(100%+4px)] z-50 overflow-hidden rounded-2xl border border-neutral-100 bg-white ${panelPos} ${
            wide ? "w-[min(100vw-2rem,22rem)]" : "w-56"
          }`}
        >
          <div className="border-b border-neutral-100 bg-neutral-50/80 px-4 py-2.5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-brand-orange">
              {label}
            </p>
          </div>
          <div className={`p-1.5 ${wide ? "max-h-[min(70vh,420px)] overflow-y-auto scrollbar-hide" : ""}`}>
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

function NavItem({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`nav-link whitespace-nowrap px-2 py-2.5 xl:px-2.5 ${
        active ? "nav-link-active" : "text-neutral-600 hover:text-brand-maroon"
      }`}
    >
      {label}
    </Link>
  );
}

export default function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<"academics" | "campus" | "portal" | null>(null);
  const close = () => {
    setOpenMenu(null);
    onNavigate?.();
  };

  return (
    <nav className="hidden items-center justify-center lg:flex" aria-label="Main navigation">
      {mainNav.map((item) => {
        if (item.label === "Academics") {
          const active = isActive(pathname, item.href, item.matchPaths);

          return (
            <DropdownNav
              key={item.href}
              label={item.label}
              href={item.href}
              active={active}
              open={openMenu === "academics"}
              onOpen={() => setOpenMenu("academics")}
              onClose={() => setOpenMenu(null)}
              wide
            >
              {academicsDropdown.slice(0, 2).map((entry) => (
                <DropdownItem key={entry.href} href={entry.href} onClick={close}>
                  <span className="font-medium">{entry.label}</span>
                </DropdownItem>
              ))}
              <div className="mx-1 mt-1 border-t border-neutral-100 pt-1">
                <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                  Our Courses
                </p>
                {featuredCourses.map((course) => (
                  <DropdownItem
                    key={course.slug}
                    href={course.href ?? `/courses#${course.slug}`}
                    onClick={close}
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-orange/10 text-lg">
                      {course.icon}
                    </span>
                    <span className="leading-snug">
                      <span className="font-semibold text-brand-maroon">{course.code}</span>
                      <span className="block text-xs text-neutral-500">{course.title}</span>
                    </span>
                  </DropdownItem>
                ))}
                <DropdownItem href="/courses" onClick={close}>
                  <span className="text-xs font-bold text-brand-orange">View All Courses →</span>
                </DropdownItem>
              </div>
            </DropdownNav>
          );
        }

        if (item.label === "Campus") {
          const active = isActive(pathname, item.href, item.matchPaths);

          return (
            <DropdownNav
              key={item.href}
              label={item.label}
              href={item.href}
              active={active}
              open={openMenu === "campus"}
              onOpen={() => setOpenMenu("campus")}
              onClose={() => setOpenMenu(null)}
            >
              {campusDropdown.map((entry) => (
                <DropdownItem key={entry.href} href={entry.href} onClick={close}>
                  <span>{entry.label}</span>
                </DropdownItem>
              ))}
            </DropdownNav>
          );
        }

        if (item.label === "Portal") {
          const active = isActive(pathname, item.href, item.matchPaths);

          return (
            <DropdownNav
              key={item.href}
              label={item.label}
              href={item.href}
              active={active}
              open={openMenu === "portal"}
              onOpen={() => setOpenMenu("portal")}
              onClose={() => setOpenMenu(null)}
              align="right"
            >
              {portalDropdown.map((entry) => (
                <DropdownItem key={entry.href} href={entry.href} onClick={close}>
                  <PortalMenuIcon type={entry.icon} />
                  <span>{entry.label}</span>
                </DropdownItem>
              ))}
              <div className="mx-1 mt-1 border-t border-neutral-100 pt-1">
                <DropdownItem href="/portal" onClick={close}>
                  <span className="text-xs font-bold text-brand-orange">All Portal Services →</span>
                </DropdownItem>
              </div>
            </DropdownNav>
          );
        }

        return (
          <NavItem
            key={item.href}
            href={item.href}
            label={item.label}
            active={isActive(pathname, item.href, item.matchPaths)}
          />
        );
      })}
    </nav>
  );
}

export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    if (!open) setExpanded(null);
  }, [open]);

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="fixed inset-x-0 top-[var(--mobile-header-offset,7rem)] z-40 max-h-[calc(100vh-7rem)] overflow-y-auto border-b border-neutral-200 bg-white shadow-2xl lg:hidden">
        <nav className="mx-auto max-w-[1400px] px-4 py-4" aria-label="Mobile navigation">
          {mainNav.map((item) => {
            const active = isActive(pathname, item.href, item.matchPaths);
            const isAcademics = item.label === "Academics";
            const isCampus = item.label === "Campus";
            const isPortal = item.label === "Portal";

            if (isAcademics || isCampus || isPortal) {
              const key = item.label;
              const isOpen = expanded === key;
              const subItems = isAcademics
                ? [
                    ...academicsDropdown.slice(0, 2).map((entry) => ({
                      label: entry.label,
                      href: entry.href,
                    })),
                    ...featuredCourses.map((course) => ({
                      label: `${course.code} — ${course.title}`,
                      href: course.href ?? `/courses#${course.slug}`,
                    })),
                    { label: "View All Courses", href: "/courses" },
                  ]
                : isCampus
                  ? campusDropdown.map((entry) => ({
                      label: entry.label,
                      href: entry.href,
                    }))
                  : [
                      ...portalDropdown.map((p) => ({ label: p.label, href: p.href })),
                      { label: "All Portal Services", href: "/portal" },
                    ];

              return (
                <div key={item.href} className="border-b border-neutral-100">
                  <button
                    type="button"
                    onClick={() => setExpanded(isOpen ? null : key)}
                    className={`flex w-full items-center justify-between py-3.5 text-left text-sm font-semibold ${
                      active ? "text-brand-maroon" : "text-neutral-800"
                    }`}
                  >
                    {item.label}
                    <Chevron open={isOpen} />
                  </button>
                  {isOpen && (
                    <div className="pb-3 pl-3">
                      {subItems.map((sub) => (
                        <Link
                          key={`${sub.href}-${sub.label}`}
                          href={sub.href}
                          onClick={onClose}
                          className="block rounded-lg py-2.5 pl-3 text-sm text-neutral-600 hover:bg-neutral-50 hover:text-brand-orange"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`block border-b border-neutral-100 py-3.5 text-sm font-semibold ${
                  active ? "text-brand-orange" : "text-neutral-800"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/admissions"
            onClick={onClose}
            className="btn-apply text-btn mt-5 flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-white"
          >
            Apply Now
            <span aria-hidden="true">→</span>
          </Link>
        </nav>
      </div>
    </>
  );
}

export function HeaderMain() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <div className={`header-bar ${scrolled ? "header-bar-scrolled" : ""}`}>
        <div className="header-accent-line" />
        <div className="mx-auto flex h-[var(--header-height)] max-w-[1400px] items-center justify-between gap-3 px-4 lg:px-6">
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-3 rounded-xl py-1 pr-2 transition hover:bg-neutral-50"
          >
            <div className="relative">
              <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-brand-orange/40 to-brand-maroon/30 opacity-0 blur transition group-hover:opacity-100" />
              <Image
                src={siteConfig.logo}
                alt={siteConfig.trust}
                width={46}
                height={46}
                className="relative rounded-full object-cover ring-2 ring-white ring-offset-1 ring-offset-neutral-100"
                priority
              />
            </div>
            <div className="hidden min-w-0 sm:block">
              <p className="truncate font-serif text-[15px] font-bold leading-tight text-brand-maroon lg:text-base">
                {siteConfig.name}
              </p>
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-neutral-400 lg:text-[10px]">
                Est. {siteConfig.established}
              </p>
            </div>
          </Link>

          <NavLinks onNavigate={() => setMobileOpen(false)} />

          <div className="flex shrink-0 items-center gap-2">
            <Link
              href="/admissions"
              className="btn-apply text-btn hidden items-center gap-2 rounded-full px-5 py-2.5 text-white sm:inline-flex"
            >
              Apply Now
              <span className="text-base leading-none" aria-hidden="true">→</span>
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200 text-neutral-700 transition hover:border-brand-orange/40 hover:bg-neutral-50 lg:hidden"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
