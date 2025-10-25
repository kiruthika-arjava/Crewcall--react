import React, { useState } from 'react';
import { Box, Typography, Button, AppBar, Toolbar, IconButton, Card, CardContent, Chip, TextField } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const TalentDetailPage = () => {
  const navigate = useNavigate();
  const [showBooking, setShowBooking] = useState(false);
  const [booking, setBooking] = useState({
    date: '',
    time: '',
    compensation: '',
    notes: ''
  });

  const talent = {
    name: 'John Smith',
    image: 'https://picsum.photos/400/300?random=5',
    bio: 'Professional photographer with 5+ years experience',
    skills: ['Photography', 'Video Editing', 'Lighting'],
    experience: '5+ years in event photography',
    location: 'New York, NY'
  };

  const handleBooking = () => {
    setShowBooking(false);
    navigate('/main');
  };

  return (
    <Box>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate(-1)}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h6">Talent Details</Typography>
        </Toolbar>
      </AppBar>

      <Box>
        <Box
          sx={{
            height: 200,
            backgroundImage: `url(${talent.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />

        <Box sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>{talent.name}</Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            {talent.bio}
          </Typography>

          <Typography variant="h6" gutterBottom>Skills</Typography>
          <Box sx={{ mb: 2 }}>
            {talent.skills.map((skill, index) => (
              <Chip key={index} label={skill} sx={{ mr: 1, mb: 1 }} />
            ))}
          </Box>

          <Typography variant="h6" gutterBottom>Experience</Typography>
          <Typography variant="body2" paragraph>{talent.experience}</Typography>

          <Typography variant="h6" gutterBottom>Location</Typography>
          <Typography variant="body2" paragraph>{talent.location}</Typography>

          {!showBooking ? (
            <Button
              fullWidth
              variant="contained"
              onClick={() => setShowBooking(true)}
              sx={{ py: 1.5 }}
            >
              Book This Talent
            </Button>
          ) : (
            <Card sx={{ mt: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Book {talent.name}</Typography>
                <TextField
                  fullWidth
                  label="Date"
                  type="date"
                  value={booking.date}
                  onChange={(e) => setBooking({ ...booking, date: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Time"
                  type="time"
                  value={booking.time}
                  onChange={(e) => setBooking({ ...booking, time: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Compensation"
                  value={booking.compensation}
                  onChange={(e) => setBooking({ ...booking, compensation: e.target.value })}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Additional Notes"
                  multiline
                  rows={2}
                  value={booking.notes}
                  onChange={(e) => setBooking({ ...booking, notes: e.target.value })}
                  sx={{ mb: 2 }}
                />
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleBooking}
                  sx={{ py: 1.5 }}
                >
                  Confirm Booking
                </Button>
              </CardContent>
            </Card>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default TalentDetailPage;