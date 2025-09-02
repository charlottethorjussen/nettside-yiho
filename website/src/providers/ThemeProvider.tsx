import React from "react"
import { ThemeContext } from "../contexts/ThemeContext"
import { ThemeProvider as MuiThemeProvider} from '@mui/material/styles'
import theme from "../theme"

function ThemeProvider({themeMode, children}) {
    return (

      <MuiThemeProvider theme={theme(themeMode)}>
        <ThemeContext.Provider value={themeMode}>
          {children}
        </ThemeContext.Provider>
      </MuiThemeProvider>
    
    )
  }

  export default ThemeProvider