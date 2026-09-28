'use client';

import { useState, useEffect } from 'react';
import { Container, Typography, Box, TextField, Grid, Card, CardMedia, CardContent, CircularProgress, Chip } from '@mui/material';
import { searchMoviesAction } from '@/app/actions';
import Link from 'next/link';
import SearchIcon from '@mui/icons-material/Search';

export default function DiscoverPage() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setMovies([]);
      return;
    }
    const delay = setTimeout(async () => {
      setLoading(true);
      const data = await searchMoviesAction(query);
      setMovies(data.results || []);
      setLoading(false);
    }, 500);

    return () => clearTimeout(delay);
  }, [query]);

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 800 }}>
          Discover Movies
        </Typography>
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, position: 'relative' }}>
          <SearchIcon sx={{ position: 'absolute', top: 16, left: 16, color: 'text.secondary' }} />
          <TextField 
            fullWidth
            placeholder="Search for movies by title..."
            variant="outlined"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            sx={{ 
              '& .MuiOutlinedInput-root': { 
                borderRadius: '30px',
                paddingLeft: 4,
                bgcolor: 'background.paper'
              } 
            }}
          />
        </Box>
      </Box>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
          <CircularProgress />
        </Box>
      )}

      {!loading && movies.length > 0 && (
        <Grid container spacing={3}>
          {movies.map((movie: any) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={movie.id}>
              <Card 
                component={Link}
                href={`/movie/${movie.id}`}
                sx={{ 
                  textDecoration: 'none',
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    borderColor: 'primary.main'
                  }
                }}
              >
                <Box sx={{ position: 'relative', paddingTop: '150%' }}>
                  {movie.poster_path ? (
                    <CardMedia
                      component="img"
                      image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'action.hover' }}>
                      <Typography variant="body2" color="text.secondary">No Poster</Typography>
                    </Box>
                  )}
                  <Box sx={{ position: 'absolute', top: 10, right: 10 }}>
                    <Chip 
                      label={movie.vote_average ? movie.vote_average.toFixed(1) : 'NR'} 
                      color="primary" 
                      size="small" 
                      sx={{ fontWeight: 'bold' }} 
                    />
                  </Box>
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h2" noWrap title={movie.title}>
                    {movie.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {movie.release_date?.split('-')[0]}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {!loading && query && movies.length === 0 && (
        <Typography variant="h6" color="text.secondary" align="center" sx={{ mt: 8 }}>
          No movies found for "{query}"
        </Typography>
      )}
    </Container>
  );
}
