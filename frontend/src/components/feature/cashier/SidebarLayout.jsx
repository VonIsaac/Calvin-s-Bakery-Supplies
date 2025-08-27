import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  CssBaseline,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useMutation } from '@tanstack/react-query';
import { postLogout, queryClient } from '../../../utils/http';

const drawerWidth = 240;

const SidebarLayout = ({ children }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };

  // Logout logic
  const { mutate } = useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      queryClient.invalidateQueries('logout');
      Cookies.remove('token');
      localStorage.clear();
      navigate('/');
    },
  });

  const handleLogout = () => {
    mutate();
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* App Bar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: 'oklch(87.1% 0.15 154.449)',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ fontWeight: 600, letterSpacing: '0.05em' }}
          >
            Cashier Panel
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={open}
        onClose={toggleDrawer}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: 'oklch(92.8% 0.006 264.531)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          },
        }}
      >
        <Box>
          <Toolbar />
          <List>
            <ListItem button component={Link} to="/cashier" onClick={toggleDrawer}>
              <ListItemIcon>
                <DashboardIcon sx={{ color: 'oklch(21.6% 0.006 56.043)' }} />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>

            <ListItem button component={Link} to="/cashier-products" onClick={toggleDrawer}>
              <ListItemIcon>
                <ShoppingCartIcon sx={{ color: 'oklch(21.6% 0.006 56.043)' }} />
              </ListItemIcon>
              <ListItemText primary="Products" />
            </ListItem>
          </List>
        </Box>

       
        <Box>
          <Divider />
          <List>
            <ListItem button onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon sx={{ color: 'oklch(21.6% 0.006 56.043)' }} />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: 'oklch(97% 0 0)',
          minHeight: '100vh',
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default SidebarLayout;
