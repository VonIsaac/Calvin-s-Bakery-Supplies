import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCustomerInfo, getCustomerOrder, clearCustomerInfo } from '../../../utils/http';
import swal from 'sweetalert';
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
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import SidebarLayout from './SidebarLayout';
import { formatDateToText } from '../../../utils/helpers';

export default function CashierDashboard() {
  const queryClient = useQueryClient();

  // Fetch customer orders
  const { data: rows = [], isLoading, error } = useQuery({
    queryKey: ['customerOrders'],
    queryFn: getCustomerInfo,
  });

  // Track row statuses locally
  const [rowStatuses, setRowStatuses] = useState({});

  // Mutation for updating order status
  const updateOrderStatus = useMutation({
    mutationFn: ({ id, status }) => getCustomerOrder({ id, status }),
    onSuccess: (data, variables) => {
      setRowStatuses((prev) => ({
        ...prev,
        [variables.id]: variables.status,
      }));
      queryClient.invalidateQueries(['customerOrders']);

      swal({
        title: "Success!",
        text: data.message,
        icon: variables.status === 'approved' ? 'success' : 'error',
        button: "OK",
      });
    },
    onError: (err) => {
      swal("Error", err.message || "Failed to update order status", "error");
    }
  });

  // Mutation for clearing customer info
  const clearCustomerMutation = useMutation({
    mutationFn: (id) => clearCustomerInfo(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['customerOrders']); // refresh the table
      swal("Success", data.message, "success");
    },
    onError: (err) => {
      swal("Error", err.message || "Failed to clear customer info", "error");
    }
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleOpenDialog = (order) => {
    setSelectedOrder(order);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedOrder(null);
  };

  // Async/await confirm for approve/decline
  const handleAction = async (id, status) => {
    const willDo = await swal({
      title: "Are you sure?",
      text: `You are about to ${status} this order.`,
      icon: status === 'approved' ? 'success' : 'error',
      buttons: true,
      dangerMode: status === 'declined',
    });

    if (willDo) {
      updateOrderStatus.mutate({ id, status });
    }
  };

  // Async/await confirm for clear
  const handleClear = async (id) => {
    const willDelete = await swal({
      title: "Are you sure?",
      text: "This will permanently delete the customer info.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    });

    if (willDelete) {
      clearCustomerMutation.mutate(id);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load orders</div>;

  return (
    <SidebarLayout>
      {/* Page Header */}
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

      {/* Orders Table */}
      <TableContainer component={Paper} sx={{ backgroundColor: 'oklch(97% 0 0)' }}>
        <Table sx={{ minWidth: 650 }} aria-label="customer table">
          <TableHead>
            <TableRow
              sx={{
                '& .MuiTableCell-head': {
                  backgroundColor: 'oklch(92.8% 0.006 264.531)',
                  color: 'oklch(21.6% 0.006 56.043)',
                  fontWeight: 600,
                },
              }}
            >
              <TableCell>#</TableCell>
              <TableCell>CUSTOMER NAME</TableCell>
              <TableCell>CUSTOMER NUMBER</TableCell>
              <TableCell>PRODUCTS</TableCell>
              <TableCell>PICK UP DATE</TableCell>
              <TableCell>ACTIONS</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No orders to show
                </TableCell>
              </TableRow>
            ) : (
              rows.map((order, index) => {
                const rowStatus = rowStatuses[order._id] || order.status;

                return (
                  <TableRow
                    key={order._id}
                    sx={{
                      backgroundColor:
                        rowStatus === 'approved'
                          ? 'rgba(76, 175, 80, 0.2)' // light green
                          : rowStatus === 'declined'
                          ? 'rgba(244, 67, 54, 0.2)' // light red
                          : 'inherit',
                      '& .MuiTableCell-root': {
                        borderColor: 'oklch(92.3% 0.003 48.717)',
                        color: 'oklch(21.6% 0.006 56.043)',
                      },
                    }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{order.customerInfo?.name}</TableCell>
                    <TableCell>{order.customerInfo?.phoneNumber}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleOpenDialog(order)}
                      >
                        View Products
                      </Button>
                    </TableCell>
                    <TableCell>
                      {formatDateToText(order.customerInfo?.pickupDate)}
                    </TableCell>
                    <TableCell sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        startIcon={<CheckIcon />}
                        onClick={() => handleAction(order._id, 'approved')}
                        disabled={rowStatus === 'approved'}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        startIcon={<CloseIcon />}
                        onClick={() => handleAction(order._id, 'declined')}
                        disabled={rowStatus === 'declined'}
                      >
                        Decline
                      </Button>
                      <Tooltip title="Clear Customer Info">
                        <IconButton
                          color="error"
                          size="small"
                          onClick={() => handleClear(order._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal product details */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>Order Products</DialogTitle>
        <DialogContent dividers>
          {selectedOrder &&
            selectedOrder.orderId?.items?.map((item) => (
              <Box key={item.product._id} sx={{ mb: 2, borderBottom: '1px solid #ddd', pb: 2 }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  {item.product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.product.description}
                </Typography>
                <Typography variant="body2">Quantity: {item.quantity}</Typography>
                <Typography variant="body2" fontWeight={600}>
                  Price: ₱{item.product.price}
                </Typography>
                <Typography variant="body2" fontWeight={600} color="primary">
                  Subtotal: ₱{item.product.price * item.quantity}
                </Typography>
              </Box>
            ))}

          {selectedOrder && (
            <Typography
              variant="h6"
              sx={{ mt: 2, textAlign: 'right', fontWeight: 'bold' }}
            >
              Total: ₱{selectedOrder.orderId?.totalAmount}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </SidebarLayout>
  );
}
