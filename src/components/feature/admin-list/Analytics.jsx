import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SideBar from '../../UI/SideBar';
import analyticsImage from '../../../assets/welcomeProduct/anal.jpg';

export default function Analytics() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: ''}}>
      
      
      <Box component="main" sx={{ 
        flexGrow: 1, 
        
        backgroundColor: '',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 3}}>

        <AppBar position="static" sx={{ color: 'oklch(21% 0.006 285.885)',  backgroundColor: 'oklch(87.1% 0.15 154.449)', mb: 3, borderRadius: 1, boxShadow: 'none', border: '1px solid rgba(255, 255, 255, 0.12)'}}>

          <Toolbar>
            <SideBar />
            <Typography variant="h6" component="div" 
              sx={{ 
                  flexGrow: 1, 
                  fontWeight: 600, 
                  letterSpacing: '0.05em', 
                  color: 'oklch(21.6% 0.006 56.043)', 
                  textAlign: 'left',
                  padding: '2'
                }}>
                ANALYTICS DASHBOARD
            </Typography>
          </Toolbar>
        </AppBar>

        <Box sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: 2,
            p: 2,
            position: 'static',
            overflow: 'hidden'
          }}>
          <img  src={analyticsImage} alt='Analytics dashboard' style={{width: '100%', height: '100%', objectFit: 'contain', borderRadius: '8px', maxHeight: 'calc(100vh - 200px)' }}/>
        </Box>
      </Box>
      
    </Box>
  );
}