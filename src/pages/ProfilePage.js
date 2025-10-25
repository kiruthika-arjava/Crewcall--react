import React, { useState } from 'react';
import { Box, Typography, AppBar, Toolbar, Avatar, Button, List, ListItem, ListItemIcon, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions, Card } from '@mui/material';
import { Person, PhotoCamera, LocationOn, SwapHoriz, Logout, Payment } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [switchAccountDialog, setSwitchAccountDialog] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);

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
        setSelectedPhoto(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Profile
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Box sx={{ p: 3, maxWidth: 400, mx: 'auto' }}>
        <Card sx={{ p: 3, borderRadius: 2 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Avatar
            sx={{
              width: 100,
              height: 100,
              bgcolor: 'primary.main',
              mx: 'auto',
              mb: 2,
              cursor: selectedPhoto ? 'pointer' : 'default'
            }}
            src={selectedPhoto}
            onClick={() => selectedPhoto && setImageDialogOpen(true)}
          >
            {!selectedPhoto && <Person sx={{ fontSize: 50 }} />}
          </Avatar>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="profile-photo-upload"
            type="file"
            onChange={handlePhotoUpload}
          />
          <label htmlFor="profile-photo-upload">
            <Button startIcon={<PhotoCamera />} variant="outlined" size="small" component="span">
              Upload Photo
            </Button>
          </label>
          <Typography variant="h5" sx={{ mt: 2 }}>
            John Doe
          </Typography>
          <Typography variant="body1" color="text.secondary">
            john.doe@example.com
          </Typography>
        </Box>

        <List>
          <ListItem button>
            <ListItemIcon>
              <LocationOn />
            </ListItemIcon>
            <ListItemText primary="Location Settings" secondary="New York, NY" />
          </ListItem>
          
          <ListItem button onClick={() => setSwitchAccountDialog(true)}>
            <ListItemIcon>
              <SwapHoriz />
            </ListItemIcon>
            <ListItemText primary="Switch Account" />
          </ListItem>
          
          <ListItem button>
            <ListItemIcon>
              <Payment />
            </ListItemIcon>
            <ListItemText primary="Payment Settings" />
          </ListItem>
          
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Log Out" />
          </ListItem>
        </List>
        </Card>
      </Box>

      <Dialog open={switchAccountDialog} onClose={() => setSwitchAccountDialog(false)}>
        <DialogTitle>Switch Account</DialogTitle>
        <DialogContent>
          <Typography>What would you like to do?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSwitchAccountDialog(false)}>Cancel</Button>
          <Button onClick={() => { setSwitchAccountDialog(false); navigate('/signup'); }}>Create Account</Button>
          <Button onClick={handleSwitchAccount}>Login Different</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={imageDialogOpen} onClose={() => setImageDialogOpen(false)} maxWidth="md">
        <img src={selectedPhoto} alt="Profile" style={{ width: '100%', height: 'auto' }} />
      </Dialog>
    </Box>
  );
};

export default ProfilePage;