import React from 'react';
import logo from '../../../assets/logo.png';
import Header from '../../UI/Header';
import Footer from '../../UI/Footer';
import { Box, Typography, Button, Divider, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import Checkout from './Checkout';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getCart, removeFromCart, queryClient } from '../../../utils/http';

export default function Cart() {
  const { data: cartItems = [], isLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: getCart
  });

  const removeMutation = useMutation({
    mutationFn: removeFromCart,
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']);
    },
    onError: (err) => {
      alert(err.message || 'Failed to remove item');
    }
  });

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (isLoading) return <div className="text-center py-20">Loading cart...</div>;

  return (
    <>
      <Header>
        <img src={logo} alt="logo" className='w-[180px]' />
      </Header>

      <Box sx={{
        minHeight: 'calc(100vh - 128px)',
        backgroundColor: 'oklch(87.1% 0.006 286.286)',
        color: 'white',
        p: 3
      }}>
        <Box sx={{ maxWidth: '800px', mx: 'auto', mb: 2 }}>
          <Button
            component={Link}
            to="/user-products"
            startIcon={<ArrowBackIcon />}
            sx={{
              color: 'oklch(14.7% 0.004 49.25)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            Back to Products
          </Button>
        </Box>

        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600, textAlign: 'center', color: 'oklch(14.7% 0.004 49.25)' }}>
          Your Shopping Cart
        </Typography>

        <Box sx={{
          maxWidth: '800px',
          mx: 'auto',
          border: '1px solid rgba(119, 25, 25, 0.12)',
          borderRadius: 2,
          overflow: 'hidden',
          backgroundColor: 'oklch(98.5% 0 0)',
          color: 'oklch(14.7% 0.004 49.25)'
        }}>
          {cartItems.map((item) => (
            <Box key={item.product._id}>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                p: 2,
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.03)' }
              }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 500 }}>{item.product.name}</Typography>
                  <Typography variant="body1" sx={{ color: 'oklch(14.7% 0.004 49.25)' }}>
                    ₱{item.price.toLocaleString()} ({item.priceType})
                  </Typography>
                  <Typography>Quantity: {item.quantity}</Typography>
                </Box>

                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2
                }}>
                  <Typography sx={{ fontWeight: 500, minWidth: 80, textAlign: 'right' }}>
                    ₱{(item.price * item.quantity).toLocaleString()}
                  </Typography>
                  <IconButton onClick={() => removeMutation.mutate(item.product._id)} sx={{ color: 'rgb(248, 113, 113)' }}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
              <Divider sx={{ borderColor: 'oklch(86.9% 0.005 56.366)' }} />
            </Box>
          ))}
        </Box>

        <Box sx={{
          maxWidth: '800px',
          mx: 'auto',
          mt: 3,
          p: 3,
          border: '1px solid oklch(98.5% 0 0)',
          borderRadius: 2,
          backgroundColor: 'oklch(98.5% 0 0)',
          color: 'oklch(14.7% 0.004 49.25)'
        }}>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 500 }}>Order Total</Typography>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>Total Amount</Typography>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>₱{total.toLocaleString()}</Typography>
          </Box>

          <Checkout />

          <Button
            component={Link}
            to="/user-products/order-history"
            variant="outlined"
            sx={{
              mt: 2,
              width: '100%',
              color: 'oklch(14.7% 0.004 49.25)',
              borderColor: 'oklch(14.7% 0.004 49.25)',
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.04)',
                borderColor: 'oklch(14.7% 0.004 49.25)',
              },
            }}
          >
            See Order History
          </Button>
        </Box>
      </Box>

      <Footer>
        <img src={logo} className="h-8" alt="Calvin's Bakery Logo" />
      </Footer>
    </>
  );
}
