import { useEffect, useState } from "react";

export const useDarkMode = () => {
    const [darkMode, setDarkMode] = useState(() => {
        const savedState = localStorage.getItem('darkMode');
        return savedState ? JSON.parse(savedState) : false;
    });

    // Update local state and save to localStorage
    const toggleDarkMode = () => {
        setDarkMode(prevState => {
            const newState = !prevState;
            localStorage.setItem('darkMode', JSON.stringify(newState));
            // Dispatch custom event to notify other components
            window.dispatchEvent(new Event('darkModeChanged'));
            return newState;
        });
    };

    // Listen for changes to darkMode in other tabs/windows or by other components
    useEffect(() => {
        const syncDarkMode = () => {
            const savedState = localStorage.getItem('darkMode');
            if (savedState !== null) {
                setDarkMode(JSON.parse(savedState));
            }
        };

        window.addEventListener('storage', syncDarkMode); // Listen for storage changes
        window.addEventListener('darkModeChanged', syncDarkMode); // Listen for custom event

        return () => {
            window.removeEventListener('storage', syncDarkMode);
            window.removeEventListener('darkModeChanged', syncDarkMode);
        };
    }, []);

    return [darkMode, toggleDarkMode, setDarkMode];
};
