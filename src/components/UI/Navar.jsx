import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CashierModal from './CreateCashier';
import { useState } from 'react';
import SideBar from "./SideBar";


export default function Navar() {
     const [open, setOpen] = useState(false)
      const handleOpen = () => setOpen(true)
      const handleClose = () => setOpen(false)
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar  position="static" sx={{  backgroundColor: 'oklch(0.279 0.041 260.031)', mb: 3, borderRadius: 1, boxShadow: 'none', border: '1px solid rgba(255, 255, 255, 0.12)'}}>

        <Toolbar>
         
            <SideBar />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1,}} className=' text-center tracking-wider uppercase'>
              List of Created Cashier Accout's
            </Typography>
          <CashierModal onClick={handleOpen} onClose={handleClose} open ={open} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
