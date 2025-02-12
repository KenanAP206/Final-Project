import React from 'react';
import { Typography, Box } from '@mui/material';

const Welcome = () => {
  return (
    <Box 
      sx={{ 
        textAlign: 'center', 
        marginTop: '10px', 
        marginBottom: '20px', 
        padding: '20px', 
        background: 'linear-gradient(90deg,rgb(130, 106, 196),rgb(101, 60, 177))', // Background color
        borderRadius: '8px', // Rounded corners
        color: '#fff' // Text color
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome, Admin!
      </Typography>
      <Typography variant="body1">
        You are welcome to the admin panel. Here you can manage all your content.
      </Typography>
    </Box>
  );
};

export default Welcome; 