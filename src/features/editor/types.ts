import { fabric } from "fabric";
import { ITextboxOptions } from "fabric/fabric-impl";
import * as material from "material-colors";

export const FILL_COLOR = "rgba(0, 0, 0, 1)";
export const STROKE_COLOR = "rgba(0, 0, 0, 1)";
export const STROKE_WIDTH = 2;
export const STROKE_DASH_ARRAY = [];
export const FONT_FAMILY = "Arial";
export const FONT_SIZE = 32;
export const FONT_WEIGHT = 400;

export const fonts = [
  "Arial",
  "Arial Black",
  "Verdana",
  "Helvetica",
  "Tahoma",
  "Trebuchet MS",
  "Times New Roman",
  "Gorgia",
  "Garamond",
  "Courier New",
  "Brush Script MT",
  "Palatino",
  "Bookman",
  "Comic Sans MS",
  "Impact",
  "Lucida Sans Unicode",
  "Geneva",
  "Lucida Console",
];

export const selectionDepedentTools = [
  "fill",
  "font",
  "filter",
  "opacity",
  "remove-bg",
  "stroke-color",
  "stroke-width",
];

export const colors = [
  material.red["500"],
  material.pink["500"],
  material.purple["500"],
  material.deepPurple["500"],
  material.indigo["500"],
  material.blue["500"],
  material.lightBlue["500"],
  material.cyan["500"],
  material.teal["500"],
  material.green["500"],
  material.lightGreen["500"],
  material.lime["500"],
  material.yellow["500"],
  material.amber["500"],
  material.orange["500"],
  material.deepOrange["500"],
  material.brown["500"],
  material.blueGrey["500"],
  "transparent",
];

export type ActiveTool =
  | "select"
  | "shapes"
  | "text"
  | "images"
  | "draw"
  | "fill"
  | "stroke-color"
  | "stroke-width"
  | "font"
  | "opacity"
  | "filter"
  | "settings"
  | "ai"
  | "remove-bg"
  | "templates";

export const CIRCLE_OPTIONS = {
  radius: 225,
  width: 100,
  height: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
};

export const RECTANGLE_OPTIONS = {
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  width: 400,
  height: 400,
  angle: 0,
};

export const TRIANGLE_OPTIONS = {
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  width: 400,
  height: 400,
  angle: 0,
};

export const DIAMOND_OPTIONS = {
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  width: 600,
  height: 600,
  angle: 0,
};

export const TEXT_OPTIONS = {
  type: "textbox",
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  fontSize: FONT_SIZE,
  fontFamily: FONT_FAMILY,
};

export type Editor = {
  bringToFront: () => void;
  bringForward: () => void;
  sendToBack: () => void;
  sendBackwards: () => void;
  changeOpacity: (value: number) => void;
  changeFillColor: (value: string) => void;
  changeStrokeWidth: (value: number) => void;
  changeStrokeColor: (value: string) => void;
  changeStrokeDashArray: (value: number[]) => void;

  insertText: (value: string, options?: ITextboxOptions) => void;
  changeFontFamily: (value: string) => void;
  changeFontWeight: (value: number) => void;
  changeFontStyle: (value: string) => void;
  changeFontLinethrough: (value: boolean) => void;
  changeFontUnderline: (value: boolean) => void;
  changeTextAlign: (value: string) => void;
  changeFontSize: (value: number) => void;
  getActiveFontFamily: () => string;
  getActiveFontWeight: () => number;
  getActiveFontStyle: () => string;
  getActiveFontLinethrough: () => boolean;
  getActiveFontUnderline: () => boolean;
  getActiveTextAlign: () => string;
  getActiveFontSize: () => number;
  deleteObject: () => void;

  addCircle: () => void;
  addRoundRectangle: () => void;
  addRectangle: () => void;
  addTriangle: () => void;
  addDownsideTriangle: () => void;
  addDiamond: () => void;
  getActiveOpacity: () => number;
  getActiveFillColor: () => string;
  getActiveStrokeColor: () => string;
  getActiveStrokeWidth: () => number;
  getActiveStrokeDashArray: () => number[];

  canvas: fabric.Canvas;
  selectedObjects: fabric.Object[];
};

export type BuildEditorProps = {
  canvas: fabric.Canvas;
  fillColor: string;
  strokeWidth: number;
  strokeColor: string;
  fontFamily: string;
  strokeDashArray: number[];
  selectedObjects: fabric.Object[];
  setFontFamily: (value: string) => void;
  setFillColor: (value: string) => void;
  setStrokeWidth: (value: number) => void;
  setStrokeColor: (value: string) => void;
  setStrokeDashArray: (value: number[]) => void;
};

export interface EditorHookProps {
  clearSelectionCallback?: () => void;
}
