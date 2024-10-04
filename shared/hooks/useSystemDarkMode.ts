import { useEffect, useState } from "react";

export default function useSystemDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  useEffect(() => {
    function handleChange(this: MediaQueryList) {
      if (this.matches) {
        //console.log("change to dark mode!");
        setIsDarkMode(true);
      } else {
        //console.log("change to light mode!");
        setIsDarkMode(false);
      }
    }

    const mediaQuery = "(prefers-color-scheme: dark)";
    window.matchMedia(mediaQuery).addEventListener("change", handleChange);

    return () => {
      window.matchMedia(mediaQuery).removeEventListener("change", handleChange);
    };
  }, []);

  return isDarkMode;
}
