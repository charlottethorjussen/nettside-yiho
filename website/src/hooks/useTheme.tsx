import { useContext, useState } from "react"
import { ThemeContext } from "../contexts/ThemeContext"

export const useTheme = () => {
    const themeMode = useContext(ThemeContext)
    const [mode, setMode] = useState(themeMode)

    // the theme should be stored on the user's device or in the browser, possibly using cookies.
    
    const handleThemeMode = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
    }

    return {
        mode, 
        toggleTheme: handleThemeMode
    }
}