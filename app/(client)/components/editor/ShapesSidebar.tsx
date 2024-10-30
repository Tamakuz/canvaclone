import React from "react";
import ToolSidebarHeader from "./ToolSidebarHeader";
import { ScrollArea } from "@/components/ui/scroll-area";
import ShapeTool from "../feature/ShapeTool";
import { FaCircle, FaSquare, FaSquareFull } from "react-icons/fa";
import { IoTriangle } from "react-icons/io5";
import { FaDiamond } from "react-icons/fa6";
import { Editor } from "@/types";
import { motion } from "framer-motion";
import { useDelayedVisibility } from '../../hooks/useDelayedVisibility';

interface ShapesSidebarProps {
  editor: Editor | undefined;
}

const ShapesSidebar = ({ editor }: ShapesSidebarProps) => {
  const isVisible = useDelayedVisibility(300);

  return (
    <div>
      <ToolSidebarHeader
        title="Shapes"
        description="Add shapes to your canvas"
      />
      <ScrollArea>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-3 gap-4 p-4"
        >
          <ShapeTool icon={FaCircle} onClick={() => editor?.addCircle()} />
          <ShapeTool icon={FaSquare} onClick={() => editor?.addSoftRectangle()} />
          <ShapeTool
            icon={FaSquareFull}
            onClick={() => editor?.addRectangle()}
          />
          <ShapeTool icon={IoTriangle} onClick={() => editor?.addTriangle()} />
          <ShapeTool icon={FaDiamond} onClick={() => editor?.addDiamond()} />
        </motion.div>
      </ScrollArea>
    </div>
  );
};

export default ShapesSidebar;
