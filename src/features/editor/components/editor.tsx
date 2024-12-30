"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { useEditor } from "../hooks/use-editor";
import { Navbar } from "./navbar";
import { Sidebar } from "./sidebar";
import { Toolbar } from "./toolbar";
import { Footer } from "./footer";
import { ActiveTool } from "../types";

export const Editor = () => {
  const [activeTool, setActiveTool] = useState<ActiveTool>("select");

  const onChangeActiveTool = useCallback(
    (tool: ActiveTool) => {
      if (tool === activeTool) {
        return setActiveTool("select");
      }

      if (tool === "draw") {
        console.log("Enable Draw mode");
      }

      if (activeTool === "draw") {
        console.log("Disable Draw mode");
      }

      setActiveTool(tool);
    },
    [activeTool]
  );

  const { init } = useEditor();

  const canvasRef = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      controlsAboveOverlay: true,
      preserveObjectStacking: true,
    });

    init({
      initialCanvas: canvas,
      initialContainer: containerRef.current!,
    });

    return () => {
      canvas.dispose();
    };
  }, [init]);

  return (
    <div className="flex flex-col h-full">
      <Navbar activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} />

      <div className="flex absolute h-[calc(100%-68px)] w-full top-[68px]">
        <Sidebar
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />

        <main className="flex flex-col bg-muted flex-1 overflow-auto relative">
          <Toolbar />
          <div
            ref={containerRef}
            className="flex-1 h-[calc(100%-124px)] bg-muted"
          >
            <canvas ref={canvasRef} />
          </div>

          <Footer />
        </main>
      </div>
    </div>
  );
};
