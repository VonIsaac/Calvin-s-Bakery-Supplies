import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import SideBar from '../../UI/SideBar';
import ProductTable from '../../UI/ProductTable';
import ProductModal from '../../UI/ProductModal';

export default function AdminProducts() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: 'rgb(15, 23, 42)'}}>

      <SideBar />

      <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: 'rgb(15, 23, 42)',overflow: 'auto'}}>
        <AppBar  position="static" sx={{ 
            backgroundColor: 'oklch(0.279 0.041 260.031)',
            mb: 3,
            borderRadius: 1,
            boxShadow: 'none',
            border: '1px solid rgba(255, 255, 255, 0.12)'
          }}>

          <Toolbar>

            <Typography 
              variant="h6" 
              component="div" 
              sx={{ flexGrow: 1, fontWeight: 600, letterSpacing: '0.05em', color: 'white'}}>
              PRODUCT MANAGEMENT
            </Typography>

            <ProductModal /> 

          </Toolbar>
        </AppBar>


        <ProductTable />
      </Box>
    </Box>
  );
}