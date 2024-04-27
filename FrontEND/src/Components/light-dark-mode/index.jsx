import useLocalStorage from "./useLocalStorage";
import { MdDarkMode } from "react-icons/md";
import { IoToggleSharp } from "react-icons/io5";
import { MdOutlineToggleOff } from "react-icons/md";
import { useEffect } from "react";
export default function LightDarkMode() {
  const [theme, setTheme] = useLocalStorage("them", "dark");
  function handleToggleTheme() {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  }
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]); // Re-run when theme changes
  return (
    <div className="light-dark-mode" data-theme={theme}>
      <div className="theme-container">
        <MdDarkMode
          onClick={handleToggleTheme}
          className="theme-mode"
        ></MdDarkMode>
        {theme && theme === "dark" ? (
          <IoToggleSharp
            onClick={handleToggleTheme}
            className="theme-mode-on"
          />
        ) : (
          <MdOutlineToggleOff
            onClick={handleToggleTheme}
            className="theme-mode-off"
          />
        )}
        <div className="themeText">
          <p>theme mode : {theme}</p>
        </div>
      </div>
    </div>
  );
}
