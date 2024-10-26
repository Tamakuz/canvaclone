"use client";

import { Editor, STROKE_DASH_ARRAY, STROKE_WIDTH } from '@/types';
import ToolSidebarHeader from './ToolSidebarHeader';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface StrokeWidthSidebarProps {
  editor: Editor | undefined;
}

const StrokeWidthSidebar = ({ editor }: StrokeWidthSidebarProps) => {
  const [widthValue, setWidthValue] = useState<number>(editor?.getActiveStrokeWidth() || STROKE_WIDTH);
  const [type, setType] = useState(editor?.getActiveStrokeDashArray() || STROKE_DASH_ARRAY)
  const handleChangeStrokeWidth = (value: number) => {
    editor?.changeStrokeWidth(value);
  };

  const handleChangeStrokeDashArray = (value: number[]) => {
    editor?.changeStrokeDashArray(value);
  };

  return (
    <>
      <ToolSidebarHeader
        title="Stroke options"
        description="Modify the stroke of your element"
      />
      <ScrollArea>
        <div className="p-4 space-y-4 border-b">
          <Label className="text-sm">Stroke width</Label>
          <Slider
            value={[widthValue]}
            onValueChange={(values) => {
              setWidthValue(values[0]);
              handleChangeStrokeWidth(values[0]);
            }}
          />
        </div>
      </ScrollArea>
      <div className="p-4 space-y-4 border-b">
        <Label className="text-sm">Stroke type</Label>
        <Button
          onClick={() => {
            handleChangeStrokeDashArray([]);
            setType([])
          }}
          variant="secondary"
          size="lg"
          className={cn(
            "w-full h-16 justify-start text-left",
            JSON.stringify(type) === `[]` && "border-2 border-blue-500"
          )}
          style={{
            padding: "8px 16px",
          }}
        >
          <div className="w-full border-black rounded-full border-4" />
        </Button>
        <Button
          onClick={() => {
            handleChangeStrokeDashArray([5, 5]);
            setType([5, 5]);
          }}
          variant="secondary"
          size="lg"
          className={cn(
            "w-full h-16 justify-start text-left",
            JSON.stringify(type) === `[5,5]` && "border-2 border-blue-500"
          )}
          style={{
            padding: "8px 16px",
          }}
        >
          <div className="w-full border-black rounded-full border-4 border-dashed" />
        </Button>
      </div>
    </>
  );
}

export default StrokeWidthSidebar