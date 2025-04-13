import { createContext, useContext, useEffect, useState } from "react";

type DarkModeContextType = { isDarkMode: boolean; toggleDarkMode: () => void };

const DarkModeContext = createContext<DarkModeContextType | null>(null);

type DarkModeProviderProps = { children: React.ReactNode };
export const DarkModeProvider = (props: DarkModeProviderProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    let theme = localStorage.getItem("theme") ?? "light";

    document.getElementsByTagName("html")[0].dataset.bsTheme = theme;
    if (theme == "light") setIsDarkMode(false);
    else setIsDarkMode(true);
  }, []);

  const toggleDarkMode = () => {
    const newIsDarkMode = !isDarkMode;
    const theme = newIsDarkMode ? "dark" : "light";

    setIsDarkMode(newIsDarkMode);
    document.getElementsByTagName("html")[0].dataset.bsTheme = theme;
    localStorage.setItem("theme", theme);
  };

  const value: DarkModeContextType = { isDarkMode, toggleDarkMode };

  return <DarkModeContext.Provider children={props.children} value={value} />;
};

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);

  if (!context)
    throw new Error(
      "useDarkMode hook was used outside of <DarkModeProvider />!"
    );

  return context;
};
