import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { addToCart, queryClient } from '../../utils/http';
import { useMutation } from '@tanstack/react-query';
import swal from 'sweetalert';
const styleBase = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  border: 'none',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'orange',
  color: 'oklch(14.7% 0.004 49.25)',
  gap: 2,
  alignItems: 'center'
};

export default function AvailModal({ open, onClose, bgcolor = '#fff', selectedProduct }) {

    //const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: ({ productId, quantity, priceType }) =>
      addToCart(productId, quantity, priceType),
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']);
      swal("Added to Cart", "Product has been added to your cart", "success");
      onClose();
        
    },
    onError: (error) => {
      console.error("Error adding to cart:", error);
      swal("Failed to add cart", "The price option of this product has not available right now  ");
    }
  });

  const handleSelectPriceType = (priceType) => {
    if (!selectedProduct) return;
    mutation.mutate({
      productId: selectedProduct._id,
      quantity: 1,
      priceType
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...styleBase, bgcolor }}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Choose Pricing Option
        </Typography>

        <Button   onClick={() => handleSelectPriceType('price')}  variant="outlined" fullWidth>Full Price</Button>
        <Button onClick={() => handleSelectPriceType('halfPrice')}  variant="outlined" fullWidth>Half Price</Button>
        <Button onClick={() => handleSelectPriceType('retailPrice')} variant="outlined" fullWidth>Retail Price</Button>
      </Box>
    </Modal>
  );
}
