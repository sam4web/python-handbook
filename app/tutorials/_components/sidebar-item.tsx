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

export default function SidebarItem({ title, items, closeTutorialSidebar, active: isActive }: Props) {
  const pathname = usePathname();
  const [active, setActive] = useState(isActive || false);

  return (
    <div>
      <div
        className="flex-between py-1 px-2.5 rounded-lg group hover:text-primary"
        onClick={() => setActive((prev) => !prev)}
      >
        <p>{title}</p>
        <ChevronRight
          className={cx("size-4 text-secondary-foreground group-hover:text-primary", active ? "rotate-90" : "")}
        />
      </div>

      {active ? (
        <div className="ml-5 mt-0.5 mb-2">
          {items.map((item, idx) => (
            <Link
              key={idx}
              onClick={closeTutorialSidebar}
              href={`/tutorials/${item.slug}`}
              className={cx(
                "pl-3 py-1.5 cursor-pointer block text-sm border-l-2",
                pathname.includes(item.slug)
                  ? "text-primary font-medium border-muted-foreground"
                  : "border-muted-foreground/20 hover:border-muted-foreground"
              )}
            >
              {item.title}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
