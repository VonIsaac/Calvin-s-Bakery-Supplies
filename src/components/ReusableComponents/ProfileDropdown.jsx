import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { postLogout, queryClient } from '../../utils/http';
import Cookies from 'js-cookie';
import { useMutation } from '@tanstack/react-query';


export default function ProfileDropdown({children }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };



   const {mutate} = useMutation({
      mutationFn: postLogout, 
      onSuccess: (data) => {
          queryClient.invalidateQueries('logout')
          Cookies.remove('token'); // Remove token from cookies
         localStorage.removeItem('authUser'); // Remove user data from localStorage
         localStorage.clear()
         setAnchorEl(null);
          console.log(data)
          navigate('/')
      }
  })

  const handleLogout = () => {
    mutate();
    ;
  }

  return (
    <div >
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {children}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': 'basic-button',
          },
        }}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
