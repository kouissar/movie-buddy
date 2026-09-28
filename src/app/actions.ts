'use server';

import { searchMovies } from '@/lib/tmdb';
import { fetchTMDB } from '@/lib/tmdb';

export async function searchMoviesAction(query: string) {
  if (!query) return { results: [] };
  try {
    const data = await searchMovies(query);
    return data;
  } catch (error) {
    console.error('Error searching movies:', error);
    return { results: [] };
  }
}

export async function searchActorsAction(query: string) {
  if (!query) return { results: [] };
  try {
    const data = await fetchTMDB({
      endpoint: '/search/person',
      params: { query, language: 'en-US', page: '1', include_adult: 'false' }
    });
    return data;
  } catch (error) {
    console.error('Error searching actors:', error);
    return { results: [] };
  }
}

export async function getGenresAction() {
  try {
    const data = await fetchTMDB({
      endpoint: '/genre/movie/list',
      params: { language: 'en-US' }
    });
    return data;
  } catch (error) {
    console.error('Error getting genres:', error);
    return { genres: [] };
  }
}
