
import logo from '../../../assets/logo.png';
import Footer from '../../UI/Footer';
import Header from '../../UI/Header';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../../../utils/http';
import { Box, Button, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Loading from '../../UI/Loading';
import { Link } from 'react-router-dom';
import { useGetUser } from '../../hooks/hooks';
import {useState} from 'react';
import AvailModal from '../../UI/AvailModal';
import { isExpired } from '../../../utils/helpers';

export default function AllProducts() {
  useGetUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null); // optional
  
    const handleOpenModal = (product) => {
      setSelectedProduct(product); // if you want to use product data later
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
      setSelectedProduct(null);
    };

  const { data, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: ({ signal }) => getProducts({ signal }),
  });

  if (isLoading) return <Loading />;

  const filteredProducts = (data?.products || []).filter(
    (product) => !isExpired(product.expirationDate)
  );

  return (
    <>
      <Header>
        <img src={logo} alt="logo" className="w-[180px]" />
      </Header>

      <div className="min-h-screen bg-neutral-100">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Box
            sx={{
              maxWidth: '1200px',
              mx: 'auto',
              mb: 4,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 600,
                color: 'oklch(14.7% 0.004 49.25)',
                textTransform: 'uppercase',
              }}
            >
              All Products
            </Typography>

            <Button
              component={Link}
              to="/user-products"
              startIcon={<ArrowBackIcon />}
              sx={{
                color: 'oklch(14.7% 0.004 49.25)',
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
              }}
            >
              Back to Products
            </Button>
          </Box>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
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


                  {/* Full-width Avail Button */}
                  <div className="mt-4">
                  <button
                    onClick={() => handleOpenModal(product)}
                    disabled={product.stock === 0}
                    className={`w-full inline-flex justify-center items-center px-4 py-3 text-sm font-medium rounded-lg focus:ring-4 focus:outline-none ${product.stock === 0  ? 'bg-gray-400 text-white cursor-not-allowed'  : 'text-white bg-orange-500 hover:bg-orange-600 focus:ring-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800'}`}>
                        {product.stock === 0 ? 'Out of Stock' : 'Avail Item'}
                        <svg
                              className="rtl:rotate-180 w-4 h-4 ml-2"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 14 10"
                            >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                          />
                    </svg>
                </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
        <AvailModal selectedProduct={selectedProduct} open={isModalOpen} onClose={handleCloseModal} />
      <Footer>
        <img src={logo} className="h-8" alt="Calvin's Bakery Logo" />
      </Footer>
    </>
  );
}
