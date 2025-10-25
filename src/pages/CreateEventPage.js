import React, { useState } from 'react';
import { Box, TextField, Button, Typography, AppBar, Toolbar, IconButton } from '@mui/material';
import { ArrowBack, PhotoCamera } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const CreateEventPage = () => {
  const navigate = useNavigate();
  const [event, setEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    participants: ''
  });

  const handleChange = (field) => (e) => {
    setEvent({ ...event, [field]: e.target.value });
  };

  const handleCreate = () => {
    navigate('/main');
  };

  return (
    <Box>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate(-1)}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h6">Create Event</Typography>
        </Toolbar>
      </AppBar>
      
      <Box sx={{ p: 3, maxWidth: 400, mx: 'auto' }}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Button
            variant="outlined"
            startIcon={<PhotoCamera />}
            sx={{ mb: 2 }}
          >
            Add Event Photo
          </Button>
        </Box>

        <TextField
          fullWidth
          label="Event Title"
          value={event.title}
          onChange={handleChange('title')}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Description"
          multiline
          rows={3}
          value={event.description}
          onChange={handleChange('description')}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Date"
          type="date"
          value={event.date}
          onChange={handleChange('date')}
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Time"
          type="time"
          value={event.time}
          onChange={handleChange('time')}
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Location"
          value={event.location}
          onChange={handleChange('location')}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Max Participants"
          type="number"
          value={event.participants}
          onChange={handleChange('participants')}
          sx={{ mb: 3 }}
        />

        <Button
          fullWidth
          variant="contained"
          onClick={handleCreate}
          sx={{ py: 1.5 }}
        >
          Create Event
        </Button>
      </Box>
    </Box>
  );
};

export default CreateEventPage;