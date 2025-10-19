import Dropdown from "./dropdown";
import { useSidebar } from "../_context/sidebar-context";
import { TutorialData } from "@/lib/tutorials";
import { useEffect, useState } from "react";
import Spinner from "@/components/spinner";

export default function TutorialSidebar() {
  const { activeDropdownList } = useSidebar();
  const [sidebarItems, setSidebarItems] = useState<TutorialData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/tutorials/structure");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: TutorialData[] = await response.json();
        setSidebarItems(data);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-14">
        <Spinner className="size-12! text-background!" />
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-destructive text-lg">
        <span className="font-medium">Error: </span>
        {error}
      </p>
    );
  }

  return (
    <div className="space-y-1">
      {sidebarItems.map((item, idx) => (
        <Dropdown
          key={item.id}
          id={item.id}
          title={item.title}
          items={item.items}
          active={idx === 0 || activeDropdownList.includes(item.id)}
        />
      ))}
    </div>
  );
}
