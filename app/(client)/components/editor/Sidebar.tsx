import {
  LayoutTemplate,
  ImageIcon,
  Pencil,
  Settings,
  Shapes,
  Sparkles,
  Type,
} from "lucide-react";
import SidebarItem from "./SidebarItem";
import { ActiveTool } from "@/types";

interface SidebarProps {
  activeTab: ActiveTool;
  setActiveTab: (tab: ActiveTool) => void;
}

const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  return (
    <aside className="h-[calc(100vh-68px)] w-[100px] border-r">
      <ul className="flex flex-col">
        <SidebarItem
          isActive={activeTab === "templates"}
          onClick={() => setActiveTab("templates")}
          label="Templates"
          icon={LayoutTemplate}
        />
        <SidebarItem
          isActive={activeTab === "images"}
          onClick={() => setActiveTab("images")}
          label="Images"
          icon={ImageIcon}
        />
        <SidebarItem
          isActive={activeTab === "shapes"}
          onClick={() => setActiveTab("shapes")}
          label="Shapes"
          icon={Shapes}
        />
        <SidebarItem
          isActive={activeTab === "text"}
          onClick={() => setActiveTab("text")}
          label="Text"
          icon={Type}
        />
        <SidebarItem
          isActive={activeTab === "draw"}
          onClick={() => setActiveTab("draw")}
          label="Draw"
          icon={Pencil}
        />
        <SidebarItem
          isActive={activeTab === "ai"}
          onClick={() => setActiveTab("ai")}
          label="AI"
          icon={Sparkles}
        />
        <SidebarItem
          isActive={activeTab === "settings"}
          onClick={() => setActiveTab("settings")}
          label="Settings"
          icon={Settings}
        />
      </ul>
    </aside>
  );
};

export default Sidebar;
