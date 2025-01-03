import { ChromePicker, CirclePicker } from "react-color";

import { colors } from "../types";
import { rgbaObjectToString } from "../utils";

interface ColorPickerProps {
  value: string;
  onChange: (vlaue: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="w-full space-y-4">
      <ChromePicker
        className="border rounded-lg"
        color={value}
        onChange={(color) => {
          const formatedValue = rgbaObjectToString(color.rgb);
          onChange(formatedValue);
        }}
      />
      <CirclePicker
        color={value}
        colors={colors}
        onChangeComplete={(color) => {
          const formatedValue = rgbaObjectToString(color.rgb);
          onChange(formatedValue);
        }}
      />
    </div>
  );
};
