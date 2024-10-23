"use client"
import React, { useEffect, useRef, useState } from 'react'
import Navbar from './Navbar'
import { ActiveTool } from '@/types';
import Sidebar from './Sidebar';
import ContainerActiveTab from './ContainerActiveTab';
import useEditor from '../../hooks/useEditor';
import { Canvas } from 'fabric';

const Editor = () => {
  const [activeTool, setActiveTool] = useState<ActiveTool>("select");
  const canvasRef = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { initializeCanvas } = useEditor({
    defaultState: "",
    defaultWidth: 400,
    defaultHeight: 500,
  });

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = new Canvas(canvasRef.current, {
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
        <ContainerActiveTab activeTab={activeTool} setActiveTab={setActiveTool} />
        <main className="flex-1 bg-muted overflow-hidden relative flex flex-col">
          <div
            className="flex-1 h-[calc(100%-124px)] bg-muted"
            ref={containerRef}
          >
            <canvas ref={canvasRef} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Editor