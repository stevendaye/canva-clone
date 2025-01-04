import { useCallback, useState, useMemo } from "react";
import { fabric } from "fabric";

import { useAutoResize } from "./use-auto-resize";
import { useCanvasEvents } from "./use-canvas-events";

import {
  BuildEditorProps,
  CIRCLE_OPTIONS,
  DIAMOND_OPTIONS,
  Editor,
  EditorHookProps,
  FILL_COLOR,
  FONT_FAMILY,
  FONT_SIZE,
  FONT_WEIGHT,
  RECTANGLE_OPTIONS,
  STROKE_COLOR,
  STROKE_DASH_ARRAY,
  STROKE_WIDTH,
  TEXT_OPTIONS,
  TRIANGLE_OPTIONS,
} from "../types";
import { isTextType } from "../utils";

const buildEditor = ({
  canvas,
  fillColor,
  fontFamily,
  setFillColor,
  strokeColor,
  setStrokeColor,
  strokeWidth,
  setFontFamily,
  setStrokeWidth,
  selectedObjects,
  strokeDashArray,
  setStrokeDashArray,
}: BuildEditorProps): Editor => {
  // Locate and get canvas where the shapes will be displayed (the workspace)
  const getWorkspace = () => {
    return canvas.getObjects().find((object) => object.name === "clip");
  };

  // Center Canvas
  const center = (object: fabric.Object) => {
    const workspace = getWorkspace();
    const centerShape = workspace?.getCenterPoint();

    if (!center) return;

    // @ts-ignore
    canvas._centerObject(object, centerShape);
  };

  // Add object to canvas
  const addToCanvas = (object: fabric.Object) => {
    center(object);
    canvas.add(object);
    canvas.setActiveObject(object);
  };

  return {
    changeFillColor: (value) => {
      setFillColor(value);
      canvas.getActiveObjects().forEach((object) => {
        object.set({ fill: value });
      });

      canvas.renderAll();
    },
    changeStrokeColor: (value) => {
      setStrokeColor(value);
      canvas.getActiveObjects().forEach((object) => {
        // Apply fill for texts, given that they have no strokes
        if (isTextType(object.type)) {
          object.set({ fill: value });
          return;
        }

        object.set({ stroke: value });
      });

      canvas.renderAll();
    },
    changeStrokeWidth: (value) => {
      setStrokeWidth(value);
      canvas.getActiveObjects().forEach((object) => {
        object.set({ strokeWidth: value });
      });

      canvas.renderAll();
    },
    changeStrokeDashArray: (value) => {
      setStrokeDashArray(value);
      canvas.getActiveObjects().forEach((object) => {
        object.set({ strokeDashArray: value });
      });

      canvas.renderAll();
    },
    changeOpacity: (value) => {
      canvas.getActiveObjects().forEach((object) => {
        object.set({ opacity: value });
      });

      canvas.renderAll();
    },

    // Layer, Arrange & Stacking
    bringToFront: () => {
      canvas.getActiveObjects().forEach((object) => {
        canvas.bringToFront(object);
      });

      canvas.renderAll();

      const workspace = getWorkspace();
      workspace?.sendToBack();
    },
    bringForward: () => {
      canvas.getActiveObjects().forEach((object) => {
        canvas.bringForward(object);
      });

      canvas.renderAll();

      const workspace = getWorkspace();
      workspace?.sendToBack();
    },
    sendToBack: () => {
      canvas.getActiveObjects().forEach((object) => {
        canvas.sendToBack(object);
      });

      canvas.renderAll();

      const workspace = getWorkspace();
      workspace?.sendToBack();
    },
    sendBackwards: () => {
      canvas.getActiveObjects().forEach((object) => {
        canvas.sendBackwards(object);
      });

      canvas.renderAll();

      const workspace = getWorkspace();
      workspace?.sendToBack();
    },

    // Text Manipulation
    insertText: (value, options) => {
      const object = new fabric.Textbox(value, {
        ...TEXT_OPTIONS,
        fill: FILL_COLOR,
        ...options,
      });

      addToCanvas(object);
    },
    changeFontFamily: (value) => {
      setFontFamily(value);
      canvas.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          // @ts-ignore
          object.set({ fontFamily: value });
        }
      });

      canvas.renderAll();
    },
    changeFontWeight: (value) => {
      canvas.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          // @ts-ignore
          object.set({ fontWeight: value });
        }
      });

      canvas.renderAll();
    },
    changeFontStyle: (value) => {
      canvas.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          // @ts-ignore
          object.set({ fontStyle: value });
        }
      });

      canvas.renderAll();
    },
    changeFontLinethrough: (value) => {
      canvas.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          // @ts-ignore
          object.set({ linethrough: value });
        }
      });

      canvas.renderAll();
    },
    changeFontUnderline: (value) => {
      canvas.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          // @ts-ignore
          object.set({ underline: value });
        }
      });

      canvas.renderAll();
    },
    changeTextAlign: (value) => {
      canvas.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          // @ts-ignore
          object.set({ textAlign: value });
        }
      });

      canvas.renderAll();
    },
    changeFontSize: (value) => {
      canvas.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          // @ts-ignore
          object.set({ fontSize: value });
        }
      });

      canvas.renderAll();
    },
    getActiveFontFamily: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) return fontFamily;

      // @ts-ignore
      const value = selectedObject.get("fontFamily") || fontFamily;

      return value as string;
    },
    getActiveFontWeight: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) return FONT_WEIGHT;

      // @ts-ignore
      const value = selectedObject.get("fontWeight") || FONT_WEIGHT;

      return value as number;
    },
    getActiveFontStyle: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) return "normal";

      // @ts-ignore
      const value = selectedObject.get("fontStyle") || "normal";

      return value as string;
    },
    getActiveFontLinethrough: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) return false;

      // @ts-ignore
      const value = selectedObject.get("linethrough") || false;

      return value as boolean;
    },
    getActiveFontUnderline: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) return false;

      // @ts-ignore
      const value = selectedObject.get("underline") || false;

      return value as boolean;
    },
    getActiveTextAlign: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) return "left";

      // @ts-ignore
      const value = selectedObject.get("textAlign") || "left";

      return value as string;
    },
    getActiveFontSize: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) return FONT_SIZE;

      // @ts-ignore
      const value = selectedObject.get("fontSize") || FONT_SIZE;

      return value as number;
    },

    // Create new shapes
    addCircle: () => {
      const object = new fabric.Circle({
        ...CIRCLE_OPTIONS,
        fill: fillColor,

        // Set default values on canvas creation
        stroke: strokeColor,
        strokeWidth,
        strokeDashArray,
      });

      addToCanvas(object);
    },
    addRoundRectangle: () => {
      const object = new fabric.Rect({
        ...RECTANGLE_OPTIONS,
        rx: 45,
        ry: 45,

        // Set default values on canvas creation
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth,
        strokeDashArray,
      });

      addToCanvas(object);
    },
    addRectangle: () => {
      const object = new fabric.Rect({
        ...RECTANGLE_OPTIONS,

        // Set default values on canvas creation
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth,
        strokeDashArray,
      });

      addToCanvas(object);
    },
    addTriangle: () => {
      const object = new fabric.Triangle({
        ...TRIANGLE_OPTIONS,

        // Set default values on canvas creation
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth,
        strokeDashArray,
      });

      addToCanvas(object);
    },
    addDownsideTriangle: () => {
      const HEIGHT = TRIANGLE_OPTIONS.height;
      const WIDTH = TRIANGLE_OPTIONS.width;

      const object = new fabric.Polygon(
        [
          { x: 0, y: 0 },
          { x: WIDTH, y: 0 },
          { x: WIDTH / 2, y: HEIGHT },
        ],
        {
          ...TRIANGLE_OPTIONS,

          // Set default values on canvas creation
          fill: fillColor,
          stroke: strokeColor,
          strokeWidth,
          strokeDashArray,
        }
      );

      addToCanvas(object);
    },
    addDiamond: () => {
      const HEIGHT = DIAMOND_OPTIONS.height;
      const WIDTH = DIAMOND_OPTIONS.width;

      const object = new fabric.Polygon(
        [
          { x: WIDTH / 2, y: 0 },
          { x: WIDTH, y: HEIGHT / 2 },
          { x: WIDTH / 2, y: HEIGHT },
          { x: 0, y: HEIGHT / 2 },
        ],
        {
          ...DIAMOND_OPTIONS,

          // Set default values on canvas creation
          fill: fillColor,
          stroke: strokeColor,
          strokeWidth,
          strokeDashArray,
        }
      );

      addToCanvas(object);
    },

    getActiveFillColor: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) return fillColor;

      const value = selectedObject.get("fill") || fillColor;

      return value as string;
    },
    getActiveStrokeColor: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) return strokeColor;

      const value = selectedObject.get("stroke") ?? strokeColor;

      return value;
    },
    getActiveStrokeWidth: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) return strokeWidth;

      const value = selectedObject.get("strokeWidth") ?? strokeWidth;

      return value;
    },
    getActiveStrokeDashArray: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) return strokeDashArray;

      const value = selectedObject.get("strokeDashArray") ?? strokeDashArray;

      return value;
    },
    getActiveOpacity: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) return 1;

      const value = selectedObject.get("opacity") ?? 1;

      return value;
    },

    // Delete current selected object
    deleteObject: () => {
      canvas.getActiveObjects().forEach((object) => canvas.remove(object));
      canvas.discardActiveObject();
      canvas.renderAll();
    },
    canvas,
    selectedObjects,
  };
};

export const useEditor = ({ clearSelectionCallback }: EditorHookProps) => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [selectedObjects, setSelectedObjects] = useState<fabric.Object[]>([]);

  const [fontFamily, setFontFamily] = useState<string>(FONT_FAMILY);
  const [fillColor, setFillColor] = useState<string>(FILL_COLOR);
  const [strokeColor, setStrokeColor] = useState<string>(STROKE_COLOR);
  const [strokeWidth, setStrokeWidth] = useState<number>(STROKE_WIDTH);
  const [strokeDashArray, setStrokeDashArray] =
    useState<number[]>(STROKE_DASH_ARRAY);

  // Autoreize hook
  useAutoResize({
    canvas,
    container,
  });

  // Store canvas action events
  useCanvasEvents({
    canvas,
    setSelectedObjects,
    clearSelectionCallback,
  });

  // Start Editor with shapes
  const editor = useMemo(() => {
    if (canvas)
      return buildEditor({
        canvas,
        fillColor,
        setFillColor,
        strokeColor,
        setStrokeColor,
        strokeWidth,
        setStrokeWidth,
        selectedObjects,
        strokeDashArray,
        setStrokeDashArray,
        fontFamily,
        setFontFamily,
      });

    return undefined;
  }, [
    canvas,
    fillColor,
    fontFamily,
    strokeColor,
    strokeWidth,
    selectedObjects,
    strokeDashArray,
  ]);

  const init = useCallback(
    ({
      initialCanvas,
      initialContainer,
    }: {
      initialCanvas: fabric.Canvas;
      initialContainer: HTMLDivElement;
    }) => {
      const initialWorkspace = new fabric.Rect({
        width: 1075,
        height: 1200,
        name: "clip",
        fill: "white",
        selectable: false,
        hasControls: false,
        shadow: new fabric.Shadow({
          color: "rgba(0,0,0,0.8)",
          blur: 5,
        }),
      });

      initialCanvas.setWidth(initialContainer.offsetWidth);
      initialCanvas.setHeight(initialContainer.offsetHeight);

      initialCanvas.add(initialWorkspace);
      initialCanvas.centerObject(initialWorkspace);
      initialCanvas.clipPath = initialWorkspace;

      /* Store initial Canvas & Container element in state to make it resizable */
      setCanvas(initialCanvas);
      setContainer(initialContainer);
    },
    []
  );

  return { init, editor };
};
