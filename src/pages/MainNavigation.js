import React, { useState, useEffect } from 'react';
import { Box, BottomNavigation, BottomNavigationAction, Fab } from '@mui/material';
import { Home, Event, Person, Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import HomePage from './HomePage';
import EventsPage from './EventsPage';
import ProfilePage from './ProfilePage';

const MainNavigation = ({ fromLogin = false }) => {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [userType, setUserType] = useState('talent');

  useEffect(() => {
    const savedIndex = localStorage.getItem('selectedIndex');
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    setUserType(userData.userType || 'talent');
    
    if (fromLogin) {
      setSelectedIndex(0);
      localStorage.setItem('selectedIndex', '0');
    } else {
      setSelectedIndex(savedIndex ? parseInt(savedIndex) : 0);
    }
  }, [fromLogin]);

  const handleChange = (event, newValue) => {
    setSelectedIndex(newValue);
    localStorage.setItem('selectedIndex', newValue.toString());
  };

  const pages = [
    <HomePage key="home" />,
    <EventsPage key="events" />,
    <ProfilePage key="profile" />,
  ];

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        {pages[selectedIndex]}
      </Box>

      <BottomNavigation
        value={selectedIndex}
        onChange={handleChange}
        sx={{ borderTop: 1, borderColor: 'divider' }}
      >
        <BottomNavigationAction label="Home" icon={<Home />} />
        <BottomNavigationAction label="Events" icon={<Event />} />
        <BottomNavigationAction label="Profile" icon={<Person />} />
      </BottomNavigation>

      {selectedIndex === 1 && userType === 'organiser' && (
        <Fab
          color="primary"
          sx={{
            position: 'fixed',
            bottom: 80,
            right: 16,
          }}
          onClick={() => navigate('/create-event')}
        >
          <Add />
        </Fab>
      )}
    </Box>
  );
};

export default MainNavigation;