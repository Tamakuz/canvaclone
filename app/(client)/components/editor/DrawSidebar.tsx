import { Editor, STROKE_COLOR, STROKE_WIDTH } from "@/types"
import ToolSidebarHeader from "./ToolSidebarHeader"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import ColorPicker from "../feature/ColorPicker"
import { useState } from "react"

interface DrawSidebarProps {
  editor: Editor | undefined
}

const DrawSidebar = ({ editor }: DrawSidebarProps) => {
  const [widthValue, setWidthValue] = useState(editor?.getActiveStrokeWidth() || STROKE_WIDTH);
  const [colorValue, setColorValue] = useState(editor?.getActiveStrokeColor() || STROKE_COLOR);

  const handleWidthChange = (value: number) => {
    setWidthValue(value);
    editor?.changeStrokeWidth(value);
  }

  const handleColorChange = (value: string) => {
    setColorValue(value);
    editor?.changeStrokeColor(value);
  }

  return (
    <>
      <ToolSidebarHeader
        title="Drawing mode"
        description="Modify the drawing mode"
      />
      <ScrollArea>
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
      </ScrollArea>
    </>
  );
}

export default DrawSidebar