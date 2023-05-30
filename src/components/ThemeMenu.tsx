import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("");


  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
      localStorage.theme = "light";
    }
    if (theme === "light") {
      setTheme("dark");
      localStorage.theme = "dark";
    }
  };

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      setTheme("light");
    }
  }, [theme]);

  return (
    <>
      <button
        className="hidden lg:block outline-none focus:ring-0"
        onClick={toggleTheme}
      >
        {theme === "light" ? (
          <SunIcon className="h-7 w-7 text-orange-500" aria-hidden="true" />
        ) : (
          <MoonIcon className="h-7 w-7 text-purple-500" aria-hidden="true" />
        )}
      </button>
    </>
  );
}
