"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

import {
  ArrowUp,
  ArrowDown,
  SendToBack,
  BringToFront,
  ChevronDown,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Trash,
} from "lucide-react";
import { BsBorderWidth } from "react-icons/bs";
import { RxTransparencyGrid } from "react-icons/rx";
import { FaBold, FaItalic, FaStrikethrough, FaUnderline } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { Hint } from "@/components/custom/hint";

import { ActiveTool, Editor, FONT_SIZE, FONT_WEIGHT } from "../types";
import { isTextType } from "../utils";
import { FontSizeInput } from "./font-size-input";

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
  const initialFillColor = editor?.getActiveFillColor();
  const initialStrokeColor = editor?.getActiveStrokeColor();
  const initialFontFamily = editor?.getActiveFontFamily();
  const initialFontWeight = editor?.getActiveFontWeight() ?? FONT_WEIGHT;
  const initialFontStyle = editor?.getActiveFontStyle();
  const initialFontLinethrough = editor?.getActiveFontLinethrough();
  const initialFontUnderline = editor?.getActiveFontUnderline();
  const initialTextAlign = editor?.getActiveTextAlign();
  const initialFontSize = editor?.getActiveFontSize() ?? FONT_SIZE;

  const [properties, setProperties] = useState({
    fillColor: initialFillColor,
    strokeColor: initialStrokeColor,
    fontFamily: initialFontFamily,
    fontWeight: initialFontWeight,
    fontStyle: initialFontStyle,
    fontLinethrough: initialFontLinethrough,
    fontUnderline: initialFontUnderline,
    textAlign: initialTextAlign,
    fontSize: initialFontSize,
  });

  const selectedObject = editor?.selectedObjects[0];
  const selectedObjectType = editor?.selectedObjects[0]?.type;

  const isText = isTextType(selectedObjectType);

  const onChangeFontSize = (val: number) => {
    if (!selectedObject) return;

    editor.changeFontSize(val);
    setProperties((prevProps) => ({ ...prevProps, fontSize: val }));
  };

  const onChangeTextAlign = (val: string) => {
    if (!selectedObject) return;

    editor.changeTextAlign(val);
    setProperties((prevProps) => ({ ...prevProps, textAlign: val }));
  };

  const toggleBold = () => {
    if (!selectedObject) return;

    const val = properties.fontWeight > 500 ? 500 : 700;

    editor?.changeFontWeight(val);
    setProperties((prevProps) => ({ ...prevProps, fontWeight: val }));
  };

  const toggleItalic = () => {
    if (!selectedObject) return;

    const val = properties.fontStyle === "normal" ? "italic" : "normal";

    editor.changeFontStyle(val);
    setProperties((prevProps) => ({ ...prevProps, fontStyle: val }));
  };

  const toggleLinethrough = () => {
    if (!selectedObject) return;

    const val = !properties.fontLinethrough;

    editor.changeFontLinethrough(val);
    setProperties((prevProps) => ({ ...prevProps, fontLinethrough: val }));
  };

  const toggleUnderline = () => {
    if (!selectedObject) return;

    const val = !properties.fontUnderline;

    editor.changeFontUnderline(val);
    setProperties((prevProps) => ({ ...prevProps, fontUnderline: val }));
  };

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
                backgroundColor: properties.fillColor,
              }}
            />
          </Button>
        </Hint>
      </div>

      {!isText && (
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
                  borderColor: properties.strokeColor,
                }}
              />
            </Button>
          </Hint>
        </div>
      )}

      {!isText && (
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
      )}

      {/* Text Formating */}
      {isText && (
        <div className="flex justify-center items-center h-full">
          <Hint label="Font" side="bottom" sideOffset={5}>
            <Button
              onClick={() => onChangeActiveTool("font")}
              size="icon"
              variant="ghost"
              className={cn(
                "w-auto px-2 text-sm",
                activeTool === "font" && "bg-gray-100"
              )}
            >
              <div className="max-w-[100px] truncate">
                {properties.fontFamily}
              </div>
              <ChevronDown className="size-4 ml-2 shrink-0" />
            </Button>
          </Hint>
        </div>
      )}

      {isText && (
        <div className="flex justify-center items-center h-full">
          <Hint label="Bold" side="bottom" sideOffset={5}>
            <Button
              onClick={toggleBold}
              size="icon"
              variant="ghost"
              className={cn(properties.fontWeight > 500 && "bg-gray-100")}
            >
              <FaBold className="size-4 " />
            </Button>
          </Hint>
        </div>
      )}

      {isText && (
        <div className="flex justify-center items-center h-full">
          <Hint label="Italic" side="bottom" sideOffset={5}>
            <Button
              onClick={toggleItalic}
              size="icon"
              variant="ghost"
              className={cn(properties.fontStyle === "italic" && "bg-gray-100")}
            >
              <FaItalic className="size-4 " />
            </Button>
          </Hint>
        </div>
      )}

      {isText && (
        <div className="flex justify-center items-center h-full">
          <Hint label="Linethrough" side="bottom" sideOffset={5}>
            <Button
              onClick={toggleLinethrough}
              size="icon"
              variant="ghost"
              className={cn(properties.fontLinethrough && "bg-gray-100")}
            >
              <FaStrikethrough className="size-4 " />
            </Button>
          </Hint>
        </div>
      )}

      {isText && (
        <div className="flex justify-center items-center h-full">
          <Hint label="Underline" side="bottom" sideOffset={5}>
            <Button
              onClick={toggleUnderline}
              size="icon"
              variant="ghost"
              className={cn(properties.fontUnderline && "bg-gray-100")}
            >
              <FaUnderline className="size-4 " />
            </Button>
          </Hint>
        </div>
      )}

      {/* Text Align */}
      {isText && (
        <div className="flex justify-center items-center h-full">
          <Hint label="Left" side="bottom" sideOffset={5}>
            <Button
              onClick={() => onChangeTextAlign("left")}
              size="icon"
              variant="ghost"
              className={cn(properties.textAlign === "left" && "bg-gray-100")}
            >
              <AlignLeft className="size-4 " />
            </Button>
          </Hint>
        </div>
      )}

      {isText && (
        <div className="flex justify-center items-center h-full">
          <Hint label="Center" side="bottom" sideOffset={5}>
            <Button
              onClick={() => onChangeTextAlign("center")}
              size="icon"
              variant="ghost"
              className={cn(properties.textAlign === "center" && "bg-gray-100")}
            >
              <AlignCenter className="size-4 " />
            </Button>
          </Hint>
        </div>
      )}

      {isText && (
        <div className="flex justify-center items-center h-full">
          <Hint label="Right" side="bottom" sideOffset={5}>
            <Button
              onClick={() => onChangeTextAlign("right")}
              size="icon"
              variant="ghost"
              className={cn(properties.textAlign === "right" && "bg-gray-100")}
            >
              <AlignRight className="size-4 " />
            </Button>
          </Hint>
        </div>
      )}

      {isText && (
        <div className="flex justify-center items-center h-full">
          <FontSizeInput
            value={properties.fontSize}
            onChange={onChangeFontSize}
          />
        </div>
      )}

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

      {/* Element Deletion */}
      <div className="flex justify-center items-center h-full">
        <Hint label="Delete" side="bottom" sideOffset={5}>
          <Button
            onClick={() => editor?.deleteObject()}
            size="icon"
            variant="ghost"
          >
            <Trash className="size-4" />
          </Button>
        </Hint>
      </div>
    </div>
  );
};
