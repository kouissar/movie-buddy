import { Container, Typography, Box, Paper } from '@mui/material';

export default function ProfilePage() {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 800 }}>
          My Profile
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
          Manage your movie preferences and watch history.
        </Typography>
      </Box>

      <Paper 
        sx={{ 
          p: 4, 
          borderRadius: 4, 
          bgcolor: 'background.paper',
          border: '1px solid rgba(255,255,255,0.05)'
        }}
      >
        <Typography variant="h5" gutterBottom>
          Coming Soon
        </Typography>
        <Typography variant="body1" color="text.secondary">
          We are currently wiring up the Supabase authentication. Once you log in, your favorite genres, actors, and movies will be saved here so you can refine your recommendations anytime!
        </Typography>
      </Paper>
    </Container>
  );
}
