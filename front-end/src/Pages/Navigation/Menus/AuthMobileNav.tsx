import { MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface AuthMobileNavProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthMobileNav: React.FC<AuthMobileNavProps> = ({ setOpen }) => {
  const navigate = useNavigate();

  const navigateTo = (link: string) => {
    navigate(link);
    setOpen(false);
  };
  return (
    <>
      <MenuItem onClick={() => navigateTo("/dashboard")}>Dashboard</MenuItem>
    </>
  );
};

export default AuthMobileNav;
