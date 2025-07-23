import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../../../utils/http";
import { useGetUser } from "../../hooks/hooks";
import Header from "../../UI/Header";
import logo from "../../../assets/logo.png"; 
import Footer from "../../UI/Footer";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Divider,
  Box,
  Button
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";

const OrderHistory = () => {
  useGetUser();
  const { data: orders, isLoading, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  if (isLoading)
    return <p className="text-center mt-10 text-gray-600">Loading orders...</p>;

  if (isError)
    return (
      <p className="text-center mt-10 text-red-600">Failed to load orders.</p>
    );

  return (
    <>
      <Header>
        <img src={logo} alt="logo" className="w-[180px]" />
      </Header>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <Box sx={{ maxWidth: '800px',  mb: 2 }}>
          <Button
            component={Link}
            to="/user-products/cart"
            startIcon={<ArrowBackIcon />}
            sx={{
              color: 'oklch(14.7% 0.004 49.25)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            Back to Cart
          </Button>
        </Box>

        <Typography variant="h4" gutterBottom  className="font-extrabold text-center ">
          Order History
        </Typography>

        <TableContainer component={Paper} className="shadow-lg rounded-md">
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell><strong>Customer</strong></TableCell>
                <TableCell><strong>Address</strong></TableCell>
                <TableCell><strong>Phone</strong></TableCell>
                <TableCell><strong>Pickup Date</strong></TableCell>
                <TableCell><strong>Delivery Mode</strong></TableCell>
                <TableCell><strong>Order Date</strong></TableCell>
                <TableCell><strong>Total (₱)</strong></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {orders.map((order) => (
                <React.Fragment key={order._id}>
                  <TableRow hover>
                    <TableCell>{order.customerInfo.name}</TableCell>
                    <TableCell>{order.customerInfo.address}</TableCell>
                    <TableCell>{order.customerInfo.phoneNumber}</TableCell>
                    <TableCell>{new Date(order.customerInfo.pickupDate).toLocaleDateString()}</TableCell>
                    <TableCell>{order.deliveryMode}</TableCell>
                    <TableCell>{new Date(order.createdAt).toLocaleString("en-PH")}</TableCell>
                    <TableCell>₱{order.totalAmount.toLocaleString()}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell colSpan={7} className="bg-gray-50">
                      <Box className="px-4 py-2">
                        <Typography variant="subtitle1" className="font-semibold mb-2">
                          Products
                        </Typography>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell><strong>Product Name</strong></TableCell>
                              <TableCell><strong>Price</strong></TableCell>
                              <TableCell><strong>Pricing Option</strong></TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {order.items.map((item) => {
                              const { product } = item;
                              let priceType = "Price";

                              if (product.price && product.retailPrice) {
                                priceType = "Price + Retail";
                              } else if (product.retailPrice) {
                                priceType = "Retail";
                              }

                              return (
                                <TableRow key={item._id}>
                                  <TableCell>{product.name}</TableCell>
                                  <TableCell>₱{(product.price || product.retailPrice).toLocaleString()}</TableCell>
                                  <TableCell>{priceType}</TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </Box>
                      <Divider />
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <Footer>
        <img src={logo} className="h-8" alt="Calvin's Bakery Logo" />
      </Footer>
    </>
  );
};

export default OrderHistory;
