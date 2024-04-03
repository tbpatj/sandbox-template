import { Box, Button, Divider, Drawer, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ToggleColorMode from "./ToggleColorMode";
import { useContext, useState } from "react";
import { GlobalContext } from "../../Context/GlobalContext";
import { useNavigate } from "react-router-dom";

interface MobileNavProps {
  scrollToSection: (sectionId: string) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ scrollToSection }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const navigateTo = (link: string) => {
    navigate(link);
    setOpen(false);
  };

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
                    onClick={() => navigateTo("/signup")}
                    color="primary"
                    variant="contained"
                    sx={{ width: "100%" }}
                  >
                    Sign up
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button
                    onClick={() => navigateTo("/login")}
                    color="primary"
                    variant="outlined"
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
