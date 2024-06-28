import { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [accentColor, setAccentColor] = useState('#FFFFFF'); // Default white color

  const changeAccentColor = (newColor) => {
    setAccentColor(newColor);
  };

  return (
    <ThemeContext.Provider value={{ accentColor, changeAccentColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
