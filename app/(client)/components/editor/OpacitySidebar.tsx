"use client";
import { Editor } from "@/types";
import ToolSidebarHeader from "./ToolSidebarHeader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

interface OpacitySidebarProps {
  editor: Editor | undefined
}

const OpacitySidebar = ({ editor }: OpacitySidebarProps) => {
  const [opacity, setOpacity] = useState(editor?.getActiveOpacity() || 1);

  const handleChangeOpacity = (value: number) => {
    editor?.changeOpacity(value);
    setOpacity(value);
  };

  return (
    <>
      <ToolSidebarHeader
        title="Opacity"
        description="Adjust the opacity of the selected object"
      />
      <ScrollArea>
        <div className="p-4 space-y-4 border-b">
          <Slider
            value={[opacity]}
            onValueChange={(values) => handleChangeOpacity(values[0])}
            max={1}
            min={0}
            step={0.01}
          />
        </div>
      </ScrollArea>
    </>
  );
}

export default OpacitySidebar