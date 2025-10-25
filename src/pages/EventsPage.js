import React, { useState } from 'react';
import { Box, Typography, AppBar, Toolbar, Button, Card, CardContent, CardMedia, TextField, InputAdornment } from '@mui/material';
import { Search, BookmarkBorder, History } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const EventsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const events = [
    {
      id: 1,
      title: 'Summer Music Festival',
      date: '2024-03-15',
      location: 'Central Park, NY',
      participants: '15/50',
      image: 'https://picsum.photos/200/150?random=13'
    },
    {
      id: 2,
      title: 'Art Gallery Opening',
      date: '2024-03-20',
      location: 'SoHo, NY',
      participants: '8/25',
      image: 'https://picsum.photos/200/150?random=14'
    }
  ];

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Events
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <Button
            variant="outlined"
            startIcon={<BookmarkBorder />}
            onClick={() => navigate('/my-reservations')}
            size="small"
          >
            My Reservations
          </Button>
          <Button
            variant="outlined"
            startIcon={<History />}
            onClick={() => navigate('/event-history')}
            size="small"
          >
            History
          </Button>
        </Box>

        <TextField
          fullWidth
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />

        {filteredEvents.map((event) => (
          <Card key={event.id} sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex' }}>
              <CardMedia
                component="img"
                sx={{ width: 100, height: 100 }}
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
                <Typography variant="body2" color="primary">
                  👥 {event.participants} participants
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  sx={{ mt: 1 }}
                  onClick={() => console.log('Join event', event.id)}
                >
                  Join Event
                </Button>
              </CardContent>
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default EventsPage;