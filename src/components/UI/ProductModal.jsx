

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { motion } from 'framer-motion';

import { postProducts, queryClient } from '../../utils/http';
import { useMutation } from '@tanstack/react-query';
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
  p: 4,
  borderRadius: '25px',
};


export default function ProductModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
    const [productsCreds, setProductCreds] = useState({
        name: '',
        images: '',
        description: '',
        price: '',
        category: ''
    });


    // performe mutation to upload data
    const {mutate, isPending} = useMutation({ // functionality to upload data
        mutationFn:   postProducts,
        onSuccess: () => {
            setOpen(false)
            swal("Good job!", "You created a product", "success");
            queryClient.invalidateQueries({queryKey: ['products']})
            setProductCreds({
                name: '',
                images: '',
                description: '',
                price: '',
                category: ''
            });
        },
        onError: (error) => {
             
            console.error(error);
        }
    });

    // performe handle change to change the data 
    const handleChange = (e) => {
        setProductCreds({
              // spread the existing data and use object key    
            ...productsCreds,
            [e.target.name]: e.target.value  
        })
    }


    //function to create a product
    const handleCreateProduct = (e) => {
        e.preventDefault();
        const formDatas = {
            name:  productsCreds.name.trim(), 
            images: productsCreds.images.trim(),
            description: productsCreds.description.trim(),
            price: parseFloat(productsCreds.price) || 0,
            category: productsCreds.category.trim()
        };

         // Check for empty fields
    if (!formDatas.name || !formDatas.images || !formDatas.description || !formDatas.price || !formDatas.category) {
        console.error("All fields are required");
        return;
    }
        mutate(formDatas)
    }   


  return (
    <div>
        <Button onClick={handleOpen} sx={{
                color: 'oklch(14.5% 0 0)',
                fontWeight: '250px',
                backgroundColor: 'oklch(97% 0 0)'
              }}>
            Create Product
        </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleCreateProduct}>
            <h1 className=' text-center text-2xl font-bold tracking-wider uppercase text-'>
                Create Product
            </h1>
            <div className="m-3">
                <label htmlFor="name" className=' text- tracking-wider'>Name:</label>
                <input 
                    value={productsCreds.name}
                    onChange={handleChange}
                    type="text" 
                    name="name" 
                    id="name" 
                    required 
                    placeholder='Name'
                    className="w-[200px] sm:w-[200px] md:w-[200px] lg:w-[320px] px-4 py-2 border border-gray-300 bg-neutral-300  rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
                    
            </div>

            <div  className="m-3">
                <label htmlFor="images" className=' text- tracking-wider'>Images:</label>
                <input 
                    value={productsCreds.images}
                    onChange={handleChange}
                    type="text" 
                    name="images" 
                    id="images" 
                    required 
                    placeholder='Images'
                    className="w-[200px] sm:w-[200px] md:w-[200px] lg:w-[320px] px-4 py-2 border border-gray-300 bg-neutral-300  rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
            </div >

            <div  className="m-3">
                <label htmlFor="description" className=' text- tracking-wider'>Description:</label>
                <input 
                    value={productsCreds.description}
                    onChange={handleChange}
                    type="text" 
                    name="description" 
                    id="description" 
                    required 
                    placeholder='Description'
                    className="w-[200px] sm:w-[200px] md:w-[200px] lg:w-[320px] px-4 py-2 border border-gray-300 bg-neutral-300  rounded-lg  shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
            </div>

           <div  className="m-3">
                <label htmlFor="price" className=' text- tracking-wider'>Price:</label>
                <input 
                    value={productsCreds.price}
                    onChange={handleChange}
                    type="number" 
                    name="price" 
                    id="price" 
                    required 
                    placeholder='Price'
                    className="w-[200px] sm:w-[200px] md:w-[200px] lg:w-[320px] px-4 py-2 border border-gray-300 bg-neutral-300  rounded-lg  shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                    />
           </div>

           <div  className="m-3">
           <label htmlFor="category" className=' text- tracking-wider'>Category:</label>
            <select 
                    name="category" 
                    required 
                    className="w-[200px] sm:w-[200px] md:w-[200px] lg:w-[320px] px-4 py-2 border border-gray-300 bg-neutral-300  rounded-lg  shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                    value={productsCreds.category}
                    onChange={handleChange}
                    >
                    <option value="sugar">SUGAR</option>
                    <option value="starch">STARCH</option>
                    <option value="special-flour">SPECIAL FLOUR</option>
                    <option value="flour">FLOUR</option>
                    <option value="oil">OIL</option>
                    <option value="margarine">MARGARINE</option>
                    <option value="lard">LARD</option>
                    <option value="assorted-items"> ASORTED ITEMS</option>
                </select>
           </div>
            
            <div className="m-3">
                <motion.button
                    type='submit'
                    className="w-[200px] sm:w-[200px] md:w-[200px] lg:w-[320px] bg-green-500 text-white py-2 rounded-lg text-xl font-semibold shadow-xl active:scale-95 transition-transform duration-200 cursor-pointer"
                    whileTap={{ scale: 0.9 }}>
                    {isPending ? 'Creating....': 'Create Products'}                    
                </motion.button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}