import React, { useState, useEffect } from 'react';
import { Box, Typography, Avatar, Button, List, ListItem, ListItemIcon, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions, Card, Chip, TextField } from '@mui/material';
import { Person, PhotoCamera, LocationOn, SwapHoriz, Logout, Payment } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [switchAccountDialog, setSwitchAccountDialog] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [locationDialogOpen, setLocationDialogOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('New York, NY');
  const [newLocation, setNewLocation] = useState('');
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('**** **** **** 1234');
  const [newPaymentMethod, setNewPaymentMethod] = useState('');
  const [userData, setUserData] = useState({ name: 'John Doe', email: 'john.doe@example.com', userType: 'talent' });

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const data = JSON.parse(storedUserData);
      setUserData(data);
      if (data.profilePhoto) {
        setSelectedPhoto(data.profilePhoto);
      }
      if (data.location) {
        setCurrentLocation(data.location);
      }
    }
  }, []);

  const handleSwitchAccount = () => {
    setSwitchAccountDialog(false);
    navigate('/welcome');
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/welcome');
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const photoData = event.target.result;
        setSelectedPhoto(photoData);
        // Update stored user data with new photo
        const updatedUserData = { ...userData, profilePhoto: photoData };
        setUserData(updatedUserData);
        localStorage.setItem('userData', JSON.stringify(updatedUserData));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLocationEdit = () => {
    setNewLocation(currentLocation);
    setLocationDialogOpen(true);
  };

  const handleLocationSave = () => {
    setCurrentLocation(newLocation);
    // Update stored user data with new location
    const updatedUserData = { ...userData, location: newLocation };
    setUserData(updatedUserData);
    localStorage.setItem('userData', JSON.stringify(updatedUserData));
    setLocationDialogOpen(false);
  };

  const handlePaymentEdit = () => {
    setNewPaymentMethod('');
    setPaymentDialogOpen(true);
  };

  const handlePaymentSave = () => {
    if (newPaymentMethod.length >= 16) {
      const masked = '**** **** **** ' + newPaymentMethod.slice(-4);
      setPaymentMethod(masked);
    }
    setPaymentDialogOpen(false);
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1400, mx: 'auto', minHeight: '100vh', bgcolor: '#fef7f0' }}>
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
          👤 Profile
        </Typography>
      </Box>

      <Box sx={{ maxWidth: 600, mx: 'auto' }}>
        {/* Profile Card */}
        <Card sx={{ 
          p: 4, 
          borderRadius: 2, 
          mb: 3,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Avatar
              sx={{
                width: 120,
                height: 120,
                bgcolor: '#ff6b35',
                mx: 'auto',
                mb: 2,
                cursor: selectedPhoto ? 'pointer' : 'default',
                boxShadow: '0 4px 12px rgba(255,107,53,0.3)'
              }}
              src={selectedPhoto}
              onClick={() => selectedPhoto && setImageDialogOpen(true)}
            >
              {!selectedPhoto && <Person sx={{ fontSize: 60 }} />}
            </Avatar>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="profile-photo-upload"
              type="file"
              onChange={handlePhotoUpload}
            />
            <label htmlFor="profile-photo-upload">
              <Button 
                startIcon={<PhotoCamera />} 
                variant="outlined" 
                component="span"
                sx={{
                  borderColor: '#ff6b35',
                  color: '#ff6b35',
                  '&:hover': { 
                    borderColor: '#e55a2b',
                    bgcolor: 'rgba(255,107,53,0.1)'
                  }
                }}
              >
                Upload Photo
              </Button>
            </label>
            <Typography variant="h4" sx={{ mt: 3, fontWeight: 600 }}>
              {userData.name}
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
              {userData.email}
            </Typography>
            {userData.phone && (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {userData.phone}
              </Typography>
            )}
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap', mb: 2 }}>
              <Chip 
                label={userData.userType === 'talent' ? 'Talent' : 'Organiser'} 
                sx={{ 
                  bgcolor: '#ff6b35', 
                  color: 'white',
                  fontWeight: 500
                }} 
              />
              {userData.roleInOrganization && (
                <Chip 
                  label={userData.roleInOrganization} 
                  sx={{ 
                    bgcolor: '#2196f3', 
                    color: 'white',
                    fontWeight: 500
                  }} 
                />
              )}
            </Box>
            {userData.bio && (
              <Typography variant="body2" sx={{ mt: 2, fontStyle: 'italic', textAlign: 'center' }}>
                {userData.bio}
              </Typography>
            )}
            {userData.skills && userData.skills.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>Skills:</Typography>
                <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center', flexWrap: 'wrap' }}>
                  {userData.skills.map((skill, index) => (
                    <Chip 
                      key={index}
                      label={skill} 
                      size="small"
                      sx={{ 
                        bgcolor: '#f5f5f5',
                        fontSize: '0.75rem'
                      }} 
                    />
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        </Card>

        {/* Settings Card */}
        <Card sx={{ 
          borderRadius: 2,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <List sx={{ p: 0 }}>
            <ListItem 
              button 
              onClick={handleLocationEdit}
              sx={{
                py: 2,
                '&:hover': { bgcolor: 'rgba(255,107,53,0.05)' }
              }}
            >
              <ListItemIcon sx={{ color: '#ff6b35' }}>
                <LocationOn />
              </ListItemIcon>
              <ListItemText 
                primary="Location Settings" 
                secondary={currentLocation}
                primaryTypographyProps={{ fontWeight: 500 }}
              />
            </ListItem>
            
            <ListItem 
              button 
              onClick={() => setSwitchAccountDialog(true)}
              sx={{
                py: 2,
                '&:hover': { bgcolor: 'rgba(255,107,53,0.05)' }
              }}
            >
              <ListItemIcon sx={{ color: '#ff6b35' }}>
                <SwapHoriz />
              </ListItemIcon>
              <ListItemText 
                primary="Switch Account" 
                primaryTypographyProps={{ fontWeight: 500 }}
              />
            </ListItem>
            
            <ListItem 
              button
              onClick={handlePaymentEdit}
              sx={{
                py: 2,
                '&:hover': { bgcolor: 'rgba(255,107,53,0.05)' }
              }}
            >
              <ListItemIcon sx={{ color: '#ff6b35' }}>
                <Payment />
              </ListItemIcon>
              <ListItemText 
                primary="Payment Settings" 
                secondary={paymentMethod}
                primaryTypographyProps={{ fontWeight: 500 }}
              />
            </ListItem>
            
            <ListItem 
              button 
              onClick={handleLogout}
              sx={{
                py: 2,
                '&:hover': { bgcolor: 'rgba(244,67,54,0.05)' }
              }}
            >
              <ListItemIcon sx={{ color: '#f44336' }}>
                <Logout />
              </ListItemIcon>
              <ListItemText 
                primary="Log Out" 
                primaryTypographyProps={{ fontWeight: 500, color: '#f44336' }}
              />
            </ListItem>
          </List>
        </Card>
      </Box>

      <Dialog 
        open={switchAccountDialog} 
        onClose={() => setSwitchAccountDialog(false)}
        PaperProps={{
          sx: { borderRadius: 2, p: 1 }
        }}
      >
        <DialogTitle sx={{ fontWeight: 600 }}>Switch Account</DialogTitle>
        <DialogContent>
          <Typography>What would you like to do?</Typography>
        </DialogContent>
        <DialogActions sx={{ gap: 1 }}>
          <Button 
            onClick={() => setSwitchAccountDialog(false)}
            sx={{ color: '#666' }}
          >
            Cancel
          </Button>
          <Button 
            onClick={() => { setSwitchAccountDialog(false); navigate('/signup'); }}
            variant="outlined"
            sx={{
              borderColor: '#ff6b35',
              color: '#ff6b35',
              '&:hover': { borderColor: '#e55a2b', bgcolor: 'rgba(255,107,53,0.1)' }
            }}
          >
            Create Account
          </Button>
          <Button 
            onClick={handleSwitchAccount}
            variant="contained"
            sx={{
              bgcolor: '#ff6b35',
              '&:hover': { bgcolor: '#e55a2b' }
            }}
          >
            Login Different
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog 
        open={imageDialogOpen} 
        onClose={() => setImageDialogOpen(false)} 
        maxWidth="md"
        PaperProps={{
          sx: { borderRadius: 2 }
        }}
      >
        <img src={selectedPhoto} alt="Profile" style={{ width: '100%', height: 'auto', borderRadius: 8 }} />
      </Dialog>

      {/* Location Edit Dialog */}
      <Dialog 
        open={locationDialogOpen} 
        onClose={() => setLocationDialogOpen(false)}
        PaperProps={{
          sx: { borderRadius: 2, p: 1 }
        }}
      >
        <DialogTitle sx={{ fontWeight: 600 }}>Edit Location</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Location"
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
            placeholder="Enter your city, state"
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions sx={{ gap: 1 }}>
          <Button 
            onClick={() => setLocationDialogOpen(false)}
            sx={{ color: '#666' }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleLocationSave}
            variant="contained"
            sx={{
              bgcolor: '#ff6b35',
              '&:hover': { bgcolor: '#e55a2b' }
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Payment Settings Dialog */}
      <Dialog 
        open={paymentDialogOpen} 
        onClose={() => setPaymentDialogOpen(false)}
        PaperProps={{
          sx: { borderRadius: 2, p: 1 }
        }}
      >
        <DialogTitle sx={{ fontWeight: 600 }}>Payment Settings</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Card Number"
            value={newPaymentMethod}
            onChange={(e) => setNewPaymentMethod(e.target.value.replace(/\D/g, ''))}
            placeholder="1234 5678 9012 3456"
            inputProps={{ maxLength: 16 }}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions sx={{ gap: 1 }}>
          <Button 
            onClick={() => setPaymentDialogOpen(false)}
            sx={{ color: '#666' }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handlePaymentSave}
            variant="contained"
            sx={{
              bgcolor: '#ff6b35',
              '&:hover': { bgcolor: '#e55a2b' }
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProfilePage;