import React, { useContext } from "react";
import { Theme } from "../../types/theme";
import { lightTheme } from "../../utils/theme";

type ContextType = Theme;

const initialValue: ContextType = lightTheme;

export const ThemeContext = React.createContext<ContextType>(initialValue);

export const useTheme = (): Theme => {
  return useContext(ThemeContext);
};
