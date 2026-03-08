import { React, useContext } from 'react'
import { Box } from '@mui/material'
import Header from './components/header'
import Map from './components/map'


function App() {

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bottompadding: '5rem', gap: '2rem', alignItems: 'center' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Header />
      </Box>
      <Box sx={{ width: '90%', height: '70vh', justifyContent: 'center' }}>
        <Map />
      </Box>
    </Box>
  )
}

export default App
