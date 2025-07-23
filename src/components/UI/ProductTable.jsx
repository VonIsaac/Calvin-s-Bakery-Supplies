import React from 'react';
import { getProducts } from '../../utils/http';
import { useQuery } from '@tanstack/react-query';
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
import {useGetUser} from '../hooks/hooks';

export default function ProductTable() {
  useGetUser();
  const { data, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: ({ signal }) => getProducts({ signal }),
  });

  return (
    <Paper
      sx={{
        backgroundColor: 'oklch(97% 0 0)',
        border: '1px solid oklch(87% 0 0)',
        borderRadius: 1,
        overflow: 'hidden',
        boxShadow: 'none',
      }}
    >
      {/* Search Bar */}
      <Box sx={{ p: 2 }}>
        <TextField
          fullWidth
          placeholder="Search products..."
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'oklch(14.7% 0.004 49.25)' }} />
              </InputAdornment>
            ),
            sx: {
              backgroundColor: 'oklch(92.8% 0.006 264.531)',
              color: 'oklch(21.6% 0.006 56.043)',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'oklch(87% 0 0)',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'oklch(87% 0 0)',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'oklch(87% 0 0)',
              },
            },
          }}
          inputProps={{
            style: {
              color: 'oklch(21.6% 0.006 56.043)',
              padding: '10px 14px',
            },
          }}
        />
      </Box>

      <TableContainer
        sx={{
          maxHeight: 'calc(100vh - 230px)',
          '&::-webkit-scrollbar': {
            width: '6px',
            height: '6px',
          },
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
                      {Array(8)
                        .fill(null)
                        .map((__, j) => (
                          <TableCell key={j} sx={{ borderColor: 'oklch(87% 0 0)' }}>
                            <Skeleton animation="wave" />
                          </TableCell>
                        ))}
                    </TableRow>
                  ))
              : (data?.products || []).map((product) => (
                  <TableRow
                    key={product._id}
                    hover
                    sx={{
                      '&:hover': {
                        backgroundColor: 'oklch(87% 0 0 / 0.1)',
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
                      {
                      product.expirationDate && !isNaN(new Date(product.expirationDate))
                      ? new Date(product.expirationDate).toLocaleDateString('en-PH', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }) : '—'}
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

                    <TableCell align="right">
                      <IconButton
                        size="small"
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
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
