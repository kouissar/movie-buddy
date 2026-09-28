import { Container, Typography, Box } from '@mui/material';
import OnboardingStepper from '@/components/features/onboarding/OnboardingStepper';

export default function OnboardingPage() {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 800 }}>
          Let's Personalize Your Experience
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
          Tell us a bit about your tastes so we can start finding the perfect movies for you.
        </Typography>
      </Box>
      
      <Box 
        sx={{ 
          background: 'rgba(23, 23, 23, 0.6)', 
          backdropFilter: 'blur(10px)',
          borderRadius: 4, 
          border: '1px solid rgba(255,255,255,0.05)',
          p: { xs: 2, md: 4 }
        }}
      >
        <OnboardingStepper />
      </Box>
    </Container>
  );
}
