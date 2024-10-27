import { RGBColor } from "react-color";
import { hc } from "hono/client";
import { AppType } from "@/app/(server)/api/[[...route]]/route";

export function isTextType(type: string | undefined) {
  return type === "text" || type === "i-text" || type === "textbox";
};

export function rgbaObjectToString(rgba: RGBColor | "transparent") {
  if (rgba === "transparent") {
    return `rgba(0,0,0,0)`;
  }

  const alpha = rgba.a === undefined ? 1 : rgba.a;

  return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${alpha})`;
};

export const client = hc<AppType>(process.env.NEXT_PUBLIC_APP_URL as string);