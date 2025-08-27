

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import SideBar from '../../UI/SideBar';
import ProductTable from '../../UI/ProductTable';
import ProductModal from '../../UI/ProductModal';

const AdminNavar = () => {
    return(
        <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: '',
          overflow: 'auto',
        }}>
        <AppBar
          position="static"
          sx={{
            backgroundColor: 'oklch(87.1% 0.15 154.449)',
            mb: 3,
            borderRadius: 1,
            boxShadow: 'none',
            border: 'none ',
          }}
        >
          <Toolbar>
            <SideBar />
            
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                fontWeight: 600,
                letterSpacing: '0.05em',
                color: 'oklch(21.6% 0.006 56.043)',
                
              }}
            >
              PRODUCT MANAGEMENT
            </Typography>

            <ProductModal />
          </Toolbar>
        </AppBar>

        <ProductTable />
      </Box>
    )
}

export default AdminNavar