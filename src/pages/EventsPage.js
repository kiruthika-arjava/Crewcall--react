import React, { useState } from 'react';
import { Box, Typography, Button, Card, CardContent, CardMedia, TextField, InputAdornment, Chip, Dialog, DialogTitle, DialogContent, DialogActions, Avatar } from '@mui/material';
import { Search, BookmarkBorder, History, CalendarToday, LocationOn, People, Close } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const EventsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const events = [
    {
      id: 1,
      title: 'Summer Music Festival',
      date: 'March 15, 2024',
      location: 'Central Park, NY',
      participants: '15/50',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=200&fit=crop'
    },
    {
      id: 2,
      title: 'Art Gallery Opening',
      date: 'March 20, 2024',
      location: 'SoHo, NY',
      participants: '8/25',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=200&fit=crop'
    },
    {
      id: 3,
      title: 'Corporate Conference',
      date: 'March 25, 2024',
      location: 'Manhattan, NY',
      participants: '25/100',
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&h=200&fit=crop'
    },
    {
      id: 4,
      title: 'Wedding Reception',
      date: 'April 2, 2024',
      location: 'Brooklyn, NY',
      participants: '12/30',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=200&fit=crop'
    }
  ];

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleJoinEvent = (event) => {
    setSelectedEvent(event);
    setJoinModalOpen(true);
  };

  const confirmJoinEvent = () => {
    setJoinModalOpen(false);
    setSelectedEvent(null);
    // Add join logic here
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1400, mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
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
          🎪 Events
        </Typography>
      </Box>

      {/* Action Buttons */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          <Chip
            icon={<BookmarkBorder />}
            label="My Reservations"
            onClick={() => navigate('/my-reservations')}
            sx={{
              cursor: 'pointer',
              bgcolor: '#f5f5f5',
              color: '#666',
              '&:hover': { bgcolor: '#e0e0e0' }
            }}
          />
          <Chip
            icon={<History />}
            label="Event History"
            onClick={() => navigate('/event-history')}
            sx={{
              cursor: 'pointer',
              bgcolor: '#f5f5f5',
              color: '#666',
              '&:hover': { bgcolor: '#e0e0e0' }
            }}
          />
        </Box>
      </Box>

      {/* Search Box */}
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search events by name or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: '#666' }} />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              bgcolor: 'white'
            }
          }}
        />
      </Box>

      {/* Results Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {filteredEvents.length} events found
        </Typography>
      </Box>

      {/* Events Grid */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: 2.5 }}>
        {filteredEvents.map((event) => (
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
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                {event.title}
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <CalendarToday sx={{ fontSize: 16, mr: 1, color: '#666' }} />
                <Typography variant="body2" color="text.secondary">
                  {event.date}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <LocationOn sx={{ fontSize: 16, mr: 1, color: '#666' }} />
                <Typography variant="body2" color="text.secondary">
                  {event.location}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <People sx={{ fontSize: 16, mr: 1, color: '#666' }} />
                <Typography variant="body2" color="text.secondary">
                  {event.participants} participants
                </Typography>
              </Box>
              
              <Button
                fullWidth
                variant="contained"
                onClick={() => handleJoinEvent(event)}
                sx={{
                  bgcolor: '#ff6b35',
                  color: 'white',
                  fontWeight: 600,
                  py: 1,
                  borderRadius: 1.5,
                  '&:hover': { bgcolor: '#e55a2b' }
                }}
              >
                Join Event
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Join Event Modal */}
      <Dialog 
        open={joinModalOpen} 
        onClose={() => setJoinModalOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 2 }
        }}
      >
        <DialogTitle sx={{ fontWeight: 600, pb: 1 }}>
          Join Event
        </DialogTitle>
        <DialogContent>
          {selectedEvent && (
            <Box>
              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <Avatar
                  src={selectedEvent.image}
                  sx={{ width: 60, height: 60, borderRadius: 1 }}
                />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {selectedEvent.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    📅 {selectedEvent.date}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    📍 {selectedEvent.location}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    👥 {selectedEvent.participants} participants
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Are you sure you want to join this event? You'll be added to the participant list.
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button 
            onClick={() => setJoinModalOpen(false)}
            sx={{ color: '#666' }}
          >
            Cancel
          </Button>
          <Button 
            onClick={confirmJoinEvent}
            variant="contained"
            sx={{
              bgcolor: '#ff6b35',
              '&:hover': { bgcolor: '#e55a2b' }
            }}
          >
            Join Event
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EventsPage;