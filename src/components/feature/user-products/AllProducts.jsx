import React from 'react'
import logo from '../../../assets/logo.png';
import Footer from '../../UI/Footer';
import Header from '../../UI/Header';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../../../utils/http';
import { Box, Button, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';

export default function AllProducts() {

    const {data} = useQuery({ // use useQuery to get the data from backend
        queryKey: ['products'],
        queryFn: ({signal}) => getProducts({signal})
    })

  return (
   <>
    <Header>
        <img src={logo} alt="logo" className='w-[180px]'/>
    </Header>

    {/* Main Content Area - Fixed to span full width */}
    <div className="min-h-screen bg-slate-950"> {/* Changed to min-h-screen for full height */}
      
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"> {/* Added proper max-width and padding */}
         
          {/* Title and Back Button Container */}
          <Box sx={{ maxWidth: '1200px', mx: 'auto',mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Typography variant="h4" sx={{ fontWeight: 600,  color: 'white',textTransform: 'uppercase'}}>
              All Products
            </Typography>
                    
            <Button component={Link} to="/user-products" startIcon={<ArrowBackIcon />} sx={{color: 'white', '&:hover': {backgroundColor: 'rgba(255, 255, 255, 0.1'}}}>
              Back to Products
            </Button>
          </Box>
          
          
          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.products.map((product) => (
              <div key={product._id} className="bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 overflow-hidden"> 
                <img className="w-full h-48 object-cover" src={product.images} alt={product.name} />
                
                <div className="p-5">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {product.name}
                    </h5>
                    <p className="mb-2 tracking-wider text-gray-900 dark:text-white">Products Left: 10</p>
                    <p className=" mb-3 font-normal text-gray-700 dark:text-gray-400">
                        {product.description}
                    </p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      ₱{product.price.toLocaleString()}
                    </p>

                    <div className=" flex justify-around items-center">
                        <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Add to Cart
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"viewBox="0 0 14 10">
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M1 5h12m0 0L9 1m4 4L9 9"
                                />
                            </svg>
                        </button>

                        <button class="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                            Buy Product
                            
                        </button>


                    </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    <Footer>
        <img  src={logo} className="h-8"  alt="Calvin's Bakery Logo" />
    </Footer>
   </>
  )
}
