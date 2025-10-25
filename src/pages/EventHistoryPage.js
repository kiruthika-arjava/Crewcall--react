import React from 'react';
import { Box, Typography, AppBar, Toolbar, IconButton, Card, CardContent, CardMedia } from '@mui/material';
import { ArrowBack, History } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const EventHistoryPage = () => {
  const navigate = useNavigate();

  const history = [
    {
      id: 1,
      title: 'Music Festival 2023',
      date: '2023-12-15',
      location: 'Brooklyn, NY',
      image: 'https://picsum.photos/200/150?random=8',
      status: 'Completed'
    },
    {
      id: 2,
      title: 'Art Gallery Opening',
      date: '2023-11-20',
      location: 'SoHo, NY',
      image: 'https://picsum.photos/200/150?random=9',
      status: 'Completed'
    }
  ];

  return (
    <Box>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate(-1)}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h6">Event History</Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 2 }}>
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
          history.map((event) => (
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
                  <Typography variant="body2" color="success.main">
                    ✅ {event.status}
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          ))
        )}
      </Box>
    </Box>
  );
};

export default EventHistoryPage;