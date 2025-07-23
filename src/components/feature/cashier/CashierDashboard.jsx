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
import { getCustomerOrdersDetails } from '../../../utils/http';
import { useQuery } from '@tanstack/react-query';
import { useGetUser } from '../../hooks/hooks';
import SidebarLayout from './SidebarLayout';

export default function CashierDashboard() {
  useGetUser();

  const { data, isLoading, error } = useQuery({
    queryKey: ['get-orders'],
    queryFn: getCustomerOrdersDetails,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load orders</div>;

  return (
    <SidebarLayout>
      <AppBar
        position="static"
        sx={{
          backgroundColor: 'oklch(87.1% 0.15 154.449)',
          mb: 3,
          borderRadius: 1,
          boxShadow: 'none',
          border: '1px solid rgba(255, 255, 255, 0.12)',
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 600,
              letterSpacing: '0.05em',
              color: 'oklch(21% 0.006 285.885)',
              textAlign: 'center',
            }}
          >
            CASHIER DASHBOARD
          </Typography>
        </Toolbar>
      </AppBar>

      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: 'oklch(97% 0 0)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: 1,
          boxShadow: 'none',
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="customer table">
          <TableHead>
            <TableRow
              sx={{
                '& .MuiTableCell-head': {
                  backgroundColor: 'oklch(92.8% 0.006 264.531)',
                  color: 'oklch(21.6% 0.006 56.043)',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  borderColor: 'rgba(255, 255, 255, 0.12)',
                },
              }}
            >
              <TableCell>CUSTOMER NAME</TableCell>
              <TableCell>ADDRESS</TableCell>
              <TableCell>CUSTOMER NUMBER</TableCell>
              <TableCell>PICK UP DATE</TableCell>
              <TableCell>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((order) => (
              <TableRow
                key={order._id}
                sx={{
                  '& .MuiTableCell-root': {
                    borderColor: 'oklch(92.3% 0.003 48.717)',
                    color: 'oklch(21.6% 0.006 56.043)',
                  },
                }}
              >
                <TableCell>{order.customerInfo?.name}</TableCell>
                <TableCell>{order.customerInfo?.address}</TableCell>
                <TableCell>{order.customerInfo?.phoneNumber}</TableCell>
                <TableCell>
                  {new Date(order.customerInfo?.pickupDate).toLocaleDateString()}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}
                >
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
    </SidebarLayout>
  );
}