-- Enable the pgvector extension to work with embedding vectors
create extension if not exists vector;

-- User Profiles Table
-- Connects to Supabase Auth auth.users table
create table user_profiles (
  id uuid references auth.users on delete cascade not null primary key,
  display_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Movies Table
-- Cache movie details from TMDB
create table movies (
  id integer primary key, -- TMDB Movie ID
  title text not null,
  overview text,
  poster_path text,
  backdrop_path text,
  release_date date,
  vote_average numeric,
  genres jsonb,
  embedding vector(1536), -- Assuming OpenAI embeddings, adjust size if using another model
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- User Movie Interactions
-- Tracks if a user watched, liked, or wants to watch a movie
create table user_movie_interactions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references user_profiles(id) on delete cascade not null,
  movie_id integer references movies(id) on delete cascade not null,
  status text not null check (status in ('watched', 'liked', 'want_to_watch')),
  rating integer check (rating >= 1 and rating <= 5), -- Optional user rating
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, movie_id, status)
);

-- User Actors
-- Tracks favorite actors
create table user_actors (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references user_profiles(id) on delete cascade not null,
  actor_id integer not null, -- TMDB Actor ID
  actor_name text not null,
  profile_path text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, actor_id)
);

-- Set up Row Level Security (RLS)
alter table user_profiles enable row level security;
alter table movies enable row level security;
alter table user_movie_interactions enable row level security;
alter table user_actors enable row level security;

-- Policies
create policy "Users can view their own profile."
  on user_profiles for select
  using ( auth.uid() = id );

create policy "Users can update their own profile."
  on user_profiles for update
  using ( auth.uid() = id );

-- Everyone can read cached movies
create policy "Anyone can read movies."
  on movies for select
  using ( true );

-- For now, allow authenticated users to insert movies (as a simple cache mechanism)
create policy "Authenticated users can insert movies."
  on movies for insert
  with check ( auth.role() = 'authenticated' );

-- Users can manage their own interactions
create policy "Users can manage their own interactions."
  on user_movie_interactions for all
  using ( auth.uid() = user_id );

-- Users can manage their favorite actors
create policy "Users can manage their favorite actors."
  on user_actors for all
  using ( auth.uid() = user_id );
