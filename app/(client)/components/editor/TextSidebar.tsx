import React from "react";
import ToolSidebarHeader from "./ToolSidebarHeader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Editor } from "@/types";
import { motion } from "framer-motion";
import { useDelayedVisibility } from '../../hooks/useDelayedVisibility';

interface TextSidebarProps {
  editor: Editor | undefined;
}

const TextSidebar = ({ editor }: TextSidebarProps) => {
  const isVisible = useDelayedVisibility(300);

  return (
    <>
      <ToolSidebarHeader title="Text" description="Add text to your design" />
      <ScrollArea>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="p-4 space-y-4 border-b"
        >
          <Button className="w-full" onClick={() => editor?.addText("Textbox")}>
            Add a textbox
          </Button>
          <Button
            className="w-full h-16"
            variant="secondary"
            size="lg"
            onClick={() =>
              editor?.addText("Heading", {
                fontSize: 80,
                fontWeight: 700,
              })
            }
          >
            <span className="text-3xl font-bold">Add a heading</span>
          </Button>
          <Button
            className="w-full h-16"
            variant="secondary"
            size="lg"
            onClick={() =>
              editor?.addText("Subheading", {
                fontSize: 44,
                fontWeight: 600,
              })
            }
          >
            <span className="text-xl font-semibold">Add a subheading</span>
          </Button>
          <Button
            className="w-full h-16"
            variant="secondary"
            size="lg"
            onClick={() =>
              editor?.addText("Paragraph", {
                fontSize: 32,
              })
            }
          >
            Paragraph
          </Button>
        </motion.div>
      </ScrollArea>
    </>
  );
};

export default TextSidebar;
