import React from 'react'
import { useTheme } from './hooks/useTheme'
import ThemeProvider from './providers/themeProvider'
import { Box, Container, IconButton, Paper } from '@mui/material'
import UserTable from './components/UserTable'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'

function App() {
  const { mode, toggleTheme } = useTheme()

  return (
    <>
      {/* // theme provider must be placed here to ensure it renders after the state changes - unless we use some global state */}
      <ThemeProvider themeMode={mode}>
        <Box display='flex'  justifyContent='flex-end' mr={2} mt={1}>
          <IconButton
            onClick={toggleTheme}
          >
            {mode === 'dark' ? <DarkModeIcon/> : <LightModeIcon/>}
          </IconButton>
        </Box>
        <Container maxWidth="lg" component={Paper}>
          <Box paddingTop={1} paddingBottom={4}>
            <UserTable/>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  )
}

export default App
