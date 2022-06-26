import { ReactNode } from "react";
import { Theme } from "../types/theme";
import { useTheme } from "./Context/ThemeContext";

export const ThemedText = ({
  children,
  lineHeight,
  fontSize,
  fontWeight,
  color,
  opacity,
  style,
  onClick,
}: {
  children: ReactNode;
  lineHeight?: number;
  fontSize?: keyof Theme["fontSize"];
  fontWeight?: keyof Theme["fontWeight"];
  color?: keyof Theme["color"];
  opacity?: number;
  style?: any;
  onClick?: () => void;
}) => {
  const t = useTheme();
  return (
    <h1
      onClick={onClick}
      style={{
        fontSize: t.fontSize[fontSize || "normal"],
        fontWeight: t.fontWeight[fontWeight || "regular"],
        color: t.color[color || "fontColor"],
        lineHeight,
        ...style,
      }}
    >
      {children}
    </h1>
  );
};
