import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

// Sample data - replace with your actual data
const customers = [
  { id: 1, name: 'John Doe', number: '09123456789', date: 'April 7, 2025' },
  { id: 2, name: 'Jane Smith', number: '09987654321',  date: 'April 20, 2025' },
  { id: 3, name: 'Robert Johnson', number: '09876543210',   date: 'April 25, 2025'},
  { id: 4, name: 'Emily Davis', number: '09765432109',   date: 'April 29, 2025' },
];

export default function CashierDashboard() {


  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor : 'oklch(97% 0 0)'}}>
      <Box component="main" sx={{ 
        flexGrow: 1, 
        backgroundColor: 'oklch(97% 0 0)',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 3
      }}>
        <AppBar position="static" sx={{ 
          backgroundColor: 'oklch(87.1% 0.15 154.449)', 
          mb: 3, 
          borderRadius: 1, 
          boxShadow: 'none', 
          border: '1px solid rgba(255, 255, 255, 0.12)'
        }}>
          <Toolbar>
            <Typography variant="h6" component="div" 
              sx={{ 
                flexGrow: 1, 
                fontWeight: 600, 
                letterSpacing: '0.05em', 
                color: 'oklch(21% 0.006 285.885)', 
                textAlign: 'center'
              }}>
              CASHIER DASHBOARD
            </Typography>
          </Toolbar>
        </AppBar>

        <TableContainer component={Paper} sx={{
          backgroundColor: 'oklch(97% 0 0)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: 1,
          boxShadow: 'none'
        }}>
          <Table sx={{ minWidth: 650 }} aria-label="customer table">
            <TableHead>
              <TableRow sx={{
                '& .MuiTableCell-head': {
                  backgroundColor: 'oklch(92.8% 0.006 264.531)',
                  color: 'oklch(21.6% 0.006 56.043)',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  borderColor: 'rgba(255, 255, 255, 0.12)'
                }
              }}>
                <TableCell>CUSTOMER NAME</TableCell>
                <TableCell>CUSTOMER NUMBER</TableCell>
                <TableCell>Pick Up Date</TableCell>
                <TableCell >ACTIONS</TableCell>
               
              </TableRow>
            </TableHead>

            <TableBody>
              {customers.map((customer) => (
                <TableRow
                  key={customer.id}
                  sx={{ 
                    '&:last-child td, &:last-child th': { border: 0 },
                    '& .MuiTableCell-root': {
                      borderColor: 'oklch(92.3% 0.003 48.717)',
                      color: 'oklch(21.6% 0.006 56.043)'
                    }
                  }}
                >
                  <TableCell component="th" scope="row">
                    {customer.name}
                  </TableCell>
                  <TableCell>{customer.number}</TableCell>
                  <TableCell>{customer.date}</TableCell>
                  <TableCell align="right" sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      startIcon={<CheckIcon />}                    
                     
                    >
                      Approve
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      startIcon={<CloseIcon />}
                     
                    >
                      Decline
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}