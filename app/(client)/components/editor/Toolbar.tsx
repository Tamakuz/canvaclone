"use client";
import { ActiveTool, Editor, FONT_SIZE, FONT_WEIGHT } from "@/types";
import { isTextType } from "../../utils";
import HintButton from "./HintButton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { FaBold, FaItalic, FaStrikethrough, FaUnderline } from "react-icons/fa";
import { TbColorFilter } from "react-icons/tb";
import { BsBorderWidth } from "react-icons/bs";
import { RxTransparencyGrid } from "react-icons/rx";
import {
  ArrowUp,
  ArrowDown,
  ChevronDown,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Trash,
  SquareSplitHorizontal,
  Copy,
} from "lucide-react";
import { motion } from "framer-motion";

interface ToolbarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

const Toolbar = ({ editor, activeTool, onChangeActiveTool }: ToolbarProps) => {
  const selectedObject = editor?.selectedObjects[0];
  const selectedObjectType = editor?.selectedObjects[0]?.type;
  const isText = isTextType(selectedObjectType);
  const isImage = selectedObjectType === "image";

  const [properties, setProperties] = useState({
    fillColor: undefined as string | undefined,
    strokeColor: undefined as string | undefined,
    // fontFamily: initialFontFamily,
    // fontWeight: initialFontWeight,
    // fontStyle: initialFontStyle,
    // fontLinethrough: initialFontLinethrough,
    // fontUnderline: initialFontUnderline,
    // textAlign: initialTextAlign,
    // fontSize: initialFontSize,
  });

  useEffect(() => {
    const updateProperties = () => {
      setProperties({
        fillColor: editor?.getActiveFillColor(),
        strokeColor: editor?.getActiveStrokeColor(),
      });
    };

    updateProperties();

    editor?.canvas.on("object:modified", updateProperties);
    editor?.canvas.on("selection:created", updateProperties);
    editor?.canvas.on("selection:updated", updateProperties);

    return () => {
      editor?.canvas.off("object:modified", updateProperties);
      editor?.canvas.off("selection:created", updateProperties);
      editor?.canvas.off("selection:updated", updateProperties);
    };
  }, [editor]);

  if (editor?.selectedObjects.length === 0)
    return (
      <div className="h-[68px] bg-background border-b flex items-center p-2 gap-x-1 shrink-0 px-4"></div>
    );

  return (
    <motion.div
      initial={{ paddingLeft: activeTool === "select" ? 16 : 320 }}
      animate={{ paddingLeft: activeTool === "select" ? 16 : 320 }}
      transition={{ duration: 0.3 }}
      className="h-[68px] bg-background border-b flex items-center p-2 gap-x-1 shrink-0 px-4"
    >
      {!isImage && (
        <div className="flex items-center h-full justify-center">
          <HintButton label="Color" side="bottom" sideOffset={5}>
            <Button
              onClick={() => onChangeActiveTool("fill")}
              size="icon"
              variant="ghost"
              className={cn(activeTool === "fill" && "bg-gray-100")}
            >
              <div
                className="rounded-sm size-4 border"
                style={{ backgroundColor: properties.fillColor }}
              />
            </Button>
          </HintButton>
        </div>
      )}
      {!isText && (
        <div className="flex items-center h-full justify-center">
          <HintButton label="Stroke color" side="bottom" sideOffset={5}>
            <Button
              onClick={() => onChangeActiveTool("stroke-color")}
              size="icon"
              variant="ghost"
              className={cn(activeTool === "stroke-color" && "bg-gray-100")}
            >
              <div
                className="rounded-sm size-4 border-2 bg-white"
                style={{ borderColor: properties.strokeColor }}
              />
            </Button>
          </HintButton>
        </div>
      )}
      {!isText && (
        <div className="flex items-center h-full justify-center">
          <HintButton label="Stroke width" side="bottom" sideOffset={5}>
            <Button
              onClick={() => onChangeActiveTool("stroke-width")}
              size="icon"
              variant="ghost"
              className={cn(activeTool === "stroke-width" && "bg-gray-100")}
            >
              <BsBorderWidth className="size-4" />
            </Button>
          </HintButton>
        </div>
      )}
      <div className="flex items-center h-full justify-center">
        <HintButton label="Bring forward" side="bottom" sideOffset={5}>
          <Button
            onClick={() => editor?.bringForward()}
            size="icon"
            variant="ghost"
          >
            <ArrowUp className="size-4" />
          </Button>
        </HintButton>
      </div>
      <div className="flex items-center h-full justify-center">
        <HintButton label="Send backwards" side="bottom" sideOffset={5}>
          <Button
            onClick={() => editor?.sendBackwards()}
            size="icon"
            variant="ghost"
          >
            <ArrowDown className="size-4" />
          </Button>
        </HintButton>
      </div>
      <div className="flex items-center h-full justify-center">
        <HintButton label="Opacity" side="bottom" sideOffset={5}>
          <Button
            onClick={() => onChangeActiveTool("opacity")}
            size="icon"
            variant="ghost"
            className={cn(activeTool === "opacity" && "bg-gray-100")}
          >
            <RxTransparencyGrid className="size-4" />
          </Button>
        </HintButton>
      </div>
      <div className="flex items-center h-full justify-center">
        <HintButton label="Duplicate" side="bottom" sideOffset={5}>
          <Button
            onClick={() => {
              editor?.onCopy();
              editor?.onPaste();
            }}
            size="icon"
            variant="ghost"
          >
            <Copy className="size-4" />
          </Button>
        </HintButton>
      </div>
      <div className="flex items-center h-full justify-center">
        <HintButton label="Delete" side="bottom" sideOffset={5}>
          <Button
            onClick={() => editor?.delete()}
            size="icon"
            variant="ghost"
            className="text-red-600"
          >
            <Trash className="size-4" />
          </Button>
        </HintButton>
      </div>
    </motion.div>
  );
};

export default Toolbar;
