import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, TextField, Button, Grid, Chip, Avatar, IconButton } from '@mui/material';
import { ArrowBack, CalendarToday, AccessTime, LocationOn, MyLocation } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const BookingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { talent } = location.state || {};
  
  const [bookingData, setBookingData] = useState({
    eventName: '',
    eventDate: '',
    startTime: '',
    endTime: '',
    location: '',
    description: '',
    budget: ''
  });

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      handleInputChange('location', 'Getting current location...');
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            const address = data.display_name || `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
            handleInputChange('location', address);
          } catch (error) {
            handleInputChange('location', `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
          }
        },
        (error) => {
          handleInputChange('location', '');
          alert('Unable to get current location. Please enter manually.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handleInputChange = (field, value) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
  };

  const handleBooking = () => {
    console.log('Booking submitted:', { talent, ...bookingData });
    // Add booking logic here
    alert(`Booking request sent to ${talent?.name}!`);
    navigate('/main');
  };

  if (!talent) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6">No talent selected</Typography>
        <Button onClick={() => navigate('/main')} sx={{ mt: 2 }}>
          Go Back to Home
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate('/main')}
        sx={{ mb: 3, color: '#ff6b35' }}
      >
        Back to Talents
      </Button>

      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Book {talent.name}
      </Typography>

      {/* Talent Summary */}
      <Card sx={{ mb: 3, p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            src={talent.image}
            sx={{ width: 80, height: 80 }}
          />
          <Box>
            <Typography variant="h6">{talent.name}</Typography>
            <Typography color="text.secondary">{talent.location}</Typography>
            <Box sx={{ mt: 1 }}>
              {talent.skills.map((skill, index) => (
                <Chip key={index} label={skill} size="small" sx={{ mr: 0.5 }} />
              ))}
            </Box>
          </Box>
        </Box>
      </Card>

      {/* Booking Form */}
      <Card sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 3 }}>Event Details</Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Event Name"
              value={bookingData.eventName}
              onChange={(e) => handleInputChange('eventName', e.target.value)}
              required
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Event Date"
              type="date"
              value={bookingData.eventDate}
              onChange={(e) => handleInputChange('eventDate', e.target.value)}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: <CalendarToday sx={{ mr: 1, color: '#666' }} />
              }}
              required
            />
          </Grid>
          
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Start Time"
              type="time"
              value={bookingData.startTime}
              onChange={(e) => handleInputChange('startTime', e.target.value)}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="End Time"
              type="time"
              value={bookingData.endTime}
              onChange={(e) => handleInputChange('endTime', e.target.value)}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Event Location"
              value={bookingData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="Enter event address or click 📍 to use current location"
              InputProps={{
                startAdornment: <LocationOn sx={{ mr: 1, color: '#666' }} />,
                endAdornment: (
                  <IconButton
                    onClick={getCurrentLocation}
                    size="small"
                    sx={{ color: '#ff6b35' }}
                    title="Use Current Location"
                  >
                    <MyLocation />
                  </IconButton>
                )
              }}
              required
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Budget ($)"
              type="number"
              value={bookingData.budget}
              onChange={(e) => handleInputChange('budget', e.target.value)}
              required
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Event Description"
              multiline
              rows={4}
              value={bookingData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe your event and what you need from the talent..."
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            onClick={() => navigate('/main')}
            sx={{ flex: 1 }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleBooking}
            sx={{
              flex: 1,
              bgcolor: '#ff6b35',
              '&:hover': { bgcolor: '#e55a2b' }
            }}
          >
            Send Booking Request
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default BookingPage;