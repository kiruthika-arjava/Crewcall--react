import React, { useState } from 'react';
import { Box, TextField, Button, Typography, AppBar, Toolbar, Avatar, Chip, Card, Dialog } from '@mui/material';
import { Person, PhotoCamera } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const TalentProfileSetup = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    bio: '',
    skills: [],
    experience: '',
    location: ''
  });
  const [skillInput, setSkillInput] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);

  const handleChange = (field) => (e) => {
    setProfile({ ...profile, [field]: e.target.value });
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

  const addSkill = () => {
    console.log('Adding skill:', skillInput);
    if (skillInput.trim()) {
      const newSkills = [...profile.skills, skillInput.trim()];
      console.log('New skills array:', newSkills);
      setProfile({ ...profile, skills: newSkills });
      setSkillInput('');
    }
  };

  const removeSkill = (index) => {
    setProfile({ ...profile, skills: profile.skills.filter((_, i) => i !== index) });
  };

  const handleComplete = () => {
    navigate('/main');
  };

  return (
    <Box>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6">Complete Your Profile</Typography>
        </Toolbar>
      </AppBar>
      
      <Box sx={{ p: 3, maxWidth: 600, mx: 'auto', bgcolor: 'grey.50', minHeight: '100vh' }}>
        <Card sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h5" textAlign="center" gutterBottom>
            Complete Your Profile
          </Typography>
          <Typography variant="body2" textAlign="center" color="text.secondary" sx={{ mb: 3 }}>
            Tell us about yourself and your skills
          </Typography>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Avatar 
            sx={{ width: 100, height: 100, mx: 'auto', mb: 2, bgcolor: 'primary.main', cursor: selectedPhoto ? 'pointer' : 'default' }}
            src={selectedPhoto}
            onClick={() => selectedPhoto && setImageDialogOpen(true)}
          >
            {!selectedPhoto && <Person sx={{ fontSize: 50 }} />}
          </Avatar>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="photo-upload"
            type="file"
            onChange={handlePhotoUpload}
          />
          <label htmlFor="photo-upload">
            <Button startIcon={<PhotoCamera />} variant="outlined" component="span">
              Upload Photo
            </Button>
          </label>
        </Box>

        <TextField
          fullWidth
          label="Bio"
          multiline
          rows={3}
          value={profile.bio}
          onChange={handleChange('bio')}
          sx={{ mb: 2 }}
        />

        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" gutterBottom>Skills ({profile.skills.length})</Typography>
          {profile.skills.map((skill, index) => (
            <Chip
              key={index}
              label={`${index + 1}. ${skill}`}
              onDelete={() => removeSkill(index)}
              sx={{ mr: 1, mb: 1 }}
            />
          ))}
          <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              label="Add New Skill"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addSkill()}
            />
            <Button onClick={addSkill} variant="outlined">
              Add
            </Button>
          </Box>
        </Box>

        <TextField
          fullWidth
          label="Experience"
          multiline
          rows={2}
          value={profile.experience}
          onChange={handleChange('experience')}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Location"
          value={profile.location}
          onChange={handleChange('location')}
          sx={{ mb: 3 }}
        />

        <Button
          fullWidth
          variant="contained"
          onClick={handleComplete}
          sx={{ py: 1.5 }}
        >
          Complete Setup
        </Button>
        </Card>
      </Box>
      
      <Dialog open={imageDialogOpen} onClose={() => setImageDialogOpen(false)} maxWidth="md">
        <img src={selectedPhoto} alt="Profile" style={{ width: '100%', height: 'auto' }} />
      </Dialog>
    </Box>
  );
};

export default TalentProfileSetup;