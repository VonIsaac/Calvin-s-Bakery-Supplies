import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SideBar from '../../UI/SideBar';
import analyticsImage from '../../../assets/analytics.jpg';

export default function Analytics() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: 'rgb(15, 23, 42)' }}>
      <SideBar />
      
      <Box component="main" sx={{ 
        flexGrow: 1, 
        p: 3, 
        backgroundColor: 'rgb(15, 23, 42)',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 3}}>

        <AppBar position="static" sx={{ backgroundColor: 'oklch(0.279 0.041 260.031)', mb: 3, borderRadius: 1, boxShadow: 'none', border: '1px solid rgba(255, 255, 255, 0.12)'}}>

          <Toolbar>
            <Typography variant="h6" component="div" 
              sx={{ 
                  flexGrow: 1, 
                  fontWeight: 600, 
                  letterSpacing: '0.05em', 
                  color: 'white', 
                  textAlign: 'center'
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
            position: 'relative',
            overflow: 'hidden'
          }}>
          <img  src={analyticsImage} alt='Analytics dashboard' style={{width: '100%', height: '100%', objectFit: 'contain', borderRadius: '8px', maxHeight: 'calc(100vh - 200px)' }}/>
        </Box>
      </Box>
      
    </Box>
  );
}