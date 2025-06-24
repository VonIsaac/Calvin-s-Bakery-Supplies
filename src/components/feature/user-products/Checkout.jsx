import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { motion } from 'framer-motion';

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
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true)
  };

  const handleClose = () => {
    setOpen(false)
  }

  const today = new Date().toISOString().split("T")[0]; // get the current only date did not click the past mont and date

  return (
    <>
      <div>
      <Button 
          variant="contained" 
          fullWidth  
          size="large" 
          onClick={handleOpen}
          sx={{
          backgroundColor: '#f97316', // Tailwind's bg-orange-500
          '&:hover': { backgroundColor: '#ea580c' }, // Tailwind's bg-orange-600 for hover
          py: 1.5, 
          fontWeight: 600
        }}>
        CHECKOUT ALL
      </Button>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form>
              <h1 className='text-center text-2xl font-bold tracking-wider uppercase text-stone-400'>
                FILL OUT 
              </h1>
              <p className='text-center text-sm font-bold tracking-wider mt-1.5 text-stone-500'>
                Fill out the form first before check out all the products
              </p>
              <div className="m-3">
                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name:</label>
                <input type="text" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='(eg:John)' required />
              </div>

              <div className="m-3">
                <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number:</label>
                <input type="number" id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="+6392.." pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required />
              </div>

              <div className="m-3">
                <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address:</label>
                <input type="text" id="address" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='(eg:Purok Street...)' required />
              </div>

              <div className="m-3">   
                <label for="date" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date:</label>
                <input 
                  type="date" 
                  id="date"
                  min={today}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
            
              <div className="m-3">
                <motion.button
                  type='submit'
                  className="w-[200px] sm:w-[200px] md:w-[200px] lg:w-[320px] bg-green-500 text-white py-2 rounded-lg text-xl font-semibold shadow-xl active:scale-95 transition-transform duration-200 cursor-pointer"
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
  )
}