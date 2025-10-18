"use client";

import { cx } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSidebar } from "../_context/sidebar-context";

interface Props {
  id: string;
  title: string;
  items: { title: string; slug: string }[];
  active?: boolean;
}

export default function Dropdown({ id, title, items, active: isActive }: Props) {
  const pathname = usePathname();
  const [active, setActive] = useState(isActive || false);
  const { handleActiveDropdown } = useSidebar();

  return (
    <>
      <div
        className="flex justify-between items-center hover:bg-muted-foreground/20 py-2 px-2.5 rounded-lg"
        onClick={() => {
          handleActiveDropdown(id);
          setActive((prev) => !prev);
        }}
      >
        <p>{title}</p>
        <ChevronRight className={cx("size-4 text-secondary-foreground", active ? "rotate-90" : "")} />
      </div>

      {active ? (
        <div className="ml-6 mt-0.5 space-y-0.5">
          {items.map((item, idx) => (
            <Link
              href={`/tutorials/${item.slug}`}
              className={cx(
                "hover:bg-muted-foreground/20 py-2 px-2.5 cursor-pointer block border-l-4 rounded-lg",
                pathname.includes(item.slug)
                  ? "text-primary border-primary rounded-l-xs bg-muted-foreground/15"
                  : "border-transparent"
              )}
              key={idx}
            >
              {item.title}
            </Link>
          ))}
        </div>
      ) : null}
    </>
  );
}
