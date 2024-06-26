import { Avatar, Menu, MenuItem } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useContext, useState } from "react";
import { GlobalContext } from "../../Context/GlobalContext";
import { useNavigate } from "react-router-dom";

interface ProfileNavProps {}

const ProfileNav: React.FC<ProfileNavProps> = () => {
  const { authStatus, logout, user } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleClose();
    await logout();
    navigate("/login");
  };

  return (
    <>
      <LoadingButton
        loading={authStatus === "loading"}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {authStatus === "auth" && (
          <Avatar>{user.username?.[0]?.toUpperCase()}</Avatar>
        )}
      </LoadingButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default ProfileNav;
