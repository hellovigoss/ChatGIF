//SwitchTheme.tsx

import React, { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

const SwitchTheme = () => {
    //we store the theme in localStorage to preserve the state on next visit with an initial theme of dark.
    const [theme, setTheme] = useState("");

    useEffect(() => {
        if(localStorage.getItem("theme")) {
            setTheme(localStorage.getItem("theme"));
        }
    }, []);

    //toggles the theme
    const toggleTheme = () => {
        setTheme(theme === "dark" ? "cupcake" : "dark");
    };

    // modify data-theme attribute on document.body when theme changes
    useEffect(() => {
        const body = document.body;
        body.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);


    return (
        <div className="btn btn-circle fixed left-4 top-4" onClick={toggleTheme}>
            {theme === "dark" ? (
                <FiSun className="w-5 h-5" />
            ) : (
                <FiMoon className="w-5 h-5" />
            )}
        </div>
    );
};

export default SwitchTheme;

