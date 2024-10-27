"use client"
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Navbar from './Navbar'
import { ActiveTool } from '@/types';
import Sidebar from './Sidebar';
import ContainerActiveTab from './ContainerActiveTab';
import useEditor from '../../hooks/useEditor';
import { fabric } from 'fabric';
import FooterEditor from './FooterEditor';
import Toolbar from './Toolbar';

const Editor = () => {
  const [activeTool, setActiveTool] = useState<ActiveTool>("select");
  const canvasRef = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { initializeCanvas, editor } = useEditor({
    defaultState: "",
    defaultWidth: 900,
    defaultHeight: 1200,
  });

  useEffect(() => {
    if (activeTool === "draw") {
      editor?.enableDrawingMode();
    }

    if (activeTool !== "draw") {
      editor?.disableDrawingMode();
    }
  }, [activeTool, editor]);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = new fabric.Canvas(canvasRef.current, {
        controlsAboveOverlay: true,
        preserveObjectStacking: true,
      });

      initializeCanvas({
        initialCanvas: canvas,
        initialContainer: containerRef.current!,
      });

      return () => {
        canvas.dispose();
      };
    }
  }, [initializeCanvas]);

  return (
    <div>
      <Navbar activeTab={activeTool} setActiveTab={setActiveTool} />
      <div className="h-[calc(100%-68px)] flex">
        <Sidebar activeTab={activeTool} setActiveTab={setActiveTool} />
        <ContainerActiveTab activeTab={activeTool} setActiveTab={setActiveTool} editor={editor} />
        <main className="flex-1 bg-muted overflow-hidden relative flex flex-col">
          <Toolbar editor={editor} activeTool={activeTool} onChangeActiveTool={setActiveTool} />
          <div
            className="flex-1 h-[calc(100%-124px)] bg-muted"
            ref={containerRef}
          >
            <canvas ref={canvasRef} />
          </div>
          <FooterEditor editor={editor} />
        </main>
      </div>
    </div>
  );
}

export default Editor