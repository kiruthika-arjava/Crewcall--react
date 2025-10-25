import React, { useState } from 'react';
import { Box, Button, Typography, TextField, IconButton } from '@mui/material';
import { ArrowBack, Phone } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { validatePhone } from '../utils/validation';

const MobileSignUp = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  const handleContinue = () => {
    if (!phoneNumber.trim()) {
      setError('Phone number is required');
      return;
    }
    
    if (!validatePhone(phoneNumber)) {
      setError('Please enter a valid phone number');
      return;
    }
    
    setError('');
    navigate('/phone-verification', { state: { phoneNumber } });
  };

  const handlePhoneChange = (e) => {
    setPhoneNumber(e.target.value);
    if (error) setError('');
  };

  return (
    <Box sx={{ height: '100vh', bgcolor: 'white', p: 3, maxWidth: 400, mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, mt: 2 }}>
        <IconButton onClick={() => navigate('/')} sx={{ mr: 1 }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Sign Up with Phone
        </Typography>
      </Box>

      {/* Content */}
      <Box sx={{ mt: 6 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <Box
            sx={{
              p: 3,
              bgcolor: 'primary.main',
              borderRadius: '50%',
            }}
          >
            <Phone sx={{ color: 'white', fontSize: 40 }} />
          </Box>
        </Box>

        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            textAlign: 'center',
            mb: 2,
          }}
        >
          Enter your phone number
        </Typography>

        <Typography
          sx={{
            color: 'grey.600',
            textAlign: 'center',
            mb: 4,
          }}
        >
          We'll send you a verification code
        </Typography>

        <TextField
          fullWidth
          variant="outlined"
          placeholder="Phone number"
          value={phoneNumber}
          onChange={handlePhoneChange}
          error={!!error}
          helperText={error}
          sx={{
            mb: 4,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            },
          }}
        />

        <Button
          variant="contained"
          fullWidth
          onClick={handleContinue}
          disabled={!phoneNumber.trim()}
          sx={{
            py: 1.5,
            borderRadius: 2,
            bgcolor: 'primary.main',
            '&:hover': { bgcolor: 'primary.dark' },
          }}
        >
          Continue
        </Button>
      </Box>
    </Box>
  );
};

export default MobileSignUp;