"use client";

import { cn } from "@/lib/utils";

import { ArrowUp, ArrowDown, SendToBack, BringToFront } from "lucide-react";
import { BsBorderWidth } from "react-icons/bs";
import { RxTransparencyGrid } from "react-icons/rx";

import { Button } from "@/components/ui/button";
import { Hint } from "@/components/custom/hint";

import { ActiveTool, Editor } from "../types";

interface ToolbarProps {
  editor?: Editor;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  editor,
  activeTool,
  onChangeActiveTool,
}) => {
  const fillColor = editor?.getActiveFillColor();
  const strokeColor = editor?.getActiveStrokeColor();

  if (editor?.selectedObjects.length === 0) {
    return (
      <div
        className="flex items-center w-full overflow-x-auto z-[49] p-2 gap-x-2 shrink-0
        h-[56px] border-b bg-white"
      />
    );
  }

  return (
    <div
      className="flex items-center w-full overflow-x-auto z-[49] p-2 gap-x-2 shrink-0
      h-[56px] border-b bg-white"
    >
      <div className="flex justify-center items-center h-full">
        <Hint label="Color" side="bottom" sideOffset={5}>
          <Button
            onClick={() => onChangeActiveTool("fill")}
            size="icon"
            variant="ghost"
            className={cn(activeTool === "fill" && "bg-gray-100")}
          >
            <div
              className="rounded-sm size-4 border"
              style={{
                backgroundColor: fillColor,
              }}
            />
          </Button>
        </Hint>
      </div>

      <div className="flex justify-center items-center h-full">
        <Hint label="Stroke Color" side="bottom" sideOffset={5}>
          <Button
            onClick={() => onChangeActiveTool("stroke-color")}
            size="icon"
            variant="ghost"
            className={cn(activeTool === "stroke-color" && "bg-gray-100")}
          >
            <div
              className="rounded-sm size-4 border-2 bg-white"
              style={{
                borderColor: strokeColor,
              }}
            />
          </Button>
        </Hint>
      </div>

      <div className="flex justify-center items-center h-full">
        <Hint label="Stroke Width" side="bottom" sideOffset={5}>
          <Button
            onClick={() => onChangeActiveTool("stroke-width")}
            size="icon"
            variant="ghost"
            className={cn(activeTool === "stroke-width" && "bg-gray-100")}
          >
            <BsBorderWidth className="size-4" />
          </Button>
        </Hint>
      </div>

      {/* Layer & Arrange Stack */}
      <div className="flex justify-center items-center h-full">
        <Hint label="Bring Forward" side="bottom" sideOffset={5}>
          <Button
            onClick={() => editor?.bringForward()}
            size="icon"
            variant="ghost"
          >
            <ArrowUp className="size-4" />
          </Button>
        </Hint>
      </div>
      <div className="flex justify-center items-center h-full">
        <Hint label="Send Backwards" side="bottom" sideOffset={5}>
          <Button
            onClick={() => editor?.sendBackwards()}
            size="icon"
            variant="ghost"
          >
            <ArrowDown className="size-4" />
          </Button>
        </Hint>
      </div>

      <div className="flex justify-center items-center h-full">
        <Hint label="Bring to front" side="bottom" sideOffset={5}>
          <Button
            onClick={() => editor?.bringToFront()}
            size="icon"
            variant="ghost"
          >
            <BringToFront className="size-4" />
          </Button>
        </Hint>
      </div>
      <div className="flex justify-center items-center h-full">
        <Hint label="Send to back" side="bottom" sideOffset={5}>
          <Button
            onClick={() => editor?.sendToBack()}
            size="icon"
            variant="ghost"
          >
            <SendToBack className="size-4" />
          </Button>
        </Hint>
      </div>

      {/* Transparency */}
      <div className="flex justify-center items-center h-full">
        <Hint label="Opacity" side="bottom" sideOffset={5}>
          <Button
            onClick={() => onChangeActiveTool("opacity")}
            size="icon"
            variant="ghost"
            className={cn(activeTool === "opacity" && "bg-gray-100")}
          >
            <RxTransparencyGrid className="size-4" />
          </Button>
        </Hint>
      </div>
    </div>
  );
};
