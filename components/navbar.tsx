"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Button from "./ui/button";
import ThemeToggleBtn from "./theme-toggle-btn";
import { Menu } from "lucide-react";
import { firaCode } from "@/lib/fonts";
import { cx } from "@/lib/utils";

const navlinks = [
  { title: "Tutorials", href: "/tutorials" },
  { title: "Practice", href: "/practice" },
  { title: "Sandbox", href: "/sandbox" },
  { title: "Cheetsheets", href: "/cheetsheets" },
];

function Navlinks({ pathname, className = "" }: { pathname: string; className?: string }) {
  return (
    <>
      {navlinks.map((link, idx) => {
        const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== "/");
        return (
          <li
            key={idx}
            className={cx(
              "inline-block px-1 relative after:transition-all after:ease-out after:content-[''] after:absolute after:h-0.5 after:w-0 after:bg-primary after:-translate-x-1/2 after:left-1/2 after:-bottom-0.5 after:rounded-full",
              isActive ? "text-primary after:w-full" : "text-foreground hover:after:w-1/2",
              className
            )}
          >
            <Link href={link.href}>{link.title}</Link>
          </li>
        );
      })}
    </>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [showNavbar, setShowNavbar] = useState(false);
  const [scrollActive, setScrollActive] = useState(false);
  const isHomePage = useMemo(() => pathname === "/", [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setShowNavbar(false);
      setScrollActive(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (showNavbar) {
      setShowNavbar(false);
    }
  }, [pathname]);

  return (
    <header className="z-10 w-full sticky top-0 left-0">
      <div
        className={cx(
          "backdrop-blur-xs border-b shadow-sm shadow-muted",
          scrollActive ? "bg-background/60 dark:bg-background/80" : "bg-background",
          showNavbar ? "border-b-border" : "border-transparent"
        )}
      >
        <div
          className={cx(
            "flex justify-between items-center px-2.5 max-w-6xl mx-auto",
            !isHomePage || scrollActive ? "py-1" : "py-2.5"
          )}
        >
          <Link href={"/"}>
            <div className="flex items-center">
              <div
                className={cx(
                  "bg-foreground rounded-lg shadow-md",
                  !isHomePage || scrollActive ? "size-10" : "size-10 lg:size-12"
                )}
              />
              <p
                className={cx(
                  "font-medium text-foreground",
                  !isHomePage || scrollActive ? "text-base leading-tight ml-1" : "text-lg leading-snug ml-2",
                  firaCode.className
                )}
              >
                Python <br />
                Handbook
              </p>
            </div>
          </Link>

          <ul className="hidden md:flex justify-between items-center space-x-1 lg:space-x-2">
            <Navlinks pathname={pathname} className={!isHomePage || scrollActive ? "text-sm" : "text-base"} />
          </ul>

          <div className="flex items-center gap-1 lg:gap-2">
            <div className="flex">
              <ThemeToggleBtn />
              <Button variant="icon" className="md:hidden block" onClick={() => setShowNavbar((prev) => !prev)}>
                <Menu />
              </Button>
            </div>
            {isHomePage ? (
              <Link href={"/tutorials"}>
                <Button variant="primary">Get Started</Button>
              </Link>
            ) : null}
          </div>
        </div>

        {showNavbar ? (
          <ul className="py-3 space-y-2 sm:space-y-2.5 px-3 sm:px-4 flex flex-col items-start">
            <Navlinks pathname={pathname} className={!isHomePage || scrollActive ? "text-sm" : "text-base"} />
          </ul>
        ) : null}
      </div>
    </header>
  );
}
