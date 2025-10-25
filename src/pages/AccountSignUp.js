import React, { useState } from 'react';
import { Box, TextField, Button, Typography, AppBar, Toolbar, IconButton, Card, InputAdornment } from '@mui/material';
import { ArrowBack, Person, Event, Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { validateEmail, validatePhone, validatePassword, validateName } from '../utils/validation';

const AccountSignUp = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('talent');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    roleInOrganization: ''
  });
  const [organizationType, setOrganizationType] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSignUp = () => {
    const newErrors = {};
    
    if (!validateName(formData.name)) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      // Store user data for profile display
      const userData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        userType: userType,
        roleInOrganization: formData.roleInOrganization,
        organizationType: organizationType
      };
      localStorage.setItem('userData', JSON.stringify(userData));
      
      if (userType === 'talent') {
        navigate('/talent-profile');
      } else {
        navigate('/main');
      }
    }
  };

  return (
    <Box>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate(-1)}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h6">Sign Up</Typography>
        </Toolbar>
      </AppBar>
      
      <Box sx={{ p: 3, bgcolor: 'grey.50', minHeight: '100vh' }}>
        <Card sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
          <Typography variant="h5" textAlign="center" gutterBottom>
            Create Your Account
          </Typography>
          <Typography variant="body2" textAlign="center" color="text.secondary" sx={{ mb: 3 }}>
            Choose your role and get started
          </Typography>
        <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
          <Button
            variant={userType === 'talent' ? 'contained' : 'outlined'}
            startIcon={<Person />}
            onClick={() => setUserType('talent')}
            sx={{ flex: 1 }}
          >
            Talent
          </Button>
          <Button
            variant={userType === 'organiser' ? 'contained' : 'outlined'}
            startIcon={<Event />}
            onClick={() => setUserType('organiser')}
            sx={{ flex: 1 }}
          >
            Organiser
          </Button>
        </Box>
        
        {userType && (
          <>
            <TextField
              fullWidth
              label="Full Name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange('name')}
              error={!!errors.name}
              helperText={errors.name}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange('email')}
              error={!!errors.email}
              helperText={errors.email}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Phone Number"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange('phone')}
              error={!!errors.phone}
              helperText={errors.phone}
              sx={{ mb: 2 }}
            />
            {userType === 'organiser' && (
              <TextField
                fullWidth
                label="Your Role in Organization"
                placeholder="e.g., Event Manager, Director, Coordinator"
                value={formData.roleInOrganization}
                onChange={handleChange('roleInOrganization')}
                sx={{ mb: 2 }}
              />
            )}
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a password (min 6 characters)"
              value={formData.password}
              onChange={handleChange('password')}
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
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={handleChange('confirmPassword')}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />
            {userType === 'organiser' && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>Organization Type</Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant={organizationType === 'nonprofit' ? 'contained' : 'outlined'}
                    onClick={() => setOrganizationType('nonprofit')}
                    sx={{ flex: 1 }}
                  >
                    NGO/Non-profit
                  </Button>
                  <Button
                    variant={organizationType === 'forprofit' ? 'contained' : 'outlined'}
                    onClick={() => setOrganizationType('forprofit')}
                    sx={{ flex: 1 }}
                  >
                    For Profit
                  </Button>
                </Box>
              </Box>
            )}
            <Button
              fullWidth
              variant="contained"
              onClick={handleSignUp}
              sx={{ py: 1.5 }}
            >
              Create Account
            </Button>
          </>
        )}
        
        {userType && (
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2" color="primary">
              Selected Role: {userType === 'talent' ? 'Talent' : 'Organiser'}
            </Typography>
          </Box>
        )}
        
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography
            sx={{ cursor: 'pointer', textDecoration: 'underline', mb: 1 }}
            onClick={() => navigate('/forgot-password')}
          >
            Forgot Password?
          </Typography>
          <Typography
            sx={{ cursor: 'pointer', textDecoration: 'underline' }}
            onClick={() => navigate('/signin')}
          >
            Already have an account? Sign in
          </Typography>
        </Box>
        </Card>
      </Box>
    </Box>
  );
};

export default AccountSignUp;