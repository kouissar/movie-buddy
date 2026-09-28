'use client';

import { useState, useEffect } from 'react';
import { 
  Box, Stepper, Step, StepLabel, Button, Typography, 
  Chip, TextField, CircularProgress, Card, CardContent, CardMedia, Grid,
  Avatar
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { getGenresAction, searchActorsAction, searchMoviesAction } from '@/app/actions';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const steps = ['Favorite Genres', 'Favorite Actors', 'Some Movies You Love'];

export default function OnboardingStepper() {
  const [activeStep, setActiveStep] = useState(0);
  
  // Genres State
  const [genres, setGenres] = useState<{id: number, name: string}[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  
  // Actors State
  const [actorQuery, setActorQuery] = useState('');
  const [actors, setActors] = useState<any[]>([]);
  const [selectedActors, setSelectedActors] = useState<any[]>([]);
  const [loadingActors, setLoadingActors] = useState(false);

  // Movies State
  const [movieQuery, setMovieQuery] = useState('');
  const [movies, setMovies] = useState<any[]>([]);
  const [selectedMovies, setSelectedMovies] = useState<any[]>([]);
  const [loadingMovies, setLoadingMovies] = useState(false);

  useEffect(() => {
    getGenresAction().then(data => {
      if (data.genres) setGenres(data.genres);
    });
  }, []);

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const toggleGenre = (id: number) => {
    setSelectedGenres(prev => 
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    );
  };

  const toggleActor = (actor: any) => {
    setSelectedActors(prev => {
      if (prev.find(a => a.id === actor.id)) {
        return prev.filter(a => a.id !== actor.id);
      }
      return [...prev, actor];
    });
  };

  const toggleMovie = (movie: any) => {
    setSelectedMovies(prev => {
      if (prev.find(m => m.id === movie.id)) {
        return prev.filter(m => m.id !== movie.id);
      }
      return [...prev, movie];
    });
  };

  useEffect(() => {
    if (!actorQuery) { setActors([]); return; }
    const delay = setTimeout(async () => {
      setLoadingActors(true);
      const data = await searchActorsAction(actorQuery);
      setActors(data.results || []);
      setLoadingActors(false);
    }, 500);
    return () => clearTimeout(delay);
  }, [actorQuery]);

  useEffect(() => {
    if (!movieQuery) { setMovies([]); return; }
    const delay = setTimeout(async () => {
      setLoadingMovies(true);
      const data = await searchMoviesAction(movieQuery);
      setMovies(data.results || []);
      setLoadingMovies(false);
    }, 500);
    return () => clearTimeout(delay);
  }, [movieQuery]);

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>Select at least 3 genres you enjoy:</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mt: 3 }}>
              {genres.map(genre => {
                const isSelected = selectedGenres.includes(genre.id);
                return (
                  <Chip
                    key={genre.id}
                    label={genre.name}
                    onClick={() => toggleGenre(genre.id)}
                    color={isSelected ? "primary" : "default"}
                    variant={isSelected ? "filled" : "outlined"}
                    icon={isSelected ? <CheckCircleIcon /> : undefined}
                    sx={{ fontSize: '1rem', py: 2.5, px: 1, borderRadius: '20px' }}
                  />
                );
              })}
            </Box>
          </Box>
        );
      case 1:
        return (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>Search and select actors you like:</Typography>
            <TextField 
              fullWidth 
              variant="outlined" 
              placeholder="e.g. Leonardo DiCaprio" 
              value={actorQuery}
              onChange={(e) => setActorQuery(e.target.value)}
              sx={{ mb: 3 }}
            />
            {loadingActors && <CircularProgress size={24} sx={{ mb: 2 }} />}
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4 }}>
              {selectedActors.map(actor => (
                <Chip key={actor.id} label={actor.name} onDelete={() => toggleActor(actor)} color="secondary" />
              ))}
            </Box>

            <Grid container spacing={2}>
              {actors.slice(0, 8).map(actor => {
                const isSelected = selectedActors.some(a => a.id === actor.id);
                return (
                  <Grid size={{ xs: 12, sm: 6, md: 3 }} key={actor.id}>
                    <Card 
                      onClick={() => toggleActor(actor)}
                      sx={{ 
                        cursor: 'pointer', 
                        border: isSelected ? '2px solid' : '1px solid',
                        borderColor: isSelected ? 'secondary.main' : 'divider',
                        opacity: isSelected ? 0.8 : 1,
                        textAlign: 'center',
                        p: 2
                      }}
                    >
                      <Avatar 
                        src={actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : ''} 
                        sx={{ width: 80, height: 80, mx: 'auto', mb: 1 }}
                      />
                      <Typography variant="body2" noWrap>{actor.name}</Typography>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        );
      case 2:
        return (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>Search and select some movies you love:</Typography>
            <TextField 
              fullWidth 
              variant="outlined" 
              placeholder="e.g. The Matrix" 
              value={movieQuery}
              onChange={(e) => setMovieQuery(e.target.value)}
              sx={{ mb: 3 }}
            />
            {loadingMovies && <CircularProgress size={24} sx={{ mb: 2 }} />}
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4 }}>
              {selectedMovies.map(movie => (
                <Chip key={movie.id} label={movie.title} onDelete={() => toggleMovie(movie)} color="primary" />
              ))}
            </Box>

            <Grid container spacing={2}>
              {movies.slice(0, 8).map(movie => {
                const isSelected = selectedMovies.some(m => m.id === movie.id);
                return (
                  <Grid size={{ xs: 12, sm: 6, md: 3 }} key={movie.id}>
                    <Card 
                      onClick={() => toggleMovie(movie)}
                      sx={{ 
                        cursor: 'pointer', 
                        border: isSelected ? '2px solid' : '1px solid',
                        borderColor: isSelected ? 'primary.main' : 'divider',
                        opacity: isSelected ? 0.8 : 1
                      }}
                    >
                      {movie.poster_path ? (
                         <CardMedia
                           component="img"
                           height="200"
                           image={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                           alt={movie.title}
                           sx={{ objectFit: 'cover' }}
                         />
                      ) : (
                         <Box sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'action.hover' }}>
                           <Typography variant="caption">No Poster</Typography>
                         </Box>
                      )}
                      <CardContent sx={{ p: 1, '&:last-child': { pb: 1 } }}>
                        <Typography variant="body2" noWrap title={movie.title}>{movie.title}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {movie.release_date?.split('-')[0]}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        );
      default:
        return null;
    }
  };

  const isNextDisabled = () => {
    if (activeStep === 0) return selectedGenres.length < 3;
    if (activeStep === 1) return selectedActors.length === 0;
    if (activeStep === 2) return selectedMovies.length === 0;
    return false;
  };

  const handleComplete = async () => {
    // Here we would save to Supabase
    console.log("Saving preferences:", { selectedGenres, selectedActors, selectedMovies });
    // Redirect to dashboard
    window.location.href = '/dashboard';
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 800, mx: 'auto', p: 3 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
      <Box sx={{ minHeight: 400, position: 'relative', overflow: 'hidden' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderStepContent(activeStep)}
          </motion.div>
        </AnimatePresence>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 4 }}>
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
          variant="outlined"
        >
          Back
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />
        
        {activeStep === steps.length - 1 ? (
          <Button onClick={handleComplete} variant="contained" disabled={isNextDisabled()}>
            Complete Setup
          </Button>
        ) : (
          <Button onClick={handleNext} variant="contained" disabled={isNextDisabled()}>
            Next
          </Button>
        )}
      </Box>
    </Box>
  );
}
