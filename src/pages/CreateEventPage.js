import React, { useState } from 'react';
import { Box, TextField, Button, Typography, AppBar, Toolbar, IconButton, Card, Grid, MenuItem, Chip, Avatar, Dialog } from '@mui/material';
import { ArrowBack, PhotoCamera, Event, LocationOn, People, Schedule, Close } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const CreateEventPage = () => {
  const navigate = useNavigate();
  const [event, setEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    endTime: '',
    location: '',
    venue: '',
    participants: '',
    category: '',
    budget: '',
    requirements: []
  });
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [requirementInput, setRequirementInput] = useState('');
  const [photoModalOpen, setPhotoModalOpen] = useState(false);

  const categories = ['Concert', 'Conference', 'Wedding', 'Corporate', 'Festival', 'Theater', 'Sports', 'Other'];

  const handleChange = (field) => (e) => {
    setEvent({ ...event, [field]: e.target.value });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedPhoto(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addRequirement = () => {
    if (requirementInput.trim() && !event.requirements.includes(requirementInput.trim())) {
      setEvent(prev => ({ ...prev, requirements: [...prev.requirements, requirementInput.trim()] }));
      setRequirementInput('');
    }
  };

  const removeRequirement = (index) => {
    setEvent({ ...event, requirements: event.requirements.filter((_, i) => i !== index) });
  };

  const handleCreate = () => {
    navigate('/main');
  };

  return (
    <Box>
      <AppBar position="static" sx={{ bgcolor: '#ff6b35' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate(-1)}>
            <ArrowBack />
          </IconButton>
          <Event sx={{ mr: 1 }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>Create Professional Event</Typography>
        </Toolbar>
      </AppBar>
      
      <Box sx={{ p: 3, bgcolor: '#fef7f0', minHeight: '100vh' }}>
        <Card sx={{ maxWidth: 800, mx: 'auto', p: 4, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#ff6b35', mb: 1, textAlign: 'center' }}>
            Create New Event
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, textAlign: 'center' }}>
            Fill in the details to create a professional event listing
          </Typography>

          {/* Photo Upload */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            {selectedPhoto ? (
              <Avatar
                src={selectedPhoto}
                onClick={() => setPhotoModalOpen(true)}
                sx={{ width: 120, height: 120, mx: 'auto', mb: 2, borderRadius: 2, cursor: 'pointer' }}
              />
            ) : (
              <Box sx={{ width: 120, height: 120, mx: 'auto', mb: 2, bgcolor: '#f5f5f5', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <PhotoCamera sx={{ fontSize: 40, color: '#ccc' }} />
              </Box>
            )}
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="event-photo-upload"
              type="file"
              onChange={handlePhotoUpload}
            />
            <label htmlFor="event-photo-upload">
              <Button variant="outlined" component="span" startIcon={<PhotoCamera />} sx={{ borderColor: '#ff6b35', color: '#ff6b35' }}>
                {selectedPhoto ? 'Change Photo' : 'Add Event Photo'}
              </Button>
            </label>
          </Box>

          <Grid container spacing={3}>
            {/* Basic Information */}
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#ff6b35' }}>Basic Information</Typography>
            </Grid>
            
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="Event Title"
                placeholder="Enter a compelling event title"
                value={event.title}
                onChange={handleChange('title')}
                required
              />
            </Grid>
            
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                select
                label="Category"
                value={event.category}
                onChange={handleChange('category')}
                required
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Event Description"
                multiline
                rows={4}
                placeholder="Describe your event in detail..."
                value={event.description}
                onChange={handleChange('description')}
                required
              />
            </Grid>

            {/* Date & Time */}
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#ff6b35', mt: 2 }}>Schedule</Typography>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Event Date"
                type="date"
                value={event.date}
                onChange={handleChange('date')}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Start Time"
                type="time"
                value={event.time}
                onChange={handleChange('time')}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="End Time"
                type="time"
                value={event.endTime}
                onChange={handleChange('endTime')}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            {/* Location */}
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#ff6b35', mt: 2 }}>Location</Typography>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="City/Location"
                placeholder="e.g., New York, NY"
                value={event.location}
                onChange={handleChange('location')}
                required
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Venue Name"
                placeholder="e.g., Madison Square Garden"
                value={event.venue}
                onChange={handleChange('venue')}
              />
            </Grid>

            {/* Event Details */}
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#ff6b35', mt: 2 }}>Event Details</Typography>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Expected Participants"
                type="number"
                placeholder="Number of attendees"
                value={event.participants}
                onChange={handleChange('participants')}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Budget Range"
                placeholder="e.g., $5,000 - $10,000"
                value={event.budget}
                onChange={handleChange('budget')}
              />
            </Grid>

            {/* Requirements */}
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#ff6b35', mt: 2 }}>Crew Requirements</Typography>
              <Box sx={{ mb: 2 }}>
                {event.requirements.map((req, index) => (
                  <Chip
                    key={index}
                    label={req}
                    onDelete={() => removeRequirement(index)}
                    sx={{ mr: 1, mb: 1, bgcolor: '#fff3e0' }}
                  />
                ))}
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  fullWidth
                  label="Add Requirement"
                  placeholder="e.g., Sound Engineer, Lighting Technician"
                  value={requirementInput}
                  onChange={(e) => setRequirementInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addRequirement()}
                />
                <Button
                  variant="outlined"
                  onClick={addRequirement}
                  sx={{ borderColor: '#ff6b35', color: '#ff6b35', minWidth: 100 }}
                >
                  Add
                </Button>
              </Box>
            </Grid>

            {/* Action Buttons */}
            <Grid item xs={12} sx={{ mt: 3 }}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate(-1)}
                  sx={{ px: 4, py: 1.5, borderColor: '#ccc', color: '#666' }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={handleCreate}
                  sx={{ px: 4, py: 1.5, bgcolor: '#ff6b35', '&:hover': { bgcolor: '#e55a2b' } }}
                >
                  Create Event
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Box>

      {/* Photo View Modal */}
      <Dialog 
        open={photoModalOpen} 
        onClose={() => setPhotoModalOpen(false)} 
        maxWidth="md"
        PaperProps={{
          sx: { borderRadius: 2 }
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <IconButton
            onClick={() => setPhotoModalOpen(false)}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              bgcolor: 'rgba(0,0,0,0.5)',
              color: 'white',
              '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' }
            }}
          >
            <Close />
          </IconButton>
          <img 
            src={selectedPhoto} 
            alt="Event" 
            style={{ width: '100%', height: 'auto', borderRadius: 8 }} 
          />
        </Box>
      </Dialog>
    </Box>
  );
};

export default CreateEventPage;