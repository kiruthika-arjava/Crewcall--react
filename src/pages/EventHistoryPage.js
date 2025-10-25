import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Chip, Button } from '@mui/material';
import { ArrowBack, History, CalendarToday, LocationOn } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const EventHistoryPage = () => {
  const navigate = useNavigate();

  const history = [
    {
      id: 1,
      title: 'Music Festival 2023',
      date: 'December 15, 2023',
      location: 'Brooklyn, NY',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=200&fit=crop',
      status: 'Completed',
      talent: 'David Kim'
    },
    {
      id: 2,
      title: 'Art Gallery Opening',
      date: 'November 20, 2023',
      location: 'SoHo, NY',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=200&fit=crop',
      status: 'Completed',
      talent: 'Sarah Johnson'
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
          📅 Event History
        </Typography>
      </Box>

      {history.length === 0 ? (
        <Box sx={{ textAlign: 'center', mt: 10 }}>
          <History sx={{ fontSize: 80, color: 'grey.400' }} />
          <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
            No Event History
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Your completed events will appear here
          </Typography>
        </Box>
      ) : (
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 2.5 }}>
          {history.map((event) => (
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
                      bgcolor: '#4caf50',
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
                    borderColor: '#4caf50',
                    color: '#4caf50',
                    fontWeight: 600,
                    py: 1,
                    borderRadius: 1.5,
                    '&:hover': { borderColor: '#388e3c', bgcolor: 'rgba(76,175,80,0.1)' }
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

export default EventHistoryPage;