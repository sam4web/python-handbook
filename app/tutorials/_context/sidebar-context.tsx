import { createContext, useContext, useState } from "react";

interface SidebarContextType {
  activeDropdownList: string[];
  handleActiveDropdown: (dropdownId: string) => void;
}
const initialContextValue: SidebarContextType = {
  activeDropdownList: [],
  handleActiveDropdown: () => {},
};

const useSidebarSource = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeDropdownList, setActiveDropdownList] = useState<string[]>([]);

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

  return { activeDropdownList, handleActiveDropdown };
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
