import { Outlet } from "react-router-dom";
import { AppBar, Container, Toolbar } from "@mui/material";
import { useState } from "react";
import useScrollToSection from "../../Hooks/Navigation/useScrollToSection";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const { scrollToSection } = useScrollToSection({ setOpen });

  return (
    <div>
      <div>
        <AppBar
          position="fixed"
          sx={{
            boxShadow: 0,
            bgcolor: "transparent",
            backgroundImage: "none",
            mt: 2,
          }}
        >
          <Container maxWidth="lg">
            <Toolbar
              variant="regular"
              sx={(theme) => ({
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexShrink: 0,
                borderRadius: "999px",
                bgcolor:
                  theme.palette.mode === "light"
                    ? "rgba(255, 255, 255, 0.4)"
                    : "rgba(0, 0, 0, 0.4)",
                backdropFilter: "blur(24px)",
                maxHeight: 40,
                border: "1px solid",
                borderColor: "divider",
                boxShadow:
                  theme.palette.mode === "light"
                    ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                    : "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
              })}
            >
              <DesktopNav scrollToSection={scrollToSection} />
              <MobileNav
                scrollToSection={scrollToSection}
                open={open}
                toggleDrawer={toggleDrawer}
              />
            </Toolbar>
          </Container>
        </AppBar>
      </div>
      <Outlet />
    </div>
  );
};
export default Navbar;
