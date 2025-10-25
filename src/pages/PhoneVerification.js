import React, { useState } from 'react';
import { Box, Button, Typography, TextField, IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const PhoneVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const phoneNumber = location.state?.phoneNumber || '';
  const [verificationCode, setVerificationCode] = useState('');

  const handleVerify = () => {
    if (verificationCode.length === 6) {
      navigate('/main');
    }
  };

  const handleResend = () => {
    // Simulate sending verification code
    alert(`Verification code sent to ${phoneNumber}`);
  };

  return (
    <Box sx={{ height: '100vh', bgcolor: 'white', p: 3, maxWidth: 400, mx: 'auto' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, mt: 2 }}>
        <IconButton onClick={() => navigate('/mobile-signup')} sx={{ mr: 1 }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Verify Phone
        </Typography>
      </Box>

      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 2 }}>
          Enter verification code
        </Typography>

        <Typography sx={{ color: 'grey.600', textAlign: 'center', mb: 4 }}>
          We sent a 6-digit code to {phoneNumber}
        </Typography>

        <TextField
          fullWidth
          variant="outlined"
          placeholder="Enter 6-digit code"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
          inputProps={{ maxLength: 6, style: { textAlign: 'center', fontSize: '1.5rem', letterSpacing: '0.5rem' } }}
          sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
        />

        <Button
          variant="text"
          fullWidth
          onClick={handleResend}
          sx={{ mb: 4, color: 'primary.main' }}
        >
          Resend code
        </Button>

        <Button
          variant="contained"
          fullWidth
          onClick={handleVerify}
          disabled={verificationCode.length !== 6}
          sx={{
            py: 1.5,
            borderRadius: 2,
            bgcolor: 'primary.main',
            '&:hover': { bgcolor: 'primary.dark' },
          }}
        >
          Verify
        </Button>
      </Box>
    </Box>
  );
};

export default PhoneVerification;