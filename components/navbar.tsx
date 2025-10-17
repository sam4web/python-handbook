"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import Button from "./ui/button";
import ThemeToggleBtn from "./theme-toggle-btn";
import { Menu } from "lucide-react";
import { firaCode, poppins } from "@/lib/fonts";

const navlinks = [
  { title: "Home", href: "/home" },
  { title: "Tutorials", href: "/tutorials" },
  { title: "Practice", href: "/practice" },
  { title: "Sandbox", href: "/sandbox" },
  { title: "Cheetsheets", href: "/cheetsheets" },
];

function Navlinks() {
  return (
    <>
      {navlinks.map((link, idx) => (
        <li
          key={idx}
          className={
            "inline-block relative after:transition-all after:ease-out after:content-[''] after:absolute after:h-0.5 after:w-0 hover:after:w-3/4 after:bg-primary after:-translate-x-1/2 after:left-1/2 after:bottom-0 after:rounded-full"
          }
        >
          <Link className="text-foreground text-base" href={link.href}>
            {link.title}
          </Link>
        </li>
      ))}
    </>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [showNavbar, setShowNavbar] = useState(false);
  const isHomePage = useMemo(() => pathname === "/", [pathname]);

  return (
    <header className="">
      <div className="flex justify-between items-center px-2.5 py-3 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="size-10 lg:size-12 bg-foreground rounded-lg shadow-md" />
          <p className={`leading-snug text-lg font-medium text-foreground ${firaCode.className}`}>
            Python <br />
            Handbook
          </p>
        </div>

        <ul className="hidden md:flex justify-between items-center space-x-2.5 lg:space-x-4">
          <Navlinks />
        </ul>

        <div className="flex items-center gap-1 lg:gap-2">
          <div className="flex">
            <ThemeToggleBtn />
            <Button variant="icon" className="md:hidden block" onClick={() => setShowNavbar((prev) => !prev)}>
              <Menu />
            </Button>
          </div>
          {isHomePage ? <Button variant="primary">Get Started</Button> : null}
        </div>
      </div>

      {showNavbar ? (
        <ul className="py-3 space-y-1.5 sm:space-y-2.5 px-2.5 sm:px-5 flex flex-col items-start">
          <Navlinks />
        </ul>
      ) : null}
    </header>
  );
}
