import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { motion } from 'framer-motion';
import { useGetUser } from '../../hooks/hooks';
import { checkout, queryClient } from '../../../utils/http';
import swal from 'sweetalert';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getCart } from '../../../utils/http';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'oklch(20.8% 0.042 265.755)',
  border: 'none',
  boxShadow: 24,
  p: 4,
  borderRadius: '25px',
};

export default function Checkout() {
  useGetUser();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phoneNumber: '',
    address: '',
    pickupDate: '',
    deliveryMode: ''
  });

  const today = new Date().toISOString().split("T")[0];

  const { data: cartItems = [] } = useQuery({
    queryKey: ['cart'],
    queryFn: getCart
  });

  const mutation = useMutation({
    mutationFn: ({ name, address, phoneNumber, pickupDate, deliveryMode }) =>
      checkout(name, address, phoneNumber, pickupDate, deliveryMode),
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']);
      swal("Success", "Checkout completed successfully!", "success");
      setOpen(false);
    },
    onError: (error) => {
      console.log(error);
      swal("Error", error.message || "Checkout failed", "error");
    }
  });

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  const isCartEmpty = cartItems.length === 0;

  return (
    <>
      <div>
        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={() => setOpen(true)}
          disabled={isCartEmpty}
          sx={{
            backgroundColor: isCartEmpty ? '#ccc' : '#f97316',
            '&:hover': { backgroundColor: isCartEmpty ? '#ccc' : '#ea580c' },
            py: 1.5,
            fontWeight: 600
          }}
        >
          {isCartEmpty ? 'NO CART TO CHECKOUT' : 'CHECKOUT ALL'}
        </Button>

        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form onSubmit={handleSubmit}>
              <h1 className='text-center text-2xl font-bold tracking-wider uppercase text-stone-400'>
                FILL OUT
              </h1>
              <p className='text-center text-sm font-bold tracking-wider mt-1.5 text-stone-500'>
                Fill out the form first before check out all the products
              </p>

              <div className="m-3">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name:</label>
                <input type="text" name="name" id="name" value={form.name} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="(eg: Juan Dela Cruz)" required />
              </div>

              <div className="m-3">
                <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number:</label>
                <input type="tel" name="phoneNumber" id="phoneNumber" value={form.phoneNumber} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="+63912..." required />
              </div>

              <div className="m-3">
                <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address:</label>
                <input type="text" name="address" id="address" value={form.address} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="(eg: 123 Main St, Bustos Palengke)" required />
              </div>

              <div className="m-3">
                <label htmlFor="pickupDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date:</label>
                <input type="date" name="pickupDate" id="pickupDate" value={form.pickupDate} onChange={handleChange} min={today} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" required />
              </div>

              <div className="m-3">
                <label htmlFor="deliveryMode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Delivery Mode:</label>
                <select name="deliveryMode" id="deliveryMode" value={form.deliveryMode} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" required>
                  <option value="">Select delivery mode</option>
                  <option value="pickup">Pickup</option>
                  <option value="delivery">Delivery</option>
                </select>
              </div>

              <div className="m-3">
                <motion.button
                  type="submit"
                  className="w-full cursor-pointer bg-green-500 text-white py-2 rounded-lg text-xl font-semibold shadow-xl active:scale-95 transition-transform duration-200"
                  whileTap={{ scale: 0.9 }}
                >
                  CHECK OUT
                </motion.button>
              </div>
            </form>
          </Box>
        </Modal>
      </div>
    </>
  );
}
