'use client';

import { AppBar, Toolbar, Typography, Button, Container, Box, IconButton } from '@mui/material';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import Link from 'next/link';

export default function Header() {
  return (
    <AppBar position="sticky" color="transparent" elevation={0} sx={{ backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(10, 10, 10, 0.7)' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <MovieFilterIcon sx={{ color: 'primary.main', fontSize: 32 }} />
            <Typography
              variant="h6"
              noWrap
              component={Link}
              href="/"
              sx={{
                fontWeight: 800,
                color: 'inherit',
                textDecoration: 'none',
                letterSpacing: '-0.05em'
              }}
            >
              Movie Buddy
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button color="inherit" component={Link} href="/dashboard" sx={{ fontWeight: 500 }}>
              Dashboard
            </Button>
            <Button color="inherit" component={Link} href="/discover" sx={{ fontWeight: 500 }}>
              Discover
            </Button>
            <Button variant="contained" color="primary" component={Link} href="/profile" sx={{ fontWeight: 600, px: 3 }}>
              My Profile
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
