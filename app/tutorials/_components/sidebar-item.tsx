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

export default function SidebarItem({ title, items, closeTutorialSidebar }: Props) {
  const pathname = usePathname();
  const [active, setActive] = useState(true);

  return (
    <div>
      <div
        className="flex-between hover:bg-muted-foreground/20 py-1.5 px-2.5 rounded-lg"
        onClick={() => setActive((prev) => !prev)}
      >
        <p className="font-medium">{title}</p>
        <ChevronRight className={cx("size-4 text-secondary-foreground", active ? "rotate-90" : "")} />
      </div>

      {active ? (
        <div className="ml-5 ">
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
