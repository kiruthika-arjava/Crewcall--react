import React, { useState } from 'react';
import { Box, TextField, Button, Typography, AppBar, Toolbar, IconButton, Card, InputAdornment } from '@mui/material';
import { ArrowBack, Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { validateEmail, validatePassword } from '../utils/validation';

const AccountSignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = () => {
    const newErrors = {};
    
    if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!validatePassword(password)) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      // Store user data for profile display
      const userData = {
        email: email,
        name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        userType: 'existing'
      };
      localStorage.setItem('userData', JSON.stringify(userData));
      navigate('/main');
    }
  };

  return (
    <Box>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate(-1)}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h6">Sign In</Typography>
        </Toolbar>
      </AppBar>
      
      <Box sx={{ p: 3, bgcolor: 'grey.50', minHeight: '100vh' }}>
        <Card sx={{ p: 3, maxWidth: 400, mx: 'auto', mt: 5 }}>
          <Typography variant="h5" textAlign="center" gutterBottom>
            Welcome Back
          </Typography>
          <Typography variant="body2" textAlign="center" color="text.secondary" sx={{ mb: 3 }}>
            Sign in to your account
          </Typography>
        <TextField
          fullWidth
          label="Email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!errors.password}
          helperText={errors.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ mb: 3 }}
        />
        <Button
          fullWidth
          variant="contained"
          onClick={handleSignIn}
          sx={{ py: 1.5 }}
        >
          Sign In
        </Button>
        
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography
            sx={{ cursor: 'pointer', textDecoration: 'underline', mb: 1 }}
            onClick={() => navigate('/forgot-password')}
          >
            Forgot Password?
          </Typography>
          <Typography
            sx={{ cursor: 'pointer', textDecoration: 'underline' }}
            onClick={() => navigate('/signup')}
          >
            Don't have an account? Sign up
          </Typography>
        </Box>
        </Card>
      </Box>
    </Box>
  );
};

export default AccountSignIn;