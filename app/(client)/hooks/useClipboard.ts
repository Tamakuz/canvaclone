import { useCallback, useRef } from "react";

interface UseClipboardProps {
  canvas: fabric.Canvas | null;
}

export const useClipboard = ({ canvas }: UseClipboardProps) => {
  const clipboard = useRef<any>(null);

  const copy = useCallback(() => {
    if (!canvas) return;

    canvas.getActiveObjects().forEach((object) => {
      clipboard.current = object;
    });
  }, [canvas]);

  const paste = useCallback(() => {
    if (!canvas || !clipboard.current) return;

    clipboard.current.clone((cloneObject: any) => {
      canvas.discardActiveObject();
      cloneObject.set({
        left: cloneObject.left + 10,
        top: cloneObject.top + 10,
        evented: true,
      })

      if (cloneObject.type === "activeSelection") {
        cloneObject.canvas = canvas;
        cloneObject.forEachObject((obj: any) => {
          canvas?.add(obj);
        });
        cloneObject.setCoords();
      } else {
        canvas?.add(cloneObject);
      }

      clipboard.current.top += 10;
      clipboard.current.left += 10;
      canvas?.setActiveObject(cloneObject);
      canvas?.requestRenderAll();
    })
  }, [canvas]);

  return {
    copy,
    paste,
  };
};
