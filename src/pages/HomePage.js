import React, { useState } from 'react';
import { Box, Typography, AppBar, Toolbar, TextField, Card, CardContent, CardMedia, Chip, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const talents = [
    {
      id: 1,
      name: 'John Smith',
      skills: ['Photography', 'Video'],
      location: 'New York, NY',
      image: 'https://picsum.photos/200/150?random=10',
      rating: 4.8,
      level: 'Expert'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      skills: ['DJ', 'Sound Engineer'],
      location: 'Brooklyn, NY',
      image: 'https://picsum.photos/200/150?random=11',
      rating: 4.9,
      level: 'Expert'
    },
    {
      id: 3,
      name: 'Mike Davis',
      skills: ['Lighting', 'Stage Setup'],
      location: 'Manhattan, NY',
      image: 'https://picsum.photos/200/150?random=12',
      rating: 4.7,
      level: 'Intermediate'
    },
    {
      id: 4,
      name: 'Emma Wilson',
      skills: ['Photography', 'Editing'],
      location: 'Queens, NY',
      image: 'https://picsum.photos/200/150?random=13',
      rating: 4.6,
      level: 'Intermediate'
    },
    {
      id: 5,
      name: 'Alex Chen',
      skills: ['DJ', 'Music Production'],
      location: 'Bronx, NY',
      image: 'https://picsum.photos/200/150?random=14',
      rating: 4.8,
      level: 'Expert'
    },
    {
      id: 6,
      name: 'Lisa Garcia',
      skills: ['Lighting', 'Event Planning'],
      location: 'Staten Island, NY',
      image: 'https://picsum.photos/200/150?random=15',
      rating: 4.5,
      level: 'Beginner'
    },
    {
      id: 7,
      name: 'David Brown',
      skills: ['Sound Engineer', 'Audio Tech'],
      location: 'Long Island, NY',
      image: 'https://picsum.photos/200/150?random=16',
      rating: 4.9,
      level: 'Expert'
    },
    {
      id: 8,
      name: 'Maria Rodriguez',
      skills: ['Video', 'Drone Operator'],
      location: 'New York, NY',
      image: 'https://picsum.photos/200/150?random=17',
      rating: 4.7,
      level: 'Intermediate'
    }
  ];

  const filteredTalents = talents.filter(talent =>
    talent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    talent.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Box>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Find Talents
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Box sx={{ p: 2, maxWidth: 1000, mx: 'auto' }}>
        <TextField
          fullWidth
          placeholder="Search talents or skills..."
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
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" gutterBottom>Popular Skills</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {['Photography', 'DJ', 'Lighting', 'Video', 'Sound Engineer', 'Stage Setup'].map((skill) => (
              <Chip
                key={skill}
                label={skill}
                onClick={() => setSearchTerm(skill)}
                sx={{ cursor: 'pointer' }}
                variant={searchTerm === skill ? 'filled' : 'outlined'}
              />
            ))}
          </Box>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 2 }}>
          {filteredTalents.map((talent) => (
            <Card 
              key={talent.id} 
              sx={{ cursor: 'pointer', borderRadius: 2, overflow: 'hidden' }}
              onClick={() => navigate('/talent-detail')}
            >
              <CardMedia
                component="img"
                height="200"
                image={talent.image}
                alt={talent.name}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>{talent.name}</Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  📍 {talent.location}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  {talent.skills.map((skill, index) => (
                    <Chip key={index} label={skill} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
                  ))}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="primary">
                    ⭐ {talent.rating}
                  </Typography>
                  <Chip 
                    label={talent.level} 
                    size="small" 
                    color={talent.level === 'Expert' ? 'success' : talent.level === 'Intermediate' ? 'warning' : 'default'}
                  />
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;