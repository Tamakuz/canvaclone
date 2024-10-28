"use client";
import { ChromePicker, CirclePicker } from "react-color";
import { rgbaObjectToString } from "../../utils";
import { colors } from "@/types";
import { useState, useEffect } from "react";

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
}

const ColorPicker = ({ value, onChange }: ColorPickerProps) => {
  const [color, setColor] = useState(value);
  return (
    <div className="w-full space-y-4">
      <ChromePicker
        color={color}
        onChange={(color) => {
          const formattedValue = rgbaObjectToString(color.rgb);
          setColor(formattedValue);
          // onChange(formattedValue);
        }}
        onChangeComplete={(color) => {
          const formattedValue = rgbaObjectToString(color.rgb);
          setColor(formattedValue);
          onChange(formattedValue);
        }}
        styles={{
          default: {
            picker: {
              width: "100%",
              boxShadow: "none",
              border: "1px solid #e5e5e5",
              borderRadius: "8px",
            },
          },
        }}
      />
      <CirclePicker
        color={color}
        colors={colors}
        onChangeComplete={(color) => {
          const formattedValue = rgbaObjectToString(color.rgb);
          setColor(formattedValue);
          onChange(formattedValue);
        }}
      />
    </div>
  );
};

export default ColorPicker;
