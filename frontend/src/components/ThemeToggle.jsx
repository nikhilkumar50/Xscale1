import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

import { HiSun, HiMoon } from "react-icons/hi";

const Toggle = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className="p-2">
      {theme === "dark" ? (
        <div
          className="flex items-center cursor-pointer text-white"
          onClick={() => setTheme(theme == "dark" ? "light" : "dark")}
        >
          <HiSun className="text-white text-2xl mr-2" />
          Light Mode
        </div>
      ) : (
        <div
          className="flex items-center cursor-pointer text-white"
          onClick={() => setTheme(theme == "dark" ? "light" : "dark")}
        >
          <HiMoon className="text-white text-2xl mr-2" />
          Dark Mode
        </div>
      )}
    </div>
  );
};

export default Toggle;
