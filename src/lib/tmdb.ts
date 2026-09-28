const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

interface FetchTMDBOptions extends RequestInit {
  endpoint: string;
  params?: Record<string, string>;
}

export async function fetchTMDB({ endpoint, params, ...options }: FetchTMDBOptions) {
  const token = process.env.TMDB_ACCESS_TOKEN;
  
  if (!token) {
    throw new Error('TMDB_ACCESS_TOKEN is missing. Check your environment variables.');
  }

  const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }

  const response = await fetch(url.toString(), {
    ...options,
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(
      `TMDB API Error: ${response.status} ${response.statusText} - ${
        errorData?.status_message || 'Unknown error'
      }`
    );
  }

  return response.json();
}

// Specific API wrappers

export async function getTrendingMovies() {
  return fetchTMDB({
    endpoint: '/trending/movie/day',
    params: { language: 'en-US' }
  });
}

export async function searchMovies(query: string) {
  return fetchTMDB({
    endpoint: '/search/movie',
    params: { query, language: 'en-US', page: '1' }
  });
}

export async function getMovieDetails(movieId: string) {
  return fetchTMDB({
    endpoint: `/movie/${movieId}`,
    params: { language: 'en-US', append_to_response: 'credits,videos,recommendations' }
  });
}
