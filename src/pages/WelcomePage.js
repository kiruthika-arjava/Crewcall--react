import React from 'react';
import { Box, Button, Typography, Container, Grid } from '@mui/material';
import { Headphones, Google, Email, Phone } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const navigate = useNavigate();

  const ImageCard = ({ url }) => (
    <Box
      sx={{
        height: 120,
        borderRadius: 1.5,
        bgcolor: 'grey.300',
        overflow: 'hidden',
      }}
    >
      <img
        src={url}
        alt="Event"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
        onError={(e) => {
          e.target.style.display = 'none';
        }}
      />
    </Box>
  );

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top section */}
      <Box sx={{ flex: 3, bgcolor: 'white', p: 3 }}>
        <Box sx={{ mt: 7, mb: 5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img 
            src="/CrewCall Logo.png" 
            alt="CrewCall Logo" 
            style={{ width: '40px', height: '40px', marginRight: '12px', borderRadius: '8px' }}
          />
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'black' }}>
            CrewCall
          </Typography>
        </Box>

        <Container maxWidth="sm">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <ImageCard url="https://picsum.photos/200/150?random=1" />
            </Grid>
            <Grid item xs={6}>
              <ImageCard url="https://picsum.photos/200/200?random=2" />
            </Grid>
            <Grid item xs={6}>
              <ImageCard url="https://picsum.photos/200/200?random=3" />
            </Grid>
            <Grid item xs={6}>
              <ImageCard url="https://picsum.photos/200/150?random=4" />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Bottom section */}
      <Box
        sx={{
          flex: 1,
          bgcolor: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: 3,
        }}
      >
        <Box
          sx={{
            bgcolor: 'primary.main',
            borderRadius: 4,
            p: 4,
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            width: '100%',
            maxWidth: 700,
          }}
        >
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                color: 'white',
                textAlign: 'center',
                lineHeight: 1.2,
              }}
            >
              Collaborating for{'\n'}Events Done Right.
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center' }}>
            <Button
              variant="contained"
              startIcon={<Google />}
              sx={{
                bgcolor: 'white',
                color: 'black',
                py: 1.5,
                borderRadius: 25,
                '&:hover': { bgcolor: 'grey.100' },
                width: '80%',
              }}
            >
              Sign Up with Google
            </Button>

            <Button
              variant="contained"
              startIcon={<Email />}
              sx={{
                bgcolor: 'white',
                color: 'black',
                py: 1.5,
                borderRadius: 25,
                '&:hover': { bgcolor: 'grey.100' },
                width: '80%',
              }}
              onClick={() => navigate('/signup')}
            >
              Sign Up with Email Address
            </Button>

            <Button
              variant="contained"
              startIcon={<Phone />}
              sx={{
                bgcolor: 'white',
                color: 'black',
                py: 1.5,
                borderRadius: 25,
                '&:hover': { bgcolor: 'grey.100' },
                width: '80%',
              }}
              onClick={() => navigate('/signup-mobile')}
            >
              Sign Up with Phone Number
            </Button>
          </Box>

          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography
              sx={{
                color: 'white',
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
              onClick={() => navigate('/signin')}
            >
              Already have an account? Log in.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default WelcomePage;