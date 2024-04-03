import { PaletteMode, PaletteOptions } from "@mui/material";
import { useEffect, useState } from "react";
import { ColorTheme, darkColors, lightColors } from "../../Utils/Colors";
import { mapPaletteMUI } from "./mapPaletteMUI";

export interface PaletteHook {
  paletteOptions: PaletteOptions;
  togglePaletteMode: () => void;
  colors: ColorTheme;
}

export const defaultPalleteHook: PaletteHook = {
  paletteOptions: mapPaletteMUI("light"),
  togglePaletteMode: () => {},
  colors: lightColors,
};

const usePalette: () => PaletteHook = () => {
  const [paletteOptions, setPaletteOptions] = useState<PaletteOptions>(
    mapPaletteMUI(
      (localStorage?.getItem?.("paletteMode") as PaletteMode) ?? "light"
    )
  );
  const [colors, setColors] = useState<ColorTheme>(
    paletteOptions.mode === "light" ? lightColors : darkColors
  );
  const togglePaletteMode = () => {
    //inverted because it's before we actually change the palette mode
    setColors(paletteOptions.mode === "light" ? darkColors : lightColors);
    setPaletteOptions((prev) => {
      const newTheme = prev.mode === "light" ? "dark" : "light";
      localStorage.setItem("paletteMode", newTheme);
      //change the mui theme
      return mapPaletteMUI(newTheme);
    });
  };

  useEffect(() => {
    document
      .getElementsByTagName("html")[0]
      .setAttribute(
        "data-bs-theme",
        (localStorage?.getItem?.("paletteMode") as PaletteMode) ?? "light"
      );
  }, []);

  useEffect(() => {
    //change the bootstrap theme
    document
      .getElementsByTagName("html")[0]
      .setAttribute("data-bs-theme", paletteOptions?.mode ?? "light");
  }, [paletteOptions]);

  return {
    paletteOptions,
    togglePaletteMode,
    colors,
  };
};

export default usePalette;
