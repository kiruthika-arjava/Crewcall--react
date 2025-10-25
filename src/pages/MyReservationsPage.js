import React from 'react';
import { Box, Typography, AppBar, Toolbar, IconButton, Card, CardContent, CardMedia } from '@mui/material';
import { ArrowBack, CheckCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const MyReservationsPage = () => {
  const navigate = useNavigate();

  const reservations = [
    {
      id: 1,
      title: 'Wedding Photography',
      date: '2024-02-15',
      location: 'Central Park, NY',
      image: 'https://picsum.photos/200/150?random=6'
    },
    {
      id: 2,
      title: 'Corporate Event',
      date: '2024-02-20',
      location: 'Manhattan, NY',
      image: 'https://picsum.photos/200/150?random=7'
    }
  ];

  return (
    <Box>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate(-1)}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h6">My Reservations</Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 2 }}>
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
          reservations.map((event) => (
            <Card key={event.id} sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex' }}>
                <CardMedia
                  component="img"
                  sx={{ width: 80, height: 80 }}
                  image={event.image}
                  alt={event.title}
                />
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="h6">{event.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    📅 {event.date}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    📍 {event.location}
                  </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pr: 2 }}>
                  <CheckCircle color="success" />
                </Box>
              </Box>
            </Card>
          ))
        )}
      </Box>
    </Box>
  );
};

export default MyReservationsPage;