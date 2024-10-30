import { Editor, STROKE_COLOR, STROKE_WIDTH } from "@/types";
import ToolSidebarHeader from "./ToolSidebarHeader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import ColorPicker from "../feature/ColorPicker";
import { useState } from "react";
import { motion } from "framer-motion";
import { useDelayedVisibility } from "../../hooks/useDelayedVisibility";

interface DrawSidebarProps {
  editor: Editor | undefined;
}

const DrawSidebar = ({ editor }: DrawSidebarProps) => {
  const [widthValue, setWidthValue] = useState(
    editor?.getActiveStrokeWidth() || STROKE_WIDTH
  );
  const [colorValue, setColorValue] = useState(
    editor?.getActiveStrokeColor() || STROKE_COLOR
  );
  const isVisible = useDelayedVisibility(300);

  const handleWidthChange = (value: number) => {
    setWidthValue(value);
    editor?.changeStrokeWidth(value);
  };

  const handleColorChange = (value: string) => {
    setColorValue(value);
    editor?.changeStrokeColor(value);
  };

  return (
    <>
      <ToolSidebarHeader
        title="Drawing mode"
        description="Modify the drawing mode"
      />
      <ScrollArea>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-4 space-y-6 border-b">
            <Label className="text-sm">Brush width</Label>
            <Slider
              value={[widthValue]}
              onValueChange={(values) => handleWidthChange(values[0])}
            />
          </div>
          <div className="p-4 space-y-6">
            <ColorPicker value={colorValue} onChange={handleColorChange} />
          </div>
        </motion.div>
      </ScrollArea>
    </>
  );
};

export default DrawSidebar;
