import { PaletteMode } from "@mui/material";
import { useState } from "react";

export interface PaletteHook {
  paletteMode: PaletteMode;
  togglePaletteMode: () => void;
}

export const defaultPalleteHook: PaletteHook = {
  paletteMode: "light" as PaletteMode,
  togglePaletteMode: () => {},
};

const usePalette: () => PaletteHook = () => {
  const [paletteMode, setPaletteMode] = useState<PaletteMode>("light");
  const togglePaletteMode = () => {
    setPaletteMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return {
    paletteMode,
    togglePaletteMode,
  };
};

export default usePalette;
