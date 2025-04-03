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
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: 'rgb(15, 23, 42)' }}>
      <Box component="main" sx={{ 
        flexGrow: 1, 
        p: 3, 
        backgroundColor: 'rgb(15, 23, 42)',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 3
      }}>
        <AppBar position="static" sx={{ 
          backgroundColor: 'oklch(0.279 0.041 260.031)', 
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
                color: 'white', 
                textAlign: 'center'
              }}>
              CASHIER DASHBOARD
            </Typography>
          </Toolbar>
        </AppBar>

        <TableContainer component={Paper} sx={{
          backgroundColor: 'rgb(30, 41, 59)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: 1,
          boxShadow: 'none'
        }}>
          <Table sx={{ minWidth: 650 }} aria-label="customer table">
            <TableHead>
              <TableRow sx={{
                '& .MuiTableCell-head': {
                  backgroundColor: 'rgb(30, 41, 59)',
                  color: 'rgb(148, 163, 184)',
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
                      borderColor: 'rgba(255, 255, 255, 0.12)',
                      color: 'rgb(226, 232, 240)'
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
                     
                      sx={{
                        textTransform: 'none',
                        backgroundColor: 'rgba(74, 222, 128, 0.2)',
                        '&:hover': {
                          backgroundColor: 'rgba(74, 222, 128, 0.3)'
                        }
                      }}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      startIcon={<CloseIcon />}
                      sx={{
                        textTransform: 'none',
                        backgroundColor: 'rgba(248, 113, 113, 0.2)',
                        '&:hover': {
                          backgroundColor: 'rgba(248, 113, 113, 0.3)'
                        }
                      }}
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