import { useState } from "react";

interface ScrollToSectionProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ScrollToSection {
  scrollToSection: (sectionId: string) => void;
}

const useScrollToSection: (props: ScrollToSectionProps) => ScrollToSection = ({
  setOpen,
}) => {
  const scrollToSection = (sectionId: string) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: "smooth" });
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
      setOpen(false);
    }
  };

  return {
    scrollToSection,
  };
};

export default useScrollToSection;
