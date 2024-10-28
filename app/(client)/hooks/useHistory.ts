import { fabric } from "fabric";
import { useCallback, useEffect, useRef, useState } from "react";

import { JSON_KEYS } from "@/types";

interface UseHistoryProps {
  canvas: fabric.Canvas | null;
};

export const useHistory = ({ canvas }: UseHistoryProps) => {
  const [historyIndex, setHistoryIndex] = useState(0);
  const canvasHistory = useRef<string[]>([]);

  useEffect(() => {
    if (!canvas) return;

    const handleHistoryChange = () => {
      const currentState = JSON.stringify(canvas.toJSON(JSON_KEYS));
      canvasHistory.current = [...canvasHistory.current, currentState];
      setHistoryIndex(prev => prev + 1);
    };

    canvas.on("object:modified", handleHistoryChange);
    canvas.on("object:added", handleHistoryChange);
    canvas.on("object:removed", handleHistoryChange);

    return () => {
      canvas.off("object:modified", handleHistoryChange);
      canvas.off("object:added", handleHistoryChange); 
      canvas.off("object:removed", handleHistoryChange);
    };
  }, [canvas])

  const parseHistory = useCallback(() => {
    if (!canvas) return;

    const parsedHistory = canvasHistory.current.map((state) => {
      return JSON.parse(state);
    });

    return parsedHistory;
  }, [canvas]);
  
  console.log(parseHistory());
  console.log(historyIndex);

  const canUndo = useCallback(() => {
    return historyIndex > 0;
  }, [historyIndex]);

  const canRedo = useCallback(() => {
    return historyIndex < canvasHistory.current.length - 1;
  }, [historyIndex]);

  const undo = () => {
    if (canUndo()) {
      canvas?.clear().renderAll();

      const previousIndex = historyIndex - 1;
      const previousState = JSON.parse(
        canvasHistory.current[previousIndex]
      );

      canvas?.loadFromJSON(previousState, () => {
        canvas.renderAll();
        setHistoryIndex(previousIndex);
      });
    }
  }

  const redo = useCallback(() => {
    if (canRedo()) {
      canvas?.clear().renderAll();

      const nextIndex = historyIndex + 1;
      const nextState = JSON.parse(
        canvasHistory.current[nextIndex]
      );

      canvas?.loadFromJSON(nextState, () => {
        canvas.renderAll();
        setHistoryIndex(nextIndex);
      });
    }
  }, [canvas, historyIndex, canRedo]);

  return {
    canUndo,
    canRedo,
    undo,
    redo,
    setHistoryIndex,
    canvasHistory,
  };
};
