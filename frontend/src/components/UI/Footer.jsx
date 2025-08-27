import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Link, 
  Divider,
  List,
  ListItem
} from '@mui/material';

export default function Footer({ children }) {
  return (
    <Box sx={{ backgroundColor: 'background.default' }}>
      <Box  component="footer" 
        sx={{ 
          backgroundColor: 'oklch(90.5% 0.093 164.15)' ,
          boxShadow: 1,
          color: 'text.primary'
        }}
      >
        <Container maxWidth="xl" sx={{ p: 4, py: { md: 8 } }}>
          <Box sx={{  display: 'flex',  flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center',  justifyContent: { sm: 'space-between' },mb: 4}}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 4, sm: 0 },mr: { sm: 3 }}}>
              {children}
              <Typography variant="h5" component="span" sx={{ fontWeight: 600, whiteSpace: 'nowrap',color: 'oklch(20.5% 0 0)'}}>
                Calvin's Bakery Supplies
              </Typography>
            </Box>

            <List sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', mb: { xs: 6, sm: 0 },p: 0}}>
              <ListItem sx={{ width: 'auto', p: 0, mr: 4 }}>
                <Link href="#" underline="hover" color="oklch(20.5% 0 0)">
                  Facebook
                </Link>
              </ListItem>
              <ListItem sx={{ width: 'auto', p: 0, mr: 4 }}>
                <Link href="#" underline="hover" color="oklch(20.5% 0 0)">
                  Instagram
                </Link>
              </ListItem>
              <ListItem sx={{ width: 'auto', p: 0, mr: 4 }}>
                <Link href="#" underline="hover" color="oklch(20.5% 0 0)">
                  Gmail
                </Link>
              </ListItem>
              <ListItem sx={{ width: 'auto', p: 0 }}>
                <Link href="#" underline="hover" color="oklch(20.5% 0 0)">
                  Contact
                </Link>
              </ListItem>
            </List>
          </Box>
          <Divider sx={{ my: 6, borderColor: 'divider',mx: 'auto',lg: { my: 8 }}} />

          <Typography variant="body2" color="oklch(20.5% 0 0)" align="center"component="div"sx={{ display: 'block' }}>
            © {new Date().getFullYear()}{' '}
            <Link href="#" underline="hover" color="oklch(20.5% 0 0)">
              Calvin's Bakery Supplies™
            </Link>
            . All Rights Reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}