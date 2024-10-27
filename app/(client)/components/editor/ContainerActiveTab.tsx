"use client";
import { ActiveTool, BuildEditorProps, Editor } from "@/types";
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import TamplateSidebar from "./TamplateSidebar";
import ShapesSidebar from "./ShapesSidebar";
import { cn } from "@/lib/utils";
import { ChevronsLeft } from "lucide-react";
import FillSidebar from "./FillSidebar";
import StrokeSidebar from "./StrokeSidebar";
import StrokeWidthSidebar from "./StrokeWidthSidebar";
import OpacitySidebar from "./OpacitySidebar";
import TextSidebar from "./TextSidebar";
import FontSidebar from "./FontSidebar";
import DrawSidebar from "./DrawSidebar";
import ImageSidebar from "./ImageSidebar";

interface ContainerActiveTabProps {
  editor: Editor | undefined;
  activeTab: ActiveTool;
  setActiveTab: (tab: ActiveTool) => void;
}

const ContainerActiveTab = ({ editor, activeTab, setActiveTab }: ContainerActiveTabProps) => {
  const component = useMemo(() => {
    switch (activeTab) {
      case "templates":
        return <TamplateSidebar />;
      case "images":
        return <ImageSidebar editor={editor} />;
      case "shapes":
        return <ShapesSidebar editor={editor} />;
      case "text":
        return <TextSidebar editor={editor} />;
      case "draw":
        return <DrawSidebar editor={editor} />;
      case "ai":
        return "ini ai";
      case "settings":
        return "ini settings";
      case "fill":
        return <FillSidebar editor={editor} />;
      case "stroke-color":
        return <StrokeSidebar editor={editor} />;
      case "stroke-width":
        return <StrokeWidthSidebar editor={editor} />;
      case "opacity":
        return <OpacitySidebar editor={editor} />;
      case "font":
        return <FontSidebar editor={editor} />;
      default:
        return null;
    }
  }, [activeTab]);

  const isVisible = activeTab !== "select";

  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: isVisible ? 300 : 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        isVisible && "border-r w-[360px] h-full",
        "absolute left-[100px] h-[calc(100vh-68px)] z-10 top-[68px] bg-background"
      )}
    >
      <div className="relative h-full">
        {component}
        <button
          onClick={() => setActiveTab("select")}
          className={cn(
            "absolute -right-[1.80rem] h-[70px] bg-background top-1/2 transform -translate-y-1/2 flex items-center justify-center rounded-r-xl px-1 pr-2 border-r border-y group",
            !isVisible && "invisible"
          )}
        >
          <ChevronsLeft className="size-4 text-black group-hover:opacity-75 transition" />
        </button>
      </div>
    </motion.div>
  );
};

export default ContainerActiveTab;
