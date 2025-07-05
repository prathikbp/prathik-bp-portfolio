import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function scrollToTop() { // could see error with this name, when consider renaming to ScrollToTop
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// This component will automatically scroll to the top of the page whenever the route changes.
