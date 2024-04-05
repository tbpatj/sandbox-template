import { Box, MenuItem, Typography } from "@mui/material";
import useScrollToSection from "../../../Hooks/Navigation/useScrollToSection";

const UnauthNav: React.FC = ({}) => {
  const { scrollToSection } = useScrollToSection();
  return (
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
  );
};

export default UnauthNav;
