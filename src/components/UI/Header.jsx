import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
export default function Header({children}) {
  return (
     <div>
            <Box sx={{ flexGrow: 1 }}>
              <AppBar position="static" sx={{ backgroundColor: 'oklch(90.5% 0.093 164.15)' }}>
                <Toolbar>
                  <Typography variant="h6" component="div" 
                    sx={{ 
                      flexGrow: 1, 
                      display: 'flex', 
                      justifyContent: 'center',
                      alignItems: 'center'
                    }} 
                    className='uppercase tracking-widest'>
                    {children}
                  </Typography>
                </Toolbar>
              </AppBar>
            </Box>
          </div>
  )
}