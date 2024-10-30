import React, { useState, useEffect } from 'react';
import { Editor } from "@/types";
import ToolSidebarHeader from "./ToolSidebarHeader";
import { ScrollArea } from "@/components/ui/scroll-area";
import ColorPicker from "../feature/ColorPicker";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useDelayedVisibility } from '../../hooks/useDelayedVisibility';
import { motion } from 'framer-motion';

type SettingSidebarProps = {
  editor?: Editor;
};

const SettingSidebar: React.FC<SettingSidebarProps> = ({ editor }) => {
  const isVisible = useDelayedVisibility(300)
  const [canvasSettings, setCanvasSettings] = useState({
    width: 0,
    height: 0,
    background: '#ffffff'
  });

  useEffect(() => {
    const workspace = editor?.getWorkspace();
    if (workspace) {
      setCanvasSettings({
        width: workspace.width || 0,
        height: workspace.height || 0,
        background: workspace.fill as string || '#ffffff'
      });
    }
  }, [editor]);

  const updateSetting = (key: keyof typeof canvasSettings, value: number | string) => {
    setCanvasSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleResize = (e: React.FormEvent) => {
    e.preventDefault();
    editor?.changeSize({
      width: canvasSettings.width,
      height: canvasSettings.height
    });
  };

  const handleBackgroundChange = (color: string) => {
    updateSetting('background', color);
    editor?.changeBackground(color);
  };

  return (
    <div className="h-[calc(100vh-140px)]">
      <ToolSidebarHeader
        title="Canvas Settings"
        description="Modify canvas dimensions and background"
      />
      <ScrollArea className="h-full">
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          onSubmit={handleResize}
          className="space-y-4 p-4"
        >
          {["width", "height"].map((dimension) => (
            <div key={dimension} className="space-y-2">
              <Label htmlFor={dimension} className="capitalize">
                {dimension}
              </Label>
              <Input
                id={dimension}
                type="number"
                value={canvasSettings[dimension as keyof typeof canvasSettings]}
                onChange={(e) =>
                  updateSetting(
                    dimension as "width" | "height",
                    parseInt(e.target.value)
                  )
                }
                placeholder={`Enter ${dimension}`}
              />
            </div>
          ))}
          <Button type="submit" className="w-full">
            Apply Dimensions
          </Button>
        </motion.form>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="p-4"
        >
          <ColorPicker
            value={canvasSettings.background}
            onChange={handleBackgroundChange}
          />
        </motion.div>
      </ScrollArea>
    </div>
  );
};

export default SettingSidebar;