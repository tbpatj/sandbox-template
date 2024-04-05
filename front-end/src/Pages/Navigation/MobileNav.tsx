import { Box, Button, Drawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ToggleColorMode from "./ToggleColorMode";
import { useContext, useState } from "react";
import { GlobalContext } from "../../Context/GlobalContext";
import UnauthMobileNav from "./Menus/UnauthMobileNav";
import AuthMobileNav from "./Menus/AuthMobileNav";

interface MobileNavProps {}

const MobileNav: React.FC<MobileNavProps> = ({}) => {
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
            {authStatus === "unauth" && <UnauthMobileNav setOpen={setOpen} />}
            {authStatus === "auth" && <AuthMobileNav setOpen={setOpen} />}
          </Box>
        </Drawer>
      </Box>
    </>
  );
};

export default MobileNav;
