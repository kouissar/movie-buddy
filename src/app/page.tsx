'use client';

import { Container, Typography, Button, Box, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StarIcon from '@mui/icons-material/Star';
import Link from 'next/link';

export default function Home() {
  return (
    <Box sx={{ overflow: 'hidden', position: 'relative' }}>
      {/* Background decoration */}
      <Box 
        sx={{ 
          position: 'absolute', 
          top: '-20%', 
          left: '-10%', 
          width: '50vw', 
          height: '50vw', 
          borderRadius: '50%', 
          background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(10,10,10,0) 70%)',
          zIndex: -1 
        }} 
      />
      <Box 
        sx={{ 
          position: 'absolute', 
          bottom: '-10%', 
          right: '-10%', 
          width: '60vw', 
          height: '60vw', 
          borderRadius: '50%', 
          background: 'radial-gradient(circle, rgba(236,72,153,0.1) 0%, rgba(10,10,10,0) 70%)',
          zIndex: -1 
        }} 
      />

      <Container maxWidth="lg" sx={{ pt: { xs: 10, md: 20 }, pb: 10 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Typography variant="h1" sx={{ fontSize: { xs: '3rem', md: '4.5rem' }, mb: 2, lineHeight: 1.1 }}>
                Meet Your New <br />
                <Box component="span" sx={{ color: 'primary.main' }}>Movie Buddy</Box>
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 4, fontWeight: 400, maxWidth: 500 }}>
                An intelligent assistant that learns your tastes, tracks your favorite actors, and recommends films you'll genuinely love.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button 
                  variant="contained" 
                  size="large" 
                  component={Link}
                  href="/onboarding"
                  endIcon={<PlayArrowIcon />}
                  sx={{ px: 4, py: 1.5, borderRadius: '50px' }}
                >
                  Get Started
                </Button>
                <Button 
                  variant="outlined" 
                  size="large" 
                  sx={{ px: 4, py: 1.5, borderRadius: '50px', borderColor: 'rgba(255,255,255,0.2)' }}
                >
                  Learn More
                </Button>
              </Box>
            </motion.div>
          </Grid>
          
          <Grid size={{ xs: 12, md: 6 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Box 
                sx={{ 
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '4/5',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
                  borderRadius: 6,
                  border: '1px solid rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden'
                }}
              >
                {/* Floating Mockup Elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  style={{
                    position: 'absolute',
                    top: '20%',
                    left: '10%',
                    background: 'rgba(23,23,23,0.8)',
                    padding: '16px 24px',
                    borderRadius: 16,
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12
                  }}
                >
                  <StarIcon sx={{ color: '#fbbf24' }} />
                  <Typography variant="body2" fontWeight="bold">98% Match</Typography>
                </motion.div>

                <Typography variant="h5" color="text.secondary" sx={{ opacity: 0.5 }}>
                  Interactive UI Preview
                </Typography>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
