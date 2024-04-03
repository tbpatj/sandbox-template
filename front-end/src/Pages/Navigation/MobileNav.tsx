import { Box, Button, Divider, Drawer, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ToggleColorMode from "./ToggleColorMode";
import { useContext, useState } from "react";
import { GlobalContext } from "../../Context/GlobalContext";

interface MobileNavProps {
  scrollToSection: (sectionId: string) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ scrollToSection }) => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  const { authStatus } = useContext(GlobalContext);

  return (
    <>
      <Box sx={{ display: { sm: "", md: "none" } }}>
        <Button
          variant="text"
          color="primary"
          aria-label="menu"
          onClick={toggleDrawer(true)}
          sx={{ minWidth: "30px", p: "4px" }}
        >
          <MenuIcon />
        </Button>
        <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
          <Box
            sx={{
              minWidth: "60dvw",
              p: 2,
              backgroundColor: "background.paper",
              flexGrow: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "end",
                justifyContent: "space-between",
                flexGrow: 1,
              }}
            >
              {/* <ProfileNav /> */}
              <ToggleColorMode />
            </Box>
            <MenuItem onClick={() => scrollToSection("features")}>
              Features
            </MenuItem>
            <MenuItem onClick={() => scrollToSection("testimonials")}>
              Testimonials
            </MenuItem>
            <MenuItem onClick={() => scrollToSection("highlights")}>
              Highlights
            </MenuItem>
            <MenuItem onClick={() => scrollToSection("pricing")}>
              Pricing
            </MenuItem>
            <MenuItem onClick={() => scrollToSection("faq")}>FAQ</MenuItem>
            <Divider />
            {authStatus === "unauth" && (
              <>
                <MenuItem>
                  <Button
                    color="primary"
                    variant="contained"
                    component="a"
                    href="/material-ui/getting-started/templates/sign-up/"
                    target="_blank"
                    sx={{ width: "100%" }}
                  >
                    Sign up
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button
                    color="primary"
                    variant="outlined"
                    component="a"
                    href="/material-ui/getting-started/templates/sign-in/"
                    target="_blank"
                    sx={{ width: "100%" }}
                  >
                    Sign in
                  </Button>
                </MenuItem>
              </>
            )}
          </Box>
        </Drawer>
      </Box>
    </>
  );
};

export default MobileNav;
