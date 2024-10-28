"use client";

import { useEffect } from "react";
import { fabric } from "fabric";

interface UseCanvasEventsProps {
  // save: () => void;
  canvas: fabric.Canvas | null;
  setSelectedObjects: (objects: fabric.Object[]) => void;
  clearSelectionCallback?: () => void;
  handleUpdateHistory?: (json: any) => void;
};

export const useCanvasEvent = ({ canvas, setSelectedObjects, clearSelectionCallback, handleUpdateHistory }: UseCanvasEventsProps) => {
  useEffect(() => {
    if(canvas) {
      canvas.on("selection:created", (event) => {
        setSelectedObjects(event.selected || []);
        // handleUpdateHistory?.(canvas.toJSON());
      });
      canvas.on("selection:updated", (event) => {
        setSelectedObjects(event.selected || []);
        // handleUpdateHistory?.(canvas.toJSON());
      });
      canvas.on("selection:cleared", () => {
        setSelectedObjects([]);
        clearSelectionCallback?.();
        // handleUpdateHistory?.(canvas.toJSON());
      });
    }

    return () => {
      canvas?.off("selection:created");
      canvas?.off("selection:updated");
      canvas?.off("selection:cleared");
    }
  }, [canvas, setSelectedObjects, clearSelectionCallback])
}