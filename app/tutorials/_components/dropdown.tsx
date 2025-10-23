"use client";

import { cx } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface Props {
  title: string;
  items: { title: string; slug: string }[];
  active?: boolean;
  closeTutorialSidebar: () => void;
}

export default function Dropdown({ title, items, active: isActive, closeTutorialSidebar }: Props) {
  const pathname = usePathname();
  const [active, setActive] = useState(isActive || false);

  return (
    <>
      <div
        className="flex justify-between items-center hover:bg-muted-foreground/20 py-2 px-2.5 rounded-lg"
        onClick={() => setActive((prev) => !prev)}
      >
        <p>{title}</p>
        <ChevronRight className={cx("size-4 text-secondary-foreground", active ? "rotate-90" : "")} />
      </div>

      {active ? (
        <div className="ml-4 lg:ml-6 mt-0.5 space-y-0.5">
          {items.map((item, idx) => (
            <Link
              key={idx}
              onClick={closeTutorialSidebar}
              href={`/tutorials/${item.slug}`}
              className={cx(
                "hover:bg-muted-foreground/20 py-2 px-2.5 cursor-pointer block border-l-4 rounded-lg",
                pathname.includes(item.slug)
                  ? "text-primary border-primary rounded-l-xs dark:bg-muted-foreground/15 bg-muted-foreground/5"
                  : "border-transparent"
              )}
            >
              {item.title}
            </Link>
          ))}
        </div>
      ) : null}
    </>
  );
}
