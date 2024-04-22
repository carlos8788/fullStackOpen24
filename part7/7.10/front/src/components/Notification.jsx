import React from 'react';
import { useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const StyledSnackbar = styled(Snackbar)(({ theme }) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const Notification = () => {
  const message = useSelector((state) => state.notification.message);
  const style = useSelector((state) => state.notification.style);

  if (!message) return null;

  return (
    <StyledSnackbar
      open={!!message}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <MuiAlert severity={style === 'success' ? 'success' : 'error'} sx={{ width: '100%' }}>
        {message}
      </MuiAlert>
    </StyledSnackbar>
  );
};

export default Notification;