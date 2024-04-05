import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import ToggleColorMode from "./ToggleColorMode";
import { useContext } from "react";
import { GlobalContext } from "../../Context/GlobalContext";
import MobileNav from "./MobileNav";
import useScrollToSection from "../../Hooks/Navigation/useScrollToSection";
import { Link, useNavigate } from "react-router-dom";
import UnauthNav from "./Menus/UnauthNav";
import AuthNav from "./Menus/AuthNav";

const logoStyle = {
  width: "140px",
  height: "auto",
  cursor: "pointer",
};

interface DesktopNavProps {}

const DesktopNav: React.FC<DesktopNavProps> = () => {
  const navigate = useNavigate();

  const navigateTo = (link: string) => {
    navigate(link);
  };
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
        <MobileNav />
        <Link to="/">
          <img
            src={
              "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg"
            }
            style={logoStyle}
            alt="logo of sitemark"
          />
        </Link>
        {authStatus === "unauth" && <UnauthNav />}
        {authStatus === "auth" && <AuthNav />}
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
