import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { motion } from 'framer-motion';
import { useMutation } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import swal from 'sweetalert';
import { editProduct, queryClient } from '../../utils/http';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: '600px',
    maxHeight: '90vh',
    overflowY: 'auto',
    bgcolor: 'oklch(98.5% 0 0)',
    border: 'none',
    boxShadow: 24,
    p: 4,
    borderRadius: '25px',
};


export default function EditProductModal({open, onClose, product}){
    const [formData, setFormData ] = useState({
        name: '',
        images: '',
        description: '',
        expirationDate: '',
        price: '',
        halfPrice: '',
        retailPrice: '',
        category: '',
        stock: '',
    });
    // useEffect to set initial form data when product changes
    useEffect(() => {
        if(product){
            setFormData({
                name: product.name || '',
                images: product.images || '',
                description: product.description || '',
                expirationDate: product.expirationDate ? new Date(product.expirationDate).toISOString().split('T')[0] : '',
                price: product.price || '',
                halfPrice: product.halfPrice || '',
                retailPrice: product.retailPrice || '',
                category: product.category || '',
                stock: product.stock || '',
            })
        }
    }, [product])

    const handleChange = (e) => {
        setFormData((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        }));
    };
    
    const {mutate, isPending} = useMutation({
        mutationFn: ({id, payload}) => editProduct(id, payload),
        onSuccess: () => {
            swal('Updated!', 'Product updated successfully', 'success');
            queryClient.invalidateQueries(['products']);
            onClose();
          },
          onError: (err) => {
            console.error(err);
            swal('Oops!', err.message ?? 'Something went wrong', 'error');
          },
    })


    const handleUpdate = (e) => {
       e.preventDefault();
       if (!product?._id) return;

       // payload const for the product update
        const payload = {
            ...formData,
            expirationDate: new Date(formData.expirationDate).toISOString(),
            price: parseFloat(formData.price),
            stock: parseInt(formData.stock, 10) 
        }

        //for checking the halfPrice and retailPrice
        if(payload.halfPrice){
            payload.halfPrice = parseFloat(formData.halfPrice);
        }else if(payload.retailPrice){
            payload.retailPrice = parseFloat(formData.retailPrice);
        }

        mutate({ id: product._id, payload });
    };



    return(
        <Modal open={open} onClose={onClose}>
        <Box sx={style}>
          <form onSubmit={handleUpdate}>
            <h1 className="text-center text-2xl font-bold tracking-wider uppercase mb-4">
              Edit Product
            </h1>
  
            {/* Name */}
            <div className="m-3">
              <label htmlFor="name" className="tracking-wider block mb-1">Name *</label>
              <input
                value={formData.name}
                onChange={handleChange}
                type="text"
                name="name"
                id="name"
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
  
            {/* Images */}
            <div className="m-3">
              <label htmlFor="images" className="tracking-wider block mb-1">Images (URL) *</label>
              <input
                value={formData.images}
                onChange={handleChange}
                type="text"
                name="images"
                id="images"
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
  
            {/* Description */}
            <div className="m-3">
              <label htmlFor="description" className="tracking-wider block mb-1">Description *</label>
              <textarea
                value={formData.description}
                onChange={handleChange}
                name="description"
                id="description"
                className="w-full px-4 py-2 border rounded-lg"
                rows={3}
                required
              />
            </div>
  
            {/* Expiration Date */}
            <div className="m-3">
              <label htmlFor="expirationDate" className="tracking-wider block mb-1">Expiration Date *</label>
              <input
                value={formData.expirationDate}
                onChange={handleChange}
                type="date"
                name="expirationDate"
                id="expirationDate"
                min={new Date().toISOString().split("T")[0]}
                className="w-full px-4 py-2 border rounded-lg"
              
              />
            </div>
  
            {/* Price */}
            <div className="m-3">
              <label htmlFor="price" className="tracking-wider block mb-1">Price *</label>
              <input
                value={formData.price}
                onChange={handleChange}
                type="number"
                name="price"
                id="price"
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
  
            {/* Half Price */}
            <div className="m-3">
              <label htmlFor="halfPrice" className="tracking-wider block mb-1">Half Price</label>
              <input
                value={formData.halfPrice}
                onChange={handleChange}
                type="number"
                name="halfPrice"
                id="halfPrice"
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
  
            {/* Retail Price */}
            <div className="m-3">
              <label htmlFor="retailPrice" className="tracking-wider block mb-1">Retail Price</label>
              <input
                value={formData.retailPrice}
                onChange={handleChange}
                type="number"
                name="retailPrice"
                id="retailPrice"
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
  
            {/* Stock */}
            <div className="m-3">
              <label htmlFor="stock" className="tracking-wider block mb-1">Stock *</label>
              <input
                value={formData.stock}
                onChange={handleChange}
                type="number"
                name="stock"
                id="stock"
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
  
            {/* Category */}
            <div className="m-3">
              <label htmlFor="category" className="tracking-wider block mb-1">Category *</label>
              <select
                name="category"
                id="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
                required
              >
                <option value="" disabled>Select category</option>
                <option value="sugar">SUGAR</option>
                <option value="starch">STARCH</option>
                <option value="special-flour">SPECIAL FLOUR</option>
                <option value="flour">FLOUR</option>
                <option value="oil">OIL</option>
                <option value="margarine">MARGARINE</option>
                <option value="lard">LARD</option>
                <option value="assorted-items">ASSORTED ITEMS</option>
              </select>
            </div>
  
            <div className="m-3">
              <motion.button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg text-xl font-semibold shadow-xl active:scale-95"
                whileTap={{ scale: 0.9 }}
                disabled={isPending}
              >
                {isPending ? 'Updating…' : 'Update Product'}
              </motion.button>
            </div>
          </form>
        </Box>
      </Modal>
    )
}