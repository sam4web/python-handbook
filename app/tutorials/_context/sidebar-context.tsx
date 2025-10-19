import { createContext, useContext, useState } from "react";

interface SidebarContextType {
  activeDropdownList: string[];
  showTutorialSidebar: boolean;
  openTutorialSidebar: () => void;
  closeTutorialSidebar: () => void;
  handleActiveDropdown: (dropdownId: string) => void;
}
const initialContextValue: SidebarContextType = {
  activeDropdownList: [],
  showTutorialSidebar: false,
  openTutorialSidebar: () => {},
  closeTutorialSidebar: () => {},
  handleActiveDropdown: () => {},
};

const useSidebarSource = () => {
  const [activeDropdownList, setActiveDropdownList] = useState<string[]>([]);
  const [showTutorialSidebar, setShowTutorialSidebar] = useState(false);

  const handleActiveDropdown = (dropdownId: string) => {
    setActiveDropdownList((prev) => {
      if (!prev.length) {
        return [dropdownId];
      }
      if (prev.includes(dropdownId)) {
        return prev.filter((item) => item !== dropdownId);
      }
      return [...prev, dropdownId];
    });
  };

  const openTutorialSidebar = () => {
    setShowTutorialSidebar(true);
  };

  const closeTutorialSidebar = () => {
    setShowTutorialSidebar(false);
  };

  return { activeDropdownList, handleActiveDropdown, showTutorialSidebar, openTutorialSidebar, closeTutorialSidebar };
};

const SidebarContext = createContext<SidebarContextType>(initialContextValue);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({ children }: { children: Readonly<React.ReactNode> }) => {
  return <SidebarContext.Provider value={useSidebarSource()}>{children}</SidebarContext.Provider>;
};
