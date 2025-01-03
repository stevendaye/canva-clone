import type { RGBColor } from "react-color";

export const isTextType = (type: string | undefined) => {
  return type === "text" || type === "i-text" || type === "textbox";
};

export const rgbaObjectToString = (rgba: RGBColor | "transparent") => {
  if (rgba === "transparent") {
    return `rgba(0,0,0,0)`;
  }

  const alpha = rgba.a ?? 1;

  return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${alpha})`;
};
