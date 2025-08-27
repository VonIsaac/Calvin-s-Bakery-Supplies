import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';



export default function SnackBar({onClose, open}) {
  let alertMessage = <p><span severity="success"> Delete </span>Account Succesfully </p>
  
  return (
    <div>
      {/*<Button onClick={handleClick}>Open Snackbar</Button>*/}
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={onClose}
        message= {alertMessage}
        
      />
    </div>
  );
}