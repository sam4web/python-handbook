import { ICheatsheetTopic } from "@/lib/cheatsheets";
import { Dispatch, SetStateAction, useCallback, useEffect } from "react";

interface Props {
  topics: ICheatsheetTopic[];
  setActiveDiv: Dispatch<SetStateAction<string | null>>;
  elementRef: React.RefObject<HTMLElement | null>;
  setIsPassed: Dispatch<SetStateAction<boolean>>;
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
}

export default function TopicScrollTracker({ topics, setActiveDiv, elementRef, setIsPassed, setShowSidebar }: Props) {
  const handleScroll = useCallback(() => {
    let ticking = false;
    const checkScrollPosition = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(() => {
          setShowSidebar(false);
          if (elementRef.current) {
            const isElementPassed = elementRef.current.getBoundingClientRect().bottom <= 0;
            setIsPassed((prev) => {
              if (prev !== isElementPassed) {
                return isElementPassed;
              }
              return prev;
            });
          }
          ticking = false;
        });
      }
    };

    return checkScrollPosition;
  }, [elementRef, setIsPassed, setShowSidebar]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveDiv(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0,
      }
    );
    topics.forEach((topic) => {
      const element = document.getElementById(topic.slug);
      if (element) {
        observer.observe(element);
      }
    });
    return () => {
      observer.disconnect();
    };
  }, [topics, setActiveDiv]);

  useEffect(() => {
    const checkScrollPosition = handleScroll();
    window.addEventListener("scroll", checkScrollPosition, { passive: true });
    return () => {
      window.removeEventListener("scroll", checkScrollPosition);
    };
  }, [handleScroll]);

  return null;
}
