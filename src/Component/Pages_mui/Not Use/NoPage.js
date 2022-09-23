import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { Link  } from 'react-router-dom'
import Loader from './Tools/Loader';

export default function NoPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Loader loading={true} />
	  <CssBaseline />
      <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
        <Typography variant="h2" component="h1" gutterBottom>
         Oops!
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Page not found
        </Typography>
        <Typography variant="body1">The page you’re looking for doesn’t exist. <Link to="/" >Go home</Link></Typography>
      </Container>
       
    </Box>
  );
}