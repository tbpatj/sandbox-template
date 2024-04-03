import { createContext, useMemo, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import usePalette, {
  PaletteHook,
  defaultPalleteHook,
} from "../Hooks/Palette/usePalette";
import useAuth, { AuthHook, defaultAuthHook } from "../Hooks/useAuth";
import useFetcher, { FetcherFunc } from "../Hooks/useFetcher";

interface GlobalContextProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

type GlobalProps = PaletteHook & AuthHook & { fetcher: FetcherFunc }; // & other props

const defaultGlobalData = {
  ...defaultPalleteHook,
  ...defaultAuthHook,
};

export const GlobalContext = createContext<GlobalProps>(defaultGlobalData);

export const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({
  children,
}) => {
  const auth = useAuth();

  const palette = usePalette();
  const defaultTheme = createTheme({ palette: palette.paletteOptions });

  const value: GlobalProps = useMemo(() => {
    return {
      ...palette,
      ...auth,
    };
  }, [palette, auth]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
    </ThemeProvider>
  );
};
