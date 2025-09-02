import { createTheme } from '@mui/material/styles'

const darkPalette = {
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#121212',
      paper: '#FF4173',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0',
    },
}
const lightPalette = {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
    text: {
      primary: '#000000',
      secondary: '#555555', 
    },
}

const theme = (mode) => createTheme({
  cssVariables: true,
  palette: mode === 'dark' ? darkPalette : lightPalette
})

export default theme