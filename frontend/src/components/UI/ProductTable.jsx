import React from 'react';
import { getProducts, deleteProduct, queryClient } from '../../utils/http';
import { useQuery, useMutation } from '@tanstack/react-query';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import Skeleton from '@mui/material/Skeleton';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import { useGetUser } from '../hooks/hooks';
import swal from 'sweetalert';
import EditProductModal from './EditModal';
import { useState } from 'react';
import { formatDateToText } from '../../utils/helpers';

export default function ProductTable() {
  const [editOpen, setEditOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setEditOpen(true);
  };
  useGetUser();

  const { data, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: ({ signal }) => getProducts({ signal }),
  });

  const { mutate: removeProduct } = useMutation({
    mutationFn: (id) => deleteProduct(id),
    onSuccess: () => {
      swal({
        title: 'Product Deleted',
        text: 'The product has been successfully deleted.',
        icon: 'success',
        button: 'OK',
      });
      queryClient.invalidateQueries(['products']);
    },
    onError: (err) => {
      console.error('Error deleting product:', err);
      alert('Failed to delete product. Try again.');
    },
  });

  const handleDelete = (id) => {
    removeProduct(id);
  };

  // Helper function to determine product status
  const getProductStatus = (expirationDate) => {
    if (!expirationDate || isNaN(new Date(expirationDate))) return null;

    const today = new Date();
    const expDate = new Date(expirationDate);
    const diffTime = expDate - today;
    const diffMonths = diffTime / (1000 * 60 * 60 * 24 * 30); // Convert ms to months

    if (expDate < today) {
      return { label: 'Expired', color: 'red', bg: 'transparent' };
    }
    if (diffMonths <= 3) {
      return { label: 'Expiring Soon', color: '#ff9800', bg: '#fff3e0' }; // orange
    }
    return { label: 'Active', color: '#388e3c', bg: '#e8f5e9' }; // green
  };

  return (
   <>
     <Paper
      sx={{
        backgroundColor: 'oklch(97% 0 0)',
        border: '1px solid oklch(87% 0 0)',
        borderRadius: 1,
        overflow: 'hidden',
        boxShadow: 'none',
      }}
    >
      <Box sx={{ p: 2 }}>
     
      </Box>

      <TableContainer
        sx={{
          maxHeight: 'calc(100vh - 230px)',
          '&::-webkit-scrollbar': { width: '6px', height: '6px' },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'oklch(87% 0 0 / 0.2)',
            borderRadius: '3px',
          },
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {[
                'PRODUCT NAME',
                'PRICE',
                'RETAIL PRICE',
                'HALF PRICE',
                'EXPIRATION DATE',
                'CATEGORY',
                'STOCK',
                'STATUS',
                'ACTIONS',
              ].map((header, idx) => (
                <TableCell
                  key={idx}
                  sx={{
                    backgroundColor: 'oklch(92.8% 0.006 264.531)',
                    color: 'oklch(21.6% 0.006 56.043)',
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                    borderColor: 'oklch(87% 0 0)',
                  }}
                  align={header === 'ACTIONS' ? 'right' : 'left'}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {isLoading
              ? Array(5)
                  .fill(null)
                  .map((_, i) => (
                    <TableRow key={i}>
                      {Array(9)
                        .fill(null)
                        .map((__, j) => (
                          <TableCell key={j} sx={{ borderColor: 'oklch(87% 0 0)' }}>
                            <Skeleton animation="wave" />
                          </TableCell>
                        ))}
                    </TableRow>
                  ))
              : (data?.products || []).map((product) => {
                  const status = getProductStatus(product.expirationDate);

                  return (
                    <TableRow
                      key={product._id}
                      hover
                      sx={{
                        backgroundColor:
                          status?.label === 'Expired'
                            ? 'rgba(255, 0, 0, 0.09)' 
                            : status?.label === 'Expiring Soon'
                            ? 'rgba(255, 152, 0, 0.09)' 
                            : 'transparent',
                        '&:hover': {
                          backgroundColor:
                            status?.label === 'Expired'
                              ? 'rgba(255, 0, 0, 0.1)'
                              : status?.label === 'Expiring Soon'
                              ? 'rgba(255, 152, 0, 0.1)'
                              : 'oklch(87% 0 0 / 0.1)',
                        },
                        '& .MuiTableCell-root': {
                          borderColor: 'oklch(87% 0 0)',
                        },
                      }}
                    >
                      <TableCell sx={{ color: 'oklch(21.6% 0.006 56.043)', fontWeight: 500 }}>
                        {product.name}
                      </TableCell>

                      <TableCell sx={{ color: 'oklch(21.6% 0.006 56.043)' }}>
                        ₱{product.price.toLocaleString()}
                      </TableCell>

                      <TableCell sx={{ color: 'oklch(21.6% 0.006 56.043)' }}>
                        {product.retailPrice ? `₱${product.retailPrice.toLocaleString()}` : 'NA'}
                      </TableCell>

                      <TableCell sx={{ color: 'oklch(21.6% 0.006 56.043)' }}>
                        {product.halfPrice ? `₱${product.halfPrice.toLocaleString()}` : 'NA'}
                      </TableCell>

                      <TableCell sx={{ color: 'oklch(21.6% 0.006 56.043)' }}>
                       {formatDateToText(product.expirationDate)}
                      </TableCell>

                      <TableCell>
                        <Chip
                          label={product.category}
                          size="small"
                          sx={{
                            textTransform: 'uppercase',
                            fontSize: '0.7rem',
                            letterSpacing: '0.05em',
                            backgroundColor: 'oklch(87% 0 0)',
                            color: 'oklch(21.6% 0.006 56.043)',
                          }}
                        />
                      </TableCell>

                      <TableCell sx={{ color: 'oklch(21.6% 0.006 56.043)', fontWeight: 500 }}>
                        {product.stock ?? '—'}
                      </TableCell>

                      {/* Status Column */}
                      <TableCell>
                        {status && (
                          <Chip
                            label={status.label}
                            size="small"
                            sx={{
                              fontWeight: 600,
                              backgroundColor: status.bg,
                              color: status.color,
                            }}
                          />
                        )}
                      </TableCell>

                      <TableCell align="right">
                        <IconButton
                          size="small"
                          onClick={() => handleEditClick(product)} 
                          sx={{
                            color: 'oklch(21.6% 0.006 56.043)',
                            '&:hover': {
                              color: 'oklch(21.6% 0.006 56.043)',
                              backgroundColor: 'oklch(87% 0 0 / 0.1)',
                            },
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(product._id)}
                          sx={{
                            color: 'oklch(57.7% 0.245 27.325)',
                            ml: 1,
                            '&:hover': {
                              color: 'oklch(57.7% 0.245 27.325)',
                              backgroundColor: 'oklch(87% 0 0 / 0.1)',
                            },
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>

    <EditProductModal
      open={editOpen}
      onClose={() => setEditOpen(false)}
      product={selectedProduct}
    />

   </>
    
  );
}
