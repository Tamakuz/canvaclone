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
import FontSizeInput from "../feature/FontSizeInput";

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
    fontFamily: undefined as string | undefined,
    fontWeight: undefined as number | undefined,
    fontStyle: undefined as string | undefined,
    fontLinethrough: undefined as boolean | undefined,
    fontUnderline: undefined as boolean | undefined,
    textAlign: undefined as string | undefined,
    fontSize: undefined as number | undefined,
  });

  useEffect(() => {
    const updateProperties = () => {
      setProperties({
        fillColor: editor?.getActiveFillColor(),
        strokeColor: editor?.getActiveStrokeColor(),
        fontFamily: editor?.getActiveFontFamily(),
        fontWeight: editor?.getActiveFontWeight() || FONT_WEIGHT,
        fontStyle: editor?.getActiveFontStyle(),
        fontLinethrough: editor?.getActiveFontLinethrough(),
        fontUnderline: editor?.getActiveFontUnderline(),
        textAlign: editor?.getActiveTextAlign(),
        fontSize: editor?.getActiveFontSize() || FONT_SIZE,
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

  const handleToggleBold = () => {
    if (!selectedObject) {
      return;
    }

    const newValue = properties?.fontWeight && properties.fontWeight > 500 ? 500 : 700;

    editor?.changeFontWeight(newValue);
    setProperties((current) => ({
      ...current,
      fontWeight: newValue,
    }));
  };

  const handleToggleItalic = () => {
    if (!selectedObject) {
      return;
    }

    const isItalic = properties.fontStyle === "italic";
    const newValue = isItalic ? "normal" : "italic";

    editor?.changeFontStyle(newValue);
    setProperties((current) => ({
      ...current,
      fontStyle: newValue,
    }));
  }

  const handleToggleLinethrough = () => {
    if (!selectedObject) {
      return;
    }

    const newValue = properties.fontLinethrough ? false : true;

    editor?.changeFontLinethrough(newValue);
    setProperties((current) => ({
      ...current,
      fontLinethrough: newValue,
    }));
  };

  const handleToggleUnderline = () => {
    if (!selectedObject) {
      return;
    }

    const newValue = properties.fontUnderline ? false : true;

    editor?.changeFontUnderline(newValue);
    setProperties((current) => ({
      ...current,
      fontUnderline: newValue,
    }));
  };

  const handleChangeFontSize = (value: number) => {
    if (!selectedObject) {
      return;
    }

    editor?.changeFontSize(value);
    setProperties((current) => ({
      ...current,
      fontSize: value,
    }));
  };

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
        <>
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
        </>
      )}
      {isText && (
        <>
          <div className="flex items-center h-full justify-center">
            <HintButton label="Font" side="bottom" sideOffset={5}>
              <Button
                onClick={() => onChangeActiveTool("font")}
                size="icon"
                variant="ghost"
                className={cn(
                  "w-auto px-2 text-sm",
                  activeTool === "font" && "bg-gray-100"
                )}
              >
                <div className="max-w-[100px] truncate">
                  {properties.fontFamily}
                </div>
                <ChevronDown className="size-4 ml-2 shrink-0" />
              </Button>
            </HintButton>
          </div>
          <div className="flex items-center h-full justify-center">
            <HintButton label="Bold" side="bottom" sideOffset={5}>
              <Button
                onClick={handleToggleBold}
                size="icon"
                variant="ghost"
                className={cn(
                  properties?.fontWeight &&
                    properties.fontWeight > 500 &&
                    "bg-gray-100"
                )}
              >
                <FaBold className="size-4" />
              </Button>
            </HintButton>
          </div>
          <div className="flex items-center h-full justify-center">
            <HintButton label="Italic" side="bottom" sideOffset={5}>
              <Button
                onClick={handleToggleItalic}
                size="icon"
                variant="ghost"
                className={cn(
                  properties.fontStyle === "italic" && "bg-gray-100"
                )}
              >
                <FaItalic className="size-4" />
              </Button>
            </HintButton>
          </div>
          <div className="flex items-center h-full justify-center">
            <HintButton label="Underline" side="bottom" sideOffset={5}>
              <Button
                onClick={handleToggleUnderline}
                size="icon"
                variant="ghost"
                className={cn(properties.fontUnderline && "bg-gray-100")}
              >
                <FaUnderline className="size-4" />
              </Button>
            </HintButton>
          </div>
          <div className="flex items-center h-full justify-center">
            <HintButton label="Strike" side="bottom" sideOffset={5}>
              <Button
                onClick={handleToggleLinethrough}
                size="icon"
                variant="ghost"
                className={cn(properties.fontLinethrough && "bg-gray-100")}
              >
                <FaStrikethrough className="size-4" />
              </Button>
            </HintButton>
          </div>
          <div className="flex items-center h-full justify-center">
            <HintButton label="Align left" side="bottom" sideOffset={5}>
              <Button
                onClick={() => {
                  editor?.changeTextAlign("left");
                  setProperties((current) => ({
                    ...current,
                    textAlign: "left",
                  }));
                }}
                size="icon"
                variant="ghost"
                className={cn(properties.textAlign === "left" && "bg-gray-100")}
              >
                <AlignLeft className="size-4" />
              </Button>
            </HintButton>
          </div>
          <div className="flex items-center h-full justify-center">
            <HintButton label="Align center" side="bottom" sideOffset={5}>
              <Button
                onClick={() => {
                  editor?.changeTextAlign("center");
                  setProperties((current) => ({
                    ...current,
                    textAlign: "center",
                  }));
                }}
                size="icon"
                variant="ghost"
                className={cn(
                  properties.textAlign === "center" && "bg-gray-100"
                )}
              >
                <AlignCenter className="size-4" />
              </Button>
            </HintButton>
          </div>
          <div className="flex items-center h-full justify-center">
            <HintButton label="Align right" side="bottom" sideOffset={5}>
              <Button
                onClick={() => {
                  editor?.changeTextAlign("right");
                  setProperties((current) => ({
                    ...current,
                    textAlign: "right",
                  }));
                }}
                size="icon"
                variant="ghost"
                className={cn(
                  properties.textAlign === "right" && "bg-gray-100"
                )}
              >
                <AlignRight className="size-4" />
              </Button>
            </HintButton>
          </div>
          <div className="flex items-center h-full justify-center">
            <FontSizeInput
              value={properties.fontSize || FONT_SIZE}
              onChange={handleChangeFontSize}
            />
          </div>
        </>
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
