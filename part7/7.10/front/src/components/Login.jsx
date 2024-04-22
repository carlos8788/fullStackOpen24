import React from 'react';
import PropTypes from 'prop-types';
import { Button, TextField, Typography, Container, Box } from '@mui/material';

const Login = ({ handleSubmit }) => {
  return (
    <Container maxWidth="xs">
      <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2 }}>
        Log in to application
      </Typography>
      <form onSubmit={handleSubmit} noValidate>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Username"
            variant="outlined"
            name="username"
            id="username"
            required
            fullWidth
          />
          <TextField
            label="Password"
            variant="outlined"
            name="password"
            id="password"
            type="password"
            required
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Log in
          </Button>
        </Box>
      </form>
    </Container>
  );
};

Login.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default Login;
