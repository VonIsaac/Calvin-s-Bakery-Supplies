
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { color, motion } from 'framer-motion';

import { useMutation } from '@tanstack/react-query';
import { createCashier, queryClient } from '../../utils/http';
import { useState } from 'react';
import swal from 'sweetalert';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'oklch(98.5% 0 0)',
  border: 'none',
  boxShadow: 24, 
  borderRadius: '25px',
  p: 4,
};

export default function CashierModal({onClick, onClose, open}) {
     const [cashierCreds, setCashierCreds] = useState({
        username: '',
        email: '',
        password: ''
     })

     const formDatas = {
        username: cashierCreds.username || "",
        email: cashierCreds.email || "",  // Ensure it’s never undefined
        password: cashierCreds.password || "",
        
    };

    const {mutate, isPending} = useMutation({
        mutationFn: createCashier,
        onSuccess: () => {
            onClose()
            swal({
                title: "Cashier Account Created!",
                text: "You can succesfully created accountYou can succesfully created account",
                icon: "success",
                button: "Proceed",
              });
              setCashierCreds({username: "", email: "", password: "",  })
            queryClient.invalidateQueries({queryKey: ['cashier']})

        },
        onError: (error) => {
            swal({
                title: "Cashier Account Failed!!!!",
                text: "There is a problem crating a cashier account",
                icon: "failed",
                button: "Proceed",
              });
             
            console.error(error);
        }
    })

    // handle changes in input
     const handleChange = (e) => {
         setCashierCreds({
              // spread the existing data and use object key 
            ...cashierCreds,
            [e.target.name]: e.target.value  
         });
     }

     //handle to creating cashier account 
     const handleCreateCashier = (e) => {
        e.preventDefault();
        //check if email is a valid gmail address and password are match
        const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if (!gmailRegex.test( cashierCreds.email)) {
            alert("Please enter a valid Gmail address.(@gmail.com)");
            return;
        }
        mutate(formDatas)

     }

  return (
    <div>
      <Button  onClick={onClick} sx={{
        color: 'oklch(14.5% 0 0)',
        fontWeight: '250px',
        backgroundColor: 'oklch(97% 0 0)'
      }}>
            Create Cashier
        </Button>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
           <form onSubmit={handleCreateCashier}>
                <h1 className=' text-center text-xl font-bold tracking-wider uppercase text-'>Create Cashier Account</h1>
                <div className="m-3">
                        <label htmlFor="username" className=' text- tracking-wider'>Username:</label>
                        <input
                            className="w-[200px] sm:w-[200px] md:w-[200px] lg:w-[320px] px-4 py-2 border border-gray-300 bg-stone-300  rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            label="Username"
                            name="username"
                            type="text"
                            placeholder="Username"
                            required     
                            value={cashierCreds.username}    
                            onChange={handleChange}                
                            />
                    </div>
                    <div className="m-3">
                        <label htmlFor="email" className=' text- tracking-wider'>Email:</label>
                        <input
                            className="w-[200px] sm:w-[200px] md:w-[200px] lg:w-[320px] px-4 py-2 border border-gray-300 bg-stone-300  rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            label="Email"
                            name="email"
                            type="email"
                            placeholder="Email" 
                            required       
                            value={cashierCreds.email}    
                            onChange={handleChange}         
                        />
                    </div>

                    <div className="m-3">
                        <label htmlFor="password" className=' text- tracking-wider'>Password:</label>
                        <input
                            className="w-[200px] sm:w-[200px] md:w-[200px] lg:w-[320px] px-4 py-2 border border-gray-300 bg-stone-300  rounded-lg  shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            label="Password"
                            type="password"
                            name="password"
                            placeholder="Password"
                            required        
                            value={cashierCreds.password}    
                            onChange={handleChange}    
                        />
                    </div>

                    <div className="m-3">
                        <motion.button
                            type='submit'
                            className="w-[200px] sm:w-[200px] md:w-[200px] lg:w-[320px] bg-green-500 text-white py-2 rounded-lg text-xl font-semibold shadow-xl active:scale-95 transition-transform duration-200 cursor-pointer"
                            whileTap={{ scale: 0.9 }}>
                            {isPending ? 'Creating....,': 'Create Cashier'}
                        </motion.button>
                    </div>
            </form>
        </Box>
      </Modal>
    </div>
  );
}
