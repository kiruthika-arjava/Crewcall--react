import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Chip, Button } from '@mui/material';
import { ArrowBack, CheckCircle, CalendarToday, LocationOn } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const MyReservationsPage = () => {
  const navigate = useNavigate();

  const reservations = [
    {
      id: 1,
      title: 'Wedding Photography',
      date: 'February 15, 2024',
      location: 'Central Park, NY',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=200&fit=crop',
      status: 'Confirmed',
      talent: 'Emma Wilson'
    },
    {
      id: 2,
      title: 'Corporate Event',
      date: 'February 20, 2024',
      location: 'Manhattan, NY',
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&h=200&fit=crop',
      status: 'Confirmed',
      talent: 'Alex Chen'
    }
  ];

  return (
    <Box sx={{ p: 3, maxWidth: 1350, mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          sx={{ mb: 2, color: '#ff6b35' }}
        >
          Back
        </Button>
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 700, 
            color: '#ff6b35', 
            mb: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 2
          }}
        >
          📋 My Reservations
        </Typography>
      </Box>

      {reservations.length === 0 ? (
        <Box sx={{ textAlign: 'center', mt: 10 }}>
          <Typography variant="h6" color="text.secondary">
            No Reserved Events
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Go to Home to join events
          </Typography>
        </Box>
      ) : (
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 2.5 }}>
          {reservations.map((event) => (
            <Card 
              key={event.id}
              sx={{
                cursor: 'pointer',
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                '&:hover': { boxShadow: '0 4px 16px rgba(0,0,0,0.15)' },
                height: 'fit-content',
                maxWidth: '100%'
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={event.image}
                alt={event.title}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
                    {event.title}
                  </Typography>
                  <Chip
                    label={event.status}
                    size="small"
                    sx={{
                      bgcolor: '#66bb6a',
                      color: 'white',
                      fontWeight: 500
                    }}
                  />
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <CalendarToday sx={{ fontSize: 16, mr: 1, color: '#666' }} />
                  <Typography variant="body2" color="text.secondary">
                    {event.date}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LocationOn sx={{ fontSize: 16, mr: 1, color: '#666' }} />
                  <Typography variant="body2" color="text.secondary">
                    {event.location}
                  </Typography>
                </Box>
                
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 2 }}>
                  Talent: {event.talent}
                </Typography>
                
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{
                    borderColor: '#ff6b35',
                    color: '#ff6b35',
                    fontWeight: 600,
                    py: 1,
                    borderRadius: 1.5,
                    '&:hover': { borderColor: '#e55a2b', bgcolor: 'rgba(255,107,53,0.1)' }
                  }}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default MyReservationsPage;