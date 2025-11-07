import { RefObject, useCallback, useState } from "react";

export default function usePanelResizer(
  topPanelRef: RefObject<HTMLDivElement | null>,
  bottomPanelRef: RefObject<HTMLDivElement | null>
) {
  const MIN_SIZE = 100;
  const [isResizing, setIsResizing] = useState(false);

  const handleDragStart = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (!topPanelRef.current || !bottomPanelRef.current) {
        return;
      }

      setIsResizing(true);
      const startPosition = e.clientY;
      const initialTopSize = topPanelRef.current.offsetHeight;
      const initialBottomSize = bottomPanelRef.current.offsetHeight;

      const handleDrag = (event: MouseEvent) => {
        const currentPosition = event.clientY;
        const delta = currentPosition - startPosition;
        const newTopSize = initialTopSize + delta;
        const newBottomSize = initialBottomSize - delta;

        if (newTopSize >= MIN_SIZE && newBottomSize >= MIN_SIZE) {
          topPanelRef.current!.style.height = `${newTopSize}px`;
          bottomPanelRef.current!.style.height = `${newBottomSize}px`;
        }
      };

      const handleDragEnd = () => {
        document.removeEventListener("mousemove", handleDrag);
        document.removeEventListener("mouseup", handleDragEnd);
        setIsResizing(false);
      };

      document.addEventListener("mousemove", handleDrag);
      document.addEventListener("mouseup", handleDragEnd);
    },
    [topPanelRef, bottomPanelRef]
  );

  return { handleDragStart, isResizing };
}
