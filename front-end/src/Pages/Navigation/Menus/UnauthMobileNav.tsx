import { Button, Divider, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useScrollToSection from "../../../Hooks/Navigation/useScrollToSection";

interface UnauthMobileNavProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UnauthMobileNav: React.FC<UnauthMobileNavProps> = ({ setOpen }) => {
  const navigate = useNavigate();
  const { scrollToSection } = useScrollToSection();

  const navigateTo = (link: string) => {
    navigate(link);
    setOpen(false);
  };
  return (
    <>
      <MenuItem onClick={() => scrollToSection("features")}>Features</MenuItem>
      <MenuItem onClick={() => scrollToSection("testimonials")}>
        Testimonials
      </MenuItem>
      <MenuItem onClick={() => scrollToSection("highlights")}>
        Highlights
      </MenuItem>
      <MenuItem onClick={() => scrollToSection("pricing")}>Pricing</MenuItem>
      <MenuItem onClick={() => scrollToSection("faq")}>FAQ</MenuItem>
      <Divider />
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
  );
};

export default UnauthMobileNav;
