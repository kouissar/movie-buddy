import { Container, Typography, Box, Grid, Chip, Button, Avatar, Divider, Card, CardMedia, CardContent } from '@mui/material';
import { getMovieDetails } from '@/lib/tmdb';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import StarIcon from '@mui/icons-material/Star';
import Link from 'next/link';

export default async function MovieDetailsPage({ params }: { params: { id: string } }) {
  let movie;
  try {
    movie = await getMovieDetails(params.id);
  } catch (e) {
    return (
      <Container sx={{ py: 10, textAlign: 'center' }}>
        <Typography variant="h4">Movie not found</Typography>
      </Container>
    );
  }

  const cast = movie.credits?.cast?.slice(0, 6) || [];
  const recommendations = movie.recommendations?.results?.slice(0, 4) || [];
  const trailer = movie.videos?.results?.find((v: any) => v.type === 'Trailer' && v.site === 'YouTube');

  return (
    <Box>
      {/* Hero Section with Backdrop */}
      <Box 
        sx={{ 
          position: 'relative', 
          width: '100%', 
          height: { xs: '50vh', md: '70vh' },
          bgcolor: 'background.paper'
        }}
      >
        {movie.backdrop_path && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(to top, #0a0a0a 0%, transparent 100%)'
              }
            }}
          />
        )}
        
        <Container maxWidth="xl" sx={{ height: '100%', position: 'relative', display: 'flex', alignItems: 'flex-end', pb: 8 }}>
          <Grid container spacing={4} alignItems="flex-end">
            <Grid size={{ xs: 12, md: 8 }}>
              <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                {movie.genres?.map((g: any) => (
                  <Chip key={g.id} label={g.name} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }} />
                ))}
              </Box>
              <Typography variant="h2" component="h1" sx={{ fontWeight: 800, mb: 2, textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                {movie.title}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <StarIcon sx={{ color: '#fbbf24' }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{movie.vote_average?.toFixed(1)}</Typography>
                </Box>
                <Typography variant="body1" color="text.secondary">
                  {movie.release_date?.split('-')[0]} • {movie.runtime} min
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                {trailer && (
                  <Button 
                    variant="contained" 
                    size="large" 
                    startIcon={<PlayArrowIcon />}
                    href={`https://www.youtube.com/watch?v=${trailer.key}`}
                    target="_blank"
                  >
                    Watch Trailer
                  </Button>
                )}
                <Button variant="outlined" size="large" startIcon={<AddIcon />}>
                  Watchlist
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Grid container spacing={6}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>Storyline</Typography>
            <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'text.secondary', mb: 6 }}>
              {movie.overview}
            </Typography>

            <Divider sx={{ mb: 6, borderColor: 'rgba(255,255,255,0.1)' }} />

            <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>Top Cast</Typography>
            <Grid container spacing={3}>
              {cast.map((actor: any) => (
                <Grid size={{ xs: 6, sm: 4, md: 2 }} key={actor.id}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Avatar 
                      src={actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : ''}
                      sx={{ width: 100, height: 100, mx: 'auto', mb: 1, border: '2px solid rgba(255,255,255,0.1)' }}
                    />
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{actor.name}</Typography>
                    <Typography variant="caption" color="text.secondary">{actor.character}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>Similar Movies</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {recommendations.map((rec: any) => (
                <Card 
                  key={rec.id} 
                  component={Link}
                  href={`/movie/${rec.id}`}
                  sx={{ 
                    display: 'flex', 
                    textDecoration: 'none', 
                    bgcolor: 'transparent', 
                    border: 'none',
                    '&:hover img': { transform: 'scale(1.05)' }
                  }}
                >
                  <Box sx={{ width: 100, flexShrink: 0, overflow: 'hidden', borderRadius: 2 }}>
                    {rec.poster_path ? (
                      <Box 
                        component="img"
                        src={`https://image.tmdb.org/t/p/w200${rec.poster_path}`}
                        sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
                      />
                    ) : (
                      <Box sx={{ width: '100%', height: 150, bgcolor: 'action.hover' }} />
                    )}
                  </Box>
                  <CardContent sx={{ py: 0, pr: 0 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 0.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {rec.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      <StarIcon sx={{ fontSize: 12, verticalAlign: 'text-top', color: '#fbbf24', mr: 0.5 }} />
                      {rec.vote_average?.toFixed(1)}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
