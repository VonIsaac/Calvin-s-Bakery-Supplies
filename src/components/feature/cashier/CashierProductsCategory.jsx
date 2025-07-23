import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getProductsByCategory } from "../../../utils/http";
import { useParams } from "react-router-dom";
import logo from '../../../assets/logo.png';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import Loading from "../../UI/Loading";
import Footer from "../../UI/Footer";
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';

export default function CashierProductsCategory() {
  const { category } = useParams(); //  use this to acces routes
  const { data, isLoading } = useQuery({
    queryKey: ["products", category],
    queryFn: ({ signal }) => getProductsByCategory(category, { signal }),
  }); 

  if (isLoading) { // when redirect or reloading the page the thers a loading style
    return <Loading />
  }

  
  return (
    <>
            <AppBar position="static" sx={{ 
                  backgroundColor: 'oklch(87.1% 0.15 154.449)', 
                  mb: 3, 
                  borderRadius: 1, 
                  boxShadow: 'none', 
                  border: '1px solid rgba(255, 255, 255, 0.12)'
                }}>
                  <Toolbar>
                    <Typography variant="h6" component="div" 
                      sx={{ 
                        flexGrow: 1, 
                        fontWeight: 600, 
                        letterSpacing: '0.05em', 
                        color: 'oklch(21% 0.006 285.885)', 
                        textAlign: 'center'
                      }}>
                      CASHIER DASHBOARD
                    </Typography>
                  </Toolbar>
                </AppBar>
      
      <div className="min-h-screen  bg-neutral-100"> 
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"> 
          
          <Box sx={{ maxWidth: '1200px', mx: 'auto',mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Typography variant="h4" sx={{ fontWeight: 600,  color: 'oklch(14.7% 0.004 49.25)',textTransform: 'uppercase'}}>
              {category} Products
            </Typography>
                    
            <Button component={Link} to="/cashier-products" startIcon={<ArrowBackIcon />} sx={{color: 'oklch(14.7% 0.004 49.25)', '&:hover': {backgroundColor: 'rgba(255, 255, 255, 0.1'}}}>
              Back to Products
            </Button>
          </Box>
          
          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.products.map((product) => (
                <div
                key={product._id}
                className="text-stone-100 border-none border-gray-200 rounded-lg shadow-sm dark:bg-orange-400 overflow-hidden"
              >
                <img
                  className="w-full h-48 object-cover"
                  src={product.images}
                  alt={product.name}
                />

                <div className="p-5">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-black">
                    {product.name}
                  </h5>

                  <p className="mb-2 tracking-wider text-black">
                    Products Left: {product.stock}
                  </p>

                  <p className="mb-2 font-semibold tracking-wider text-black">
                    Expiration Date:{" "}
                    {new Date(product.expirationDate).toLocaleDateString('en-PH', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>

                  <p className="mb-3 font-normal  text-black">
                    {product.description}
                  </p>

                  <p className="mb-3 text-lg font-bold text-black">
                    Price: {`₱${product.price.toLocaleString()}`}
                  </p>
                  <p className="mb-3 text-lg font-bold text-black">
                    Retail Price: {!product.retailPrice ? 'The retail price of this product are not available' : `₱${product.retailPrice}`}
                  </p>

                  <p className="mb-3 text-lg font-bold text-black">
                    Half Price: {!product.halfPrice ?  'The half price of this product are not available': `${product.halfPrice}`} 
                  </p>
                 
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <Footer>
        <img 
          src={logo}
          className="h-8" 
          alt="Calvin's Bakery Logo" 
        />
      </Footer>
    </>
  );
}