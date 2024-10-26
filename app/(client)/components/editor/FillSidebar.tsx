"use client";
import React from 'react'
import ToolSidebarHeader from './ToolSidebarHeader';
import { ScrollArea } from '@/components/ui/scroll-area';
import ColorPicker from '../feature/ColorPicker';
import { Editor, FILL_COLOR } from '@/types';

interface FillSidebarProps {
  editor: Editor | undefined;
};

const FillSidebar = ({ editor }: FillSidebarProps) => {
  const value = editor?.getActiveFillColor() || FILL_COLOR;

  const onChange = (value: string) => {
    editor?.changeFillColor(value);
  };
  return (
    <>
      <ToolSidebarHeader
        title="Fill"
        description="Change the fill color of the selected object"
      />
      <ScrollArea>
        <div className="p-4 space-y-6">
          <ColorPicker value={value} onChange={onChange} />
        </div>
      </ScrollArea>
    </>
  );
}

export default FillSidebar