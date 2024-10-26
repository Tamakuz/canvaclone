import React from "react";
import ToolSidebarHeader from "./ToolSidebarHeader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Editor } from "@/types";

interface TextSidebarProps {
  editor: Editor | undefined;
}

const TextSidebar = ({ editor }: TextSidebarProps) => {
  return (
    <>
      <ToolSidebarHeader title="Text" description="Add text to your design" />
      <ScrollArea>
        <div className="p-4 space-y-4 border-b">
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
        </div>
      </ScrollArea>
    </>
  );
};

export default TextSidebar;
