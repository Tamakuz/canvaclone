"use client";
import { useState } from "react";
import { Editor, fonts } from "@/types";
import ToolSidebarHeader from "./ToolSidebarHeader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDelayedVisibility } from "../../hooks/useDelayedVisibility";
import { motion } from "framer-motion";

interface FontSidebarProps {
  editor: Editor | undefined;
}

const FontSidebar = ({ editor }: FontSidebarProps) => {
  const isVisible = useDelayedVisibility(300);
  const [fontFamily, setFontFamily] = useState(editor?.getActiveFontFamily());
  return (
    <>
      <ToolSidebarHeader
        title="Font"
        description="Change the font of the selected text"
      />
      <ScrollArea className="h-[calc(100%-68px)]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="p-4 space-y-1 border-b"
        >
          {fonts.map((font) => (
            <Button
              key={font}
              variant="secondary"
              size="lg"
              className={cn(
                "w-full h-16 justify-start text-left",
                fontFamily === font && "border-2 border-blue-500"
              )}
              style={{
                fontFamily: font,
                fontSize: "16px",
                padding: "8px 16px",
              }}
              onClick={() => {
                setFontFamily(font);
                editor?.changeFontFamily(font);
              }}
            >
              {font}
            </Button>
          ))}
        </motion.div>
      </ScrollArea>
    </>
  );
};

export default FontSidebar;
