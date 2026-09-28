import { Container, Typography, Box, Grid, Card, CardMedia, CardContent, Chip } from '@mui/material';
import { getTrendingMovies } from '@/lib/tmdb';

export default async function DashboardPage() {
  // Fetch trending movies as a placeholder for recommendations
  const data = await getTrendingMovies();
  const movies = data.results || [];

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 800 }}>
          Your Dashboard
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
          Based on your preferences, here are some movies we think you'll love.
        </Typography>
      </Box>

      <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
        Top Picks For You
      </Typography>

      <Grid container spacing={3}>
        {movies.map((movie: any) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={movie.id}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-8px)'
                }
              }}
            >
              <Box sx={{ position: 'relative', paddingTop: '150%' }}>
                <CardMedia
                  component="img"
                  image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  sx={{ 
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover' 
                  }}
                />
                <Box sx={{ position: 'absolute', top: 10, right: 10 }}>
                  <Chip 
                    label={movie.vote_average ? movie.vote_average.toFixed(1) : 'NR'} 
                    color="primary" 
                    size="small" 
                    sx={{ fontWeight: 'bold' }} 
                  />
                </Box>
              </Box>
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" component="h2" noWrap title={movie.title}>
                  {movie.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {movie.release_date?.split('-')[0]}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ 
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {movie.overview}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
