import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Chip, MenuItem, Select, FormControl, TextField, InputAdornment, Button, Modal, Avatar, IconButton } from '@mui/material';
import { Star, Search, Close } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [sortBy, setSortBy] = useState('Name');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTalent, setSelectedTalent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleCardClick = (member) => {
    setSelectedTalent(member);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedTalent(null);
  };

  const crewMembers = [
    {
      id: 1,
      name: 'Alex Chen',
      location: 'Los Angeles, CA',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=face',
      rating: 4.8,
      reviewCount: 34,
      level: 'Expert',
      skills: ['Lighting Design', 'Stage Management'],
      description: 'Professional lighting designer with 8+ years experience in concerts and theater productions.'
    },
    {
      id: 2,
      name: 'David Kim',
      location: 'Seattle, WA',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop&crop=face',
      rating: 4.5,
      reviewCount: 28,
      level: 'Intermediate',
      skills: ['Stage Management', 'Audio Systems'],
      description: 'Stage manager with strong organizational skills and attention to detail for large-scale events.'
    },
    {
      id: 3,
      name: 'Emma Wilson',
      location: 'Miami, FL',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=300&fit=crop&crop=face',
      rating: 4.9,
      reviewCount: 45,
      level: 'Expert',
      skills: ['Photography', 'Live Streaming'],
      description: 'Award-winning photographer with expertise in event and portrait photography for major brands.'
    },
    {
      id: 4,
      name: 'Sarah Johnson',
      location: 'New York, NY',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop&crop=face',
      rating: 4.7,
      reviewCount: 52,
      level: 'Expert',
      skills: ['Sound Engineering', 'Audio Systems'],
      description: 'Professional sound engineer specializing in live events and concert productions.'
    },
    {
      id: 5,
      name: 'Mike Davis',
      location: 'Austin, TX',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=300&fit=crop&crop=face',
      rating: 4.6,
      reviewCount: 31,
      level: 'Intermediate',
      skills: ['Video Production', 'Live Streaming'],
      description: 'Creative video producer with experience in multi-camera live event coverage.'
    },
    {
      id: 6,
      name: 'Lisa Garcia',
      location: 'Chicago, IL',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=300&fit=crop&crop=face',
      rating: 4.4,
      reviewCount: 19,
      level: 'Beginner',
      skills: ['Photography', 'Stage Management'],
      description: 'Emerging talent with fresh perspective and dedication to professional growth.'
    }
  ];

  const categories = ['All', 'Lighting Design', 'Sound Engineering', 'Video Production', 'Photography', 'Stage Management', 'Audio Systems', 'Live Streaming'];
  const levels = ['All', 'Beginner', 'Intermediate', 'Expert'];

  const filteredMembers = crewMembers.filter(member => {
    const searchMatch = searchTerm === '' || 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
      member.location.toLowerCase().includes(searchTerm.toLowerCase());
    const categoryMatch = selectedCategory === 'All' || member.skills.includes(selectedCategory);
    const levelMatch = selectedLevel === 'All' || member.level === selectedLevel;
    return searchMatch && categoryMatch && levelMatch;
  });

  const sortedMembers = [...filteredMembers].sort((a, b) => {
    if (sortBy === 'Name') return a.name.localeCompare(b.name);
    if (sortBy === 'Rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <Box sx={{ p: 3, maxWidth: 1350, mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h3" 
          sx={{ 
            fontWeight: 700, 
            color: 'black', 
            mb: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 2
          }}
        >
          <img 
            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iOCIgZmlsbD0iI0ZGNTczMyIvPgo8IS0tIEhlYWRzZXQgaGVhZGJhbmQgLS0+CjxwYXRoIGQ9Ik0xMCAxOEMxMCAxMS45MjUgMTQuOTI1IDcgMjEgN0MyNy4wNzUgNyAzMiAxMS45MjUgMzIgMThIMzBDMzAgMTMuMDI5IDI1Ljk3MSA5IDIxIDlDMTYuMDI5IDkgMTIgMTMuMDI5IDEyIDE4SDEwWiIgZmlsbD0id2hpdGUiLz4KPCEtLSBMZWZ0IGVhcnBpZWNlIC0tPgo8cmVjdCB4PSI3IiB5PSIxNyIgd2lkdGg9IjUiIGhlaWdodD0iMTAiIHJ4PSIyLjUiIGZpbGw9IndoaXRlIi8+CjwhLS0gUmlnaHQgZWFycGllY2UgLS0+CjxyZWN0IHg9IjI4IiB5PSIxNyIgd2lkdGg9IjUiIGhlaWdodD0iMTAiIHJ4PSIyLjUiIGZpbGw9IndoaXRlIi8+CjwhLS0gTWljcm9waG9uZSBib29tIC0tPgo8cGF0aCBkPSJNMTIgMjVIMjBWMjdIMTJWMjVaIiBmaWxsPSJ3aGl0ZSIvPgo8IS0tIE1pY3JvcGhvbmUgLS0+CjxlbGxpcHNlIGN4PSIyMiIgY3k9IjI5IiByeD0iMyIgcnk9IjIiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPg==" 
            alt="CrewCall Logo" 
            style={{ width: '55px', height: '50px' }}
          />
          CrewCall
        </Typography>
        <Typography 
          variant="h6" 
          color="text.secondary"
          sx={{ fontWeight: 400 }}
        >
          Find and book professional crew members for your events
        </Typography>
      </Box>

      {/* Search Box */}
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search crew members, skills, or locations..."
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

      {/* Category Filter */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          {categories.map((category) => (
            <Chip
              key={category}
              label={category}
              onClick={() => setSelectedCategory(category)}
              sx={{
                cursor: 'pointer',
                bgcolor: selectedCategory === category ? '#ff6b35' : '#f5f5f5',
                color: selectedCategory === category ? 'white' : '#666',
                '&:hover': { bgcolor: selectedCategory === category ? '#e55a2b' : '#e0e0e0' }
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Level Filter */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {levels.map((level) => (
            <Chip
              key={level}
              label={level}
              onClick={() => setSelectedLevel(level)}
              sx={{
                cursor: 'pointer',
                bgcolor: selectedLevel === level ? '#ff6b35' : '#f5f5f5',
                color: selectedLevel === level ? 'white' : '#666',
                '&:hover': { bgcolor: selectedLevel === level ? '#e55a2b' : '#e0e0e0' }
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Results Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {sortedMembers.length} crew members found
        </Typography>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            displayEmpty
            sx={{ bgcolor: 'white' }}
          >
            <MenuItem value="Name">Sort by: Name</MenuItem>
            <MenuItem value="Rating">Sort by: Rating</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Crew Members Grid */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 2.5 }}>
        {sortedMembers.map((member) => (
          <Card 
            key={member.id}
            sx={{
              cursor: 'pointer',
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              '&:hover': { boxShadow: '0 4px 16px rgba(0,0,0,0.15)' },
              height: 'fit-content',
              maxWidth: '100%'
            }}
            onClick={() => handleCardClick(member)}
          >
            <CardMedia
              component="img"
              height="240"
              image={member.image}
              alt={member.name}
              sx={{ objectFit: 'cover' }}
            />
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
                  {member.name}
                </Typography>
                <Chip
                  label={member.level}
                  size="small"
                  sx={{
                    bgcolor: member.level === 'Expert' ? '#ff6b35' : member.level === 'Intermediate' ? '#ffa726' : '#66bb6a',
                    color: 'white',
                    fontWeight: 500
                  }}
                />
              </Box>
              
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {member.location}
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                {member.skills.map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill}
                    size="small"
                    sx={{
                      mr: 0.5,
                      mb: 0.5,
                      bgcolor: '#f5f5f5',
                      color: '#666',
                      fontSize: '0.75rem'
                    }}
                  />
                ))}
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Star sx={{ color: '#ffc107', fontSize: 18, mr: 0.5 }} />
                <Typography variant="body2" sx={{ fontWeight: 600, mr: 1 }}>
                  {member.rating}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ({member.reviewCount})
                </Typography>
              </Box>
              
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.4, mb: 2 }}>
                {member.description}
              </Typography>
              
              <Button
                fullWidth
                variant="contained"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/booking', { state: { talent: member } });
                }}
                sx={{
                  bgcolor: '#ff6b35',
                  color: 'white',
                  fontWeight: 600,
                  py: 1,
                  borderRadius: 1.5,
                  '&:hover': { bgcolor: '#e55a2b' }
                }}
              >
                Book Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Talent Detail Modal */}
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(5px)',
          bgcolor: 'rgba(0,0,0,0.5)'
        }}
      >
        <Box
          sx={{
            bgcolor: 'white',
            borderRadius: 3,
            p: 4,
            maxWidth: 600,
            width: '90%',
            maxHeight: '80vh',
            overflow: 'auto',
            position: 'relative'
          }}
        >
          {selectedTalent && (
            <>
              <IconButton
                onClick={handleCloseModal}
                sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  color: '#666'
                }}
              >
                <Close />
              </IconButton>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
                <Avatar
                  src={selectedTalent.image}
                  sx={{ width: 100, height: 100 }}
                />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                    {selectedTalent.name}
                  </Typography>
                  <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                    {selectedTalent.location}
                  </Typography>
                  <Chip
                    label={selectedTalent.level}
                    sx={{
                      bgcolor: selectedTalent.level === 'Expert' ? '#ff6b35' : selectedTalent.level === 'Intermediate' ? '#ffa726' : '#66bb6a',
                      color: 'white',
                      fontWeight: 500
                    }}
                  />
                </Box>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>Skills</Typography>
                <Box>
                  {selectedTalent.skills.map((skill, index) => (
                    <Chip
                      key={index}
                      label={skill}
                      sx={{
                        mr: 1,
                        mb: 1,
                        bgcolor: '#f5f5f5',
                        color: '#666'
                      }}
                    />
                  ))}
                </Box>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Star sx={{ color: '#ffc107', fontSize: 20, mr: 0.5 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600, mr: 1 }}>
                    {selectedTalent.rating}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    ({selectedTalent.reviewCount} reviews)
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>About</Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                  {selectedTalent.description}
                </Typography>
              </Box>

              <Button
                fullWidth
                variant="contained"
                onClick={() => {
                  handleCloseModal();
                  navigate('/booking', { state: { talent: selectedTalent } });
                }}
                sx={{
                  bgcolor: '#ff6b35',
                  color: 'white',
                  fontWeight: 600,
                  py: 1.5,
                  borderRadius: 2,
                  '&:hover': { bgcolor: '#e55a2b' }
                }}
              >
                Book {selectedTalent.name}
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default HomePage;