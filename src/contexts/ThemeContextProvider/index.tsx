import Cookies from "js-cookie";
import React, { createContext, ReactNode, useEffect, useState } from "react";

type Theme = "dark" | "light"


interface ThemeContextProps {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const preferedTheme = Cookies.get("theme") as Theme | undefined;
    const [theme, setTheme] = useState(preferedTheme || "dark");

    useEffect(() => {
        Cookies.set("theme", theme, { expires: 365, path: "/" });

        document.documentElement.setAttribute("data-theme", theme);
        console.log(theme)
    }, [theme]);

    const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
    
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useThemeContext = () => {
    const context = React.useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an ThemeProvider');
    }
    return context;
}