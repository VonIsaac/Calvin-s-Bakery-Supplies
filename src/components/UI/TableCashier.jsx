import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getAllCashier, deleteCashier, queryClient } from "../../utils/http";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import SnackBar from "./SnackBar";

export default function CashierTable() {
  const [open, setOpen] = useState(false);

  const { data } = useQuery({
    queryKey: ['cashier'],
    queryFn: ({ signal }) => getAllCashier({ signal })
  });

  const { mutate } = useMutation({
    mutationFn: (id) => deleteCashier(id),
    onSuccess: () => {
      setOpen(true);
      queryClient.invalidateQueries({ queryKey: ['cashier'] });
    },
    onError: (error) => {
      console.error('Error Deleting Cashier:', error);
    },
  });

  const handleDelete = (id) => mutate(id);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  const formatCashierId = (cashierId) => {
    return cashierId.toUpperCase().match(/.{1,4}/g).join('-');
  };

  return (
    <>
      <SnackBar open={open} onClose={handleClose} />
      
      <TableContainer 
        component={Paper}
        sx={{
          backgroundColor: 'transparent',
          backgroundImage: 'none',
          boxShadow: 'none',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          maxHeight: 'calc(100vh - 200px)',
          '&::-webkit-scrollbar': {
            width: '6px',
            height: '6px'
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '3px'
          }
        }}
      >
        <Table 
          sx={{ 
            minWidth: 650,
            '& .MuiTableCell-root': {
              borderColor: 'rgba(255, 255, 255, 0.08)',
              color: 'rgba(255, 255, 255, 0.87)',
              py: 2
            }
          }}
          stickyHeader
        >
          <TableHead>
            <TableRow sx={{
              '& .MuiTableCell-root': {
                backgroundColor: 'rgb(15 23 42)',
                color: 'rgb(148 163 184)',
                fontWeight: 600,
                fontSize: '0.75rem',
                letterSpacing: '0.05em',
                textTransform: 'uppercase'
              }
            }}>
              <TableCell>Cashier ID</TableCell>
              <TableCell align="center">Username</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(data?.result || []).map((cashier) => (
              <TableRow 
                key={cashier._id}
                hover
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.03)'
                  }
                }}
              >
                <TableCell sx={{ 
                  color: 'rgb(226 232 240)',
                  fontFamily: 'monospace',
                  letterSpacing: '0.025em'
                }}>
                  {formatCashierId(cashier._id)}
                </TableCell>
                
                <TableCell 
                  align="center" 
                  sx={{ 
                    color: 'rgb(226 232 240)',
                    textTransform: 'uppercase',
                    fontWeight: 500
                  }}
                >
                  {cashier.username}
                </TableCell>
                <TableCell 
                  align="center"
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '0.875rem'
                  }}
                >
                  {cashier.email}
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={() => handleDelete(cashier._id)}
                    sx={{
                      color: 'rgba(239, 68, 68, 0.7)',
                      '&:hover': {
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        color: 'rgb(239, 68, 68)'
                      }
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
    </>
  );
}