import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import Person2Icon from '@mui/icons-material/Person2';
import { Divider } from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { Link } from 'react-router-dom';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
export default function SideBar() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const links = {
    product: <Link to='/admin-products' className="hover:text-amber-400">Products</Link>,
    analytics: <Link to='/admin-dashboard' className="hover:text-amber-400">Analytics</Link>,
    cashier: <Link to='/create-cashier' className="hover:text-amber-400">Cashier</Link>
  };

  const menuItems = [
    { text: links.product, icon: <ProductionQuantityLimitsIcon /> },
    { text: links.analytics, icon: <AnalyticsIcon /> },
    { text: links.cashier, icon: <Person2Icon /> },
  ];

  const DrawerList = (
    <Box 
      sx={{ 
        width: 250,
        height: '100%',
        backgroundColor: 'rgb(15 23 42)',
        color: 'rgb(226 232 240)',
        borderTopRightRadius: '12px',
        borderBottomRightRadius: '12px',
      }} 
      role="presentation" 
      onClick={toggleDrawer(false)}
    >
      <List sx={{ py: 1 }}>
        {menuItems.map(({ text, icon }) => (
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
              }
            }}
          >
            <ListItemButton
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(251, 191, 36, 0.1)',
                  borderRadius: '8px',
                }
              }}
            >
              <ListItemIcon sx={{ 
                color: 'rgb(251, 191, 36)',
                minWidth: '40px' 
              }}>
                {icon}
              </ListItemIcon>
              <ListItemText 
                primary={text} 
                primaryTypographyProps={{
                  sx: {
                    fontWeight: 500,
                    '&:hover': {
                      color: 'rgb(251, 191, 36)'
                    }
                  }
                }} 
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ 
        borderColor: 'rgba(255, 255, 255, 0.12)',
        mx: 2,
      }} />
      <Box sx={{ 
        p: 2, 
        color: 'rgb(148, 163, 184)',
        borderBottomRightRadius: '12px',
      }}>
        <div className=' flex '>
          <AdminPanelSettingsIcon  />
          <p className=' font-semibold'>Admin</p>
        </div>
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
          }
        }}
      >
        <MenuRoundedIcon 
          sx={{ 
            color: 'rgb(251, 191, 36)',
            fontSize: '2rem',
          }} 
        />
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
          }
        }}
      >
        {DrawerList}
      </Drawer>
    </div>
  );
}