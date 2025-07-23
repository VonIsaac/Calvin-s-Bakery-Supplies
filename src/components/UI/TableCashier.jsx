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
import { useGetUser } from "../hooks/hooks";

export default function CashierTable() {
  useGetUser();
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
          backgroundColor: 'oklch(97% 0 0)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: 'none',
          borderRadius: 2,
          maxHeight: 'calc(100vh - 200px)',
          '&::-webkit-scrollbar': {
            width: '6px',
            height: '6px'
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            borderRadius: '3px'
          }
        }}
      >
        <Table
          sx={{
            minWidth: 650,
            '& .MuiTableCell-root': {
              borderColor: 'rgba(0, 0, 0, 0.05)',
              color: '#1e293b',
              py: 2
            }
          }}
          stickyHeader
        >
          <TableHead>
            <TableRow sx={{
              '& .MuiTableCell-root': {
                backgroundColor: 'oklch(92.8% 0.006 264.531)',
                color: '#1e1e1e',
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
                  '&:last-child td, &:last-child th': { border: 0 },
                  '& .MuiTableCell-root': {
                    borderColor: 'oklch(92.3% 0.003 48.717)',
                   
                  },
                  '&:hover': {
                   backgroundColor: 'oklch(70.8% 0 0)',
                  }
                }}
              >
                <TableCell sx={{
                  color: '#334155',
                  fontFamily: 'monospace',
                  letterSpacing: '0.025em'
                }}>
                  {formatCashierId(cashier._id)}
                </TableCell>

                <TableCell
                  align="center"
                  sx={{
                    color: '#1e293b',
                    textTransform: 'uppercase',
                    fontWeight: 500
                  }}
                >
                  {cashier.username}
                </TableCell>

                <TableCell
                  align="center"
                  sx={{
                    color: '#475569',
                    fontSize: '0.875rem'
                  }}
                >
                  {cashier.email}
                </TableCell>

                <TableCell align="center">
                  <IconButton
                    onClick={() => handleDelete(cashier._id)}
                    sx={{
                      color: '#dc2626',
                      '&:hover': {
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        color: '#b91c1c'
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