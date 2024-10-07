import { useEffect, useState, useCallback } from "react";
import debounce from "lodash.debounce";

export const useDarkMode = () => {
    const [ darkMode, setDarkMode ] = useState(() => {
        const savedState = localStorage.getItem('darkMode');
        return savedState ? JSON.parse(savedState) : false;
    });

    const toggleDarkMode = useCallback(
        debounce(() => {
            setDarkMode(prevState => {
                const newState = !prevState;
                localStorage.setItem('darkMode', JSON.stringify(newState));
                window.dispatchEvent(new Event('darkModeChanged'));
                return newState;
            });
        }, 200), // Debounce for 200ms to avoid rapid changes
        []
    );

    useEffect(() => {
        const syncDarkMode = () => {
            const savedState = localStorage.getItem('darkMode');
            if (savedState !== null) 
            {
                setDarkMode(JSON.parse(savedState));
            }
        };

        window.addEventListener('storage', syncDarkMode);
        window.addEventListener('darkModeChanged', syncDarkMode);

        return () => {
            window.removeEventListener('storage', syncDarkMode);
            window.removeEventListener('darkModeChanged', syncDarkMode);
        };
    }, []);

    return [darkMode, toggleDarkMode, setDarkMode];
};