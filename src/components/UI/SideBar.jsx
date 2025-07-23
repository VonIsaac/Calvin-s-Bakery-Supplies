import * as React from 'react';
import {
  Box,
  Drawer,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import Person2Icon from '@mui/icons-material/Person2';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useMutation } from '@tanstack/react-query';
import { postLogout, queryClient } from '../../utils/http';

export default function SideBar() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const links = {
    analytics: <Link to="/admin-dashboard" style={{ color: 'oklch(26.8% 0.007 34.298)' }}>Analytics</Link>,
    product: <Link to="/admin-products" style={{ color: 'oklch(26.8% 0.007 34.298)' }}>Products</Link>,
    cashier: <Link to="/create-cashier" style={{ color: 'oklch(26.8% 0.007 34.298)' }}>Cashier</Link>
  };

  const menuItems = [
    { text: links.analytics, icon: <AnalyticsIcon sx={{ color: 'oklch(75% 0.183 55.934)' }} /> },
    { text: links.product, icon: <ProductionQuantityLimitsIcon sx={{ color: 'oklch(75% 0.183 55.934)' }} /> },
    { text: links.cashier, icon: <Person2Icon sx={{ color: 'oklch(75% 0.183 55.934)' }} /> },
  ];

  // Logout logic
  const { mutate } = useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      queryClient.invalidateQueries('logout');
      Cookies.remove('token');
      localStorage.clear();
      navigate('/');
    }
  });

  const handleLogout = () => {
    mutate();
    setOpen(false);
  };

  const DrawerList = (
    <Box
      sx={{
        width: 250,
        height: '100%',
        backgroundColor: 'oklch(92.3% 0.003 48.717)',
        color: 'rgb(226 232 240)',
        borderTopRightRadius: '12px',
        borderBottomRightRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <Box>
        <List sx={{ py: 1 }}>
          {menuItems.map(({ icon, text }) => (
            <ListItem
              key={text}
              disablePadding
              sx={{
                '&:first-of-type': {
                  borderTopLeftRadius: '8px',
                  borderTopRightRadius: '8px',
                },
                '&:last-child': {
                  borderBottomLeftRadius: '8px',
                  borderBottomRightRadius: '8px',
                },
              }}
            >
              <ListItemButton
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(251, 191, 36, 0.1)',
                    borderRadius: '8px',
                  },
                }}
              >
                <ListItemIcon
                  sx={{ color: 'oklch(75% 0.183 55.934)', minWidth: '40px' }}
                >
                  {icon}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  primaryTypographyProps={{
                    sx: {
                      fontWeight: 500,
                      '&:hover': { color: 'rgb(251, 191, 36)' },
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ borderColor: 'oklch(75% 0.183 55.934)', mx: 2 }} />
      </Box>

      <Box sx={{ p: 2 }}>
            <ListItemButton
        onClick={handleLogout}
        sx={{
          borderRadius: '8px',
          '&:hover': {
            backgroundColor: 'rgba(251, 191, 36, 0.1)',
          },
        }}
      >
        <ListItemIcon sx={{ color: 'oklch(75% 0.183 55.934)', minWidth: '40px' }}>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText
          primary="Logout"
          primaryTypographyProps={{
            sx: {
              fontWeight: 500,
              color: 'oklch(75% 0.183 55.934)',
              '&:hover': {
                color: 'rgb(251 191 36)', // hover text brighter
              },
            },
          }}
        />
      </ListItemButton>

       
      </Box>
    </Box>
  );

  return (
    <div>
      <Button
        onClick={toggleDrawer(true)}
        sx={{
          minWidth: 'auto',
          padding: '8px',
          '&:hover': {
            backgroundColor: 'rgba(251, 191, 36, 0.1)',
            borderRadius: '8px',
          },
        }}
      >
        <MenuRoundedIcon sx={{ color: 'oklch(75% 0.183 55.934)', fontSize: '2rem' }} />
      </Button>

      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            backgroundColor: 'rgb(15 23 42)',
            color: 'rgb(226 232 240)',
            borderTopRightRadius: '12px',
            borderBottomRightRadius: '12px',
          },
        }}
      >
        {DrawerList}
      </Drawer>
    </div>
  );
}
