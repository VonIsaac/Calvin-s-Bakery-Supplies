import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
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
const initialState = {
  name: '',
  images: '',
  description: '',
  expirationDate: '',
  price: '',
  halfPrice: '',
  retailPrice: '',
  category: '',
  stock: '',
};

export default function ProductModal() {
  const [open, setOpen] = useState(false);
  const [productCreds, setProductCreds] = useState(initialState);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setProductCreds(initialState);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: postProducts,
    onSuccess: () => {
      setOpen(false);
      swal('Good job!', 'You created a product', 'success');
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setProductCreds(initialState);
    },
    onError: (error) => {
      console.error(error);
      swal('Oops!', error.message ?? 'Something went wrong', 'error');
    },
  });

  const handleChange = (e) => {
    setProductCreds((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreateProduct = (e) => {
    e.preventDefault();

    const {
      name,
      images,
      description,
      expirationDate,
      price,
      halfPrice,
      retailPrice,
      category,
      stock,
    } = productCreds;

    // Basic required validation
    if (
      !name.trim() ||
      !images.trim() ||
      !description.trim() ||
      !expirationDate ||
      !price ||
      !category.trim() ||
      !stock
    ) {
      swal('Missing fields', 'Please fill in all required fields.', 'warning');
      return;
    }

    // Build payload, only include optional numbers if provided
    const payload = {
      name: name.trim(),
      images: images.trim(),
      description: description.trim(),
      expirationDate: new Date(expirationDate).toISOString(),
      price: parseFloat(price),
      category: category.trim(),
      stock: parseInt(stock, 10),
    };

    if (halfPrice) payload.halfPrice = parseFloat(halfPrice);
    if (retailPrice) payload.retailPrice = parseFloat(retailPrice);

    mutate(payload);
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        sx={{
          color: 'oklch(14.5% 0 0)',
          fontWeight: '250px',
          backgroundColor: 'oklch(97% 0 0)',
        }}
      >
        Create Product
      </Button>

      <Modal open={open} onClose={handleClose} aria-labelledby="create-product-title">
        <Box sx={style}>
          <form onSubmit={handleCreateProduct}>
            <h1 className="text-center text-2xl font-bold tracking-wider uppercase mb-4">
              Create Product
            </h1>

            {/* Name */}
            <div className="m-3">
              <label htmlFor="name" className="tracking-wider block mb-1">
                Name *
              </label>
              <input
                value={productCreds.name}
                onChange={handleChange}
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                className="w-full px-4 py-2 border border-gray-300 bg-neutral-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                required
              />
            </div>

            {/* Images */}
            <div className="m-3">
              <label htmlFor="images" className="tracking-wider block mb-1">
                Images (URL) *
              </label>
              <input
                value={productCreds.images}
                onChange={handleChange}
                type="text"
                name="images"
                id="images"
                placeholder="Image URL"
                className="w-full px-4 py-2 border border-gray-300 bg-neutral-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                required
              />
            </div>

            {/* Description */}
            <div className="m-3">
              <label htmlFor="description" className="tracking-wider block mb-1">
                Description *
              </label>
              <textarea
                value={productCreds.description}
                onChange={handleChange}
                name="description"
                id="description"
                placeholder="Description"
                className="w-full px-4 py-2 border border-gray-300 bg-neutral-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                rows={3}
                required
              />
            </div>

            {/* Expiration Date */}
            <div className="m-3">
              <label htmlFor="expirationDate" className="tracking-wider block mb-1">
                Expiration Date *
              </label>
              <input
                value={productCreds.expirationDate}
                onChange={handleChange}
                type="date"
                name="expirationDate"
                min={new Date().toISOString().split("T")[0]} 
                id="expirationDate"
                className="w-full px-4 py-2 border border-gray-300 bg-neutral-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                required
              />
            </div>

            {/* Price (Required) */}
            <div className="m-3">
              <label htmlFor="price" className="tracking-wider block mb-1">
                Price (Wholesale) *
              </label>
              <input
                value={productCreds.price}
                onChange={handleChange}
                type="number"
                name="price"
                id="price"
                placeholder="e.g. 3400"
                className="w-full px-4 py-2 border border-gray-300 bg-neutral-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                required
              />
            </div>

            {/* Half Price (Optional) */}
            <div className="m-3">
              <label htmlFor="halfPrice" className="tracking-wider block mb-1">
                Half Price (Optional)
              </label>
              <input
                value={productCreds.halfPrice}
                onChange={handleChange}
                type="number"
                name="halfPrice"
                id="halfPrice"
                placeholder="e.g. 1750"
                className="w-full px-4 py-2 border border-gray-300 bg-neutral-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>

            {/* Retail Price (Optional) */}
            <div className="m-3">
              <label htmlFor="retailPrice" className="tracking-wider block mb-1">
                Retail Price (Optional)
              </label>
              <input
                value={productCreds.retailPrice}
                onChange={handleChange}
                type="number"
                name="retailPrice"
                id="retailPrice"
                placeholder="e.g. 78"
                className="w-full px-4 py-2 border border-gray-300 bg-neutral-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>

            {/* Stock */}
            <div className="m-3">
              <label htmlFor="stock" className="tracking-wider block mb-1">
                Stock *
              </label>
              <input
                value={productCreds.stock}
                onChange={handleChange}
                type="number"
                name="stock"
                id="stock"
                placeholder="e.g. 14"
                className="w-full px-4 py-2 border border-gray-300 bg-neutral-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                required
              />
            </div>

            {/* Category */}
            <div className="m-3">
              <label htmlFor="category" className="tracking-wider block mb-1">
                Category *
              </label>
              <select
                name="category"
                id="category"
                className="w-full px-4 py-2 border border-gray-300 bg-neutral-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                value={productCreds.category}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select a category
                </option>
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
                className="w-full bg-green-500 text-white py-2 rounded-lg text-xl font-semibold shadow-xl active:scale-95 transition-transform duration-200 cursor-pointer"
                whileTap={{ scale: 0.9 }}
                disabled={isPending}
              >
                {isPending ? 'Creating…' : 'Create Product'}
              </motion.button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
