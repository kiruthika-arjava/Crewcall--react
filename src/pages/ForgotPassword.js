import React, { useState } from 'react';
import { Box, TextField, Button, Typography, AppBar, Toolbar, IconButton, Card } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '../utils/validation';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const handleSendReset = () => {
    if (!validateEmail(email)) {
      setError('Please enter a valid email');
      return;
    }
    setError('');
    setSent(true);
  };

  return (
    <Box>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate(-1)}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h6">Forgot Password</Typography>
        </Toolbar>
      </AppBar>
      
      <Box sx={{ p: 3, bgcolor: 'grey.50', minHeight: '100vh' }}>
        <Card sx={{ p: 3, maxWidth: 400, mx: 'auto', mt: 5 }}>
          {!sent ? (
            <>
              <Typography variant="h5" textAlign="center" gutterBottom>
                Reset Password
              </Typography>
              <Typography variant="body2" textAlign="center" color="text.secondary" sx={{ mb: 3 }}>
                Enter your email to receive reset instructions
              </Typography>
              <TextField
                fullWidth
                label="Email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!error}
                helperText={error}
                sx={{ mb: 3 }}
              />
              <Button
                fullWidth
                variant="contained"
                onClick={handleSendReset}
                sx={{ py: 1.5 }}
              >
                Send Reset Link
              </Button>
            </>
          ) : (
            <>
              <Typography variant="h5" textAlign="center" gutterBottom>
                Check Your Email
              </Typography>
              <Typography variant="body2" textAlign="center" color="text.secondary" sx={{ mb: 3 }}>
                We've sent password reset instructions to {email}
              </Typography>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => navigate('/signin')}
                sx={{ py: 1.5 }}
              >
                Back to Sign In
              </Button>
            </>
          )}
        </Card>
      </Box>
    </Box>
  );
};

export default ForgotPassword;