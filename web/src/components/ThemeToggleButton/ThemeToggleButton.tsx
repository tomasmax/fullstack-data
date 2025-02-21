import { useState, useEffect } from "react";

const ThemeToggleButton = () => {
  const getDefaultTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme;
    }
    const prefersDarkScheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return prefersDarkScheme ? "dark" : "light";
  };

  const [theme, setTheme] = useState(getDefaultTheme);

  useEffect(() => {
    const htmlElement = document.querySelector("html");
    if (htmlElement) {
      htmlElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <button className="themeToggleButton" onClick={toggleTheme}>
      Switch to {theme === "dark" ? "light" : "dark"} theme
    </button>
  );
};

export default ThemeToggleButton;
