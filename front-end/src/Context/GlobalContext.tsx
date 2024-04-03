import { createContext, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import usePalette, {
  PaletteHook,
  defaultPalleteHook,
} from "../Hooks/usePalette";

interface GlobalContextProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

type GlobalProps = PaletteHook & {}; // & other props

const defaultGlobalData = {
  ...defaultPalleteHook,
};

export const GlobalContext = createContext<GlobalProps>(defaultGlobalData);

export const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({
  children,
}) => {
  const palette = usePalette();
  const defaultTheme = createTheme({ palette: { mode: palette.paletteMode } });

  const value: GlobalProps = useMemo(() => {
    return {
      ...palette,
    };
  }, [palette]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
    </ThemeProvider>
  );
};
