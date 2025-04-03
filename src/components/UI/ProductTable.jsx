import React from 'react';
import { getProducts } from '../../utils/http';
import { useQuery } from '@tanstack/react-query';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Paper from "@mui/material/Paper";
import EditIcon from '@mui/icons-material/Edit';
import Skeleton from '@mui/material/Skeleton';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';

export default function ProductTable() {
    const { data, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: ({ signal }) => getProducts({ signal })
    });

    return (
        <Paper sx={{
            backgroundColor: 'rgb(15, 23, 42)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: 1,
            overflow: 'hidden',
            boxShadow: 'none'
        }}>
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
                                <SearchIcon sx={{ color: 'rgb(148, 163, 184)' }} />
                            </InputAdornment>
                        ),
                        sx: {
                            backgroundColor: 'rgb(30, 41, 59)',
                            color: 'rgb(226, 232, 240)',
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'rgba(255, 255, 255, 0.12)'
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'rgba(255, 255, 255, 0.24)'
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'rgba(99, 102, 241)'
                            }
                        }
                    }}
                    inputProps={{
                        style: {
                            color: 'rgb(226, 232, 240)',
                            padding: '10px 14px'
                        }
                    }}
                />
            </Box>

            <TableContainer sx={{
                maxHeight: 'calc(100vh - 230px)',
                '&::-webkit-scrollbar': {
                    width: '6px',
                    height: '6px'
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '3px'
                }
            }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{
                                backgroundColor: 'rgb(30, 41, 59)',
                                color: 'rgb(148, 163, 184)',
                                fontWeight: 600,
                                letterSpacing: '0.05em',
                                borderColor: 'rgba(255, 255, 255, 0.12)',
                                width: '30%'
                            }}>
                                PRODUCT NAME
                            </TableCell>

                            <TableCell sx={{
                                backgroundColor: 'rgb(30, 41, 59)',
                                color: 'rgb(148, 163, 184)',
                                fontWeight: 600,
                                letterSpacing: '0.05em',
                                borderColor: 'rgba(255, 255, 255, 0.12)',
                                width: '15%'
                            }}>
                                PRICE
                            </TableCell>

                            <TableCell sx={{
                                backgroundColor: 'rgb(30, 41, 59)',
                                color: 'rgb(148, 163, 184)',
                                fontWeight: 600,
                                letterSpacing: '0.05em',
                                borderColor: 'rgba(255, 255, 255, 0.12)',
                                width: '20%'
                            }}>
                                CATEGORY
                            </TableCell>

                            <TableCell sx={{
                                backgroundColor: 'rgb(30, 41, 59)',
                                color: 'rgb(148, 163, 184)',
                                fontWeight: 600,
                                letterSpacing: '0.05em',
                                borderColor: 'rgba(255, 255, 255, 0.12)',
                                width: '15%'
                            }}>
                                STOCK
                            </TableCell>

                            <TableCell sx={{
                                backgroundColor: 'rgb(30, 41, 59)',
                                color: 'rgb(148, 163, 184)',
                                fontWeight: 600,
                                letterSpacing: '0.05em',
                                borderColor: 'rgba(255, 255, 255, 0.12)',
                                width: '20%'
                            }} align="right">
                                ACTIONS
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {isLoading ? (
                            Array(5).fill().map((_, index) => (
                                <TableRow key={index}>
                                    <TableCell sx={{ borderColor: 'rgba(255, 255, 255, 0.12)' }}><Skeleton animation="wave" /></TableCell>
                                    <TableCell sx={{ borderColor: 'rgba(255, 255, 255, 0.12)' }}><Skeleton animation="wave" /></TableCell>
                                    <TableCell sx={{ borderColor: 'rgba(255, 255, 255, 0.12)' }}><Skeleton animation="wave" /></TableCell>
                                    <TableCell sx={{ borderColor: 'rgba(255, 255, 255, 0.12)' }}><Skeleton animation="wave" /></TableCell>
                                    <TableCell sx={{ borderColor: 'rgba(255, 255, 255, 0.12)' }} align="right"><Skeleton width={80} animation="wave" /></TableCell>
                                </TableRow>
                            ))
                        ) : (
                            (data?.products || []).map((product) => (
                                <TableRow
                                    key={product._id}
                                    hover
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: 'rgba(255, 255, 255, 0.03)'
                                        },
                                        '& .MuiTableCell-root': {
                                            borderColor: 'rgba(255, 255, 255, 0.12)'
                                        }
                                    }}>
                                    <TableCell sx={{ color: 'rgb(226, 232, 240)', fontWeight: 500 }}>
                                        {product.name}
                                    </TableCell>

                                    <TableCell sx={{ color: 'rgb(226, 232, 240)', fontWeight: 500 }}>
                                        ₱{product.price.toLocaleString()}
                                    </TableCell>

                                    <TableCell>
                                        <Chip
                                            label={product.category}
                                            size="small"
                                            sx={{
                                                textTransform: 'uppercase',
                                                fontSize: '0.7rem',
                                                letterSpacing: '0.05em',
                                                backgroundColor: 'rgba(99, 102, 241, 0.16)',
                                                color: 'rgb(165, 180, 252)'
                                            }}
                                        />
                                    </TableCell>

                                    <TableCell sx={{ color: 'rgb(226, 232, 240)', fontWeight: 500 }}>
                                        10
                                    </TableCell>

                                    <TableCell align="right">
                                        <IconButton
                                            size="small"
                                            sx={{
                                                color: 'rgba(255, 255, 255, 0.7)',
                                                '&:hover': {
                                                    color: 'rgb(74, 222, 128)',
                                                    backgroundColor: 'rgba(74, 222, 128, 0.1)'
                                                }
                                            }}>
                                            <EditIcon fontSize="small" />
                                        </IconButton>

                                        <IconButton
                                            size="small"
                                            sx={{
                                                color: 'rgba(255, 255, 255, 0.7)',
                                                ml: 1,
                                                '&:hover': {
                                                    color: 'rgb(248, 113, 113)',
                                                    backgroundColor: 'rgba(248, 113, 113, 0.1)'
                                                }
                                            }}>
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}