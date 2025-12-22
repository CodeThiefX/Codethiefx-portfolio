import { Sun, Moon } from 'lucide-react'
import useThemeStore from '#store/theme'

const ThemeToggle = () => {
    const { isDarkMode, toggleTheme } = useThemeStore();

    return (
        <button 
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            <div className={`toggle-track ${isDarkMode ? 'dark' : ''}`}>
                <Sun className="toggle-icon sun" size={12} />
                <Moon className="toggle-icon moon" size={12} />
                <div className="toggle-thumb" />
            </div>
        </button>
    );
};

export default ThemeToggle;
