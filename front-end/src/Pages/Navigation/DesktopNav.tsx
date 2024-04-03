import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import ToggleColorMode from "./ToggleColorMode";
import { useContext } from "react";
import { GlobalContext } from "../../Context/GlobalContext";
import MobileNav from "./MobileNav";
import useScrollToSection from "../../Hooks/Navigation/useScrollToSection";
import { Link, useNavigate } from "react-router-dom";

interface DesktopNavProps {}

const DesktopNav: React.FC<DesktopNavProps> = () => {
  const navigate = useNavigate();

  const navigateTo = (link: string) => {
    navigate(link);
  };
  const { scrollToSection } = useScrollToSection();
  const { authStatus } = useContext(GlobalContext);

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          px: 0,
        }}
      >
        <MobileNav scrollToSection={scrollToSection} />
        {/* <img
    src={
      "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg"
    }
    //   style={logoStyle}
    alt="logo of sitemark"
  /> */}
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <MenuItem
            onClick={() => scrollToSection("features")}
            sx={{ py: "6px", px: "12px" }}
          >
            <Typography variant="body2" color="text.primary">
              Features
            </Typography>
          </MenuItem>
          <MenuItem
            onClick={() => scrollToSection("testimonials")}
            sx={{ py: "6px", px: "12px" }}
          >
            <Typography variant="body2" color="text.primary">
              Testimonials
            </Typography>
          </MenuItem>
          <MenuItem
            onClick={() => scrollToSection("highlights")}
            sx={{ py: "6px", px: "12px" }}
          >
            <Typography variant="body2" color="text.primary">
              Highlights
            </Typography>
          </MenuItem>
          <MenuItem
            onClick={() => scrollToSection("pricing")}
            sx={{ py: "6px", px: "12px" }}
          >
            <Typography variant="body2" color="text.primary">
              Pricing
            </Typography>
          </MenuItem>
          <MenuItem
            onClick={() => scrollToSection("faq")}
            sx={{ py: "6px", px: "12px" }}
          >
            <Typography variant="body2" color="text.primary">
              FAQ
            </Typography>
          </MenuItem>
        </Box>
      </Box>
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          gap: 0.5,
          alignItems: "center",
        }}
      >
        <ToggleColorMode />
        {authStatus === "unauth" && (
          <>
            <Button
              onClick={() => navigateTo("/login")}
              color="primary"
              variant="text"
              size="small"
            >
              Sign in
            </Button>
            <Link to="/signup">
              <Button
                onClick={() => navigateTo("/signup")}
                color="primary"
                variant="contained"
                size="small"
              >
                Sign up
              </Button>
            </Link>
          </>
        )}
      </Box>
    </>
  );
};

export default DesktopNav;
