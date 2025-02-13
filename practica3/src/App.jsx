import { useState, useEffect } from "react";
import { Logo, Nav, NumResults, Search } from "./components/Nav/";
import { Box } from "./components/Box";
import { MovieList } from "./components/Movie";
import { WatchedMoviesContainer, WatchedMoviesList, WatchedSummary } from "./components/WatchedMovie";
import { useFetchMovies } from "./hooks/useFetchMovies";
import { MovieDetails } from "./components/MovieDetails";

export default function App() {
  const [query, setQuery] = useState("");
  const { movies, isLoading, error } = useFetchMovies(query);
  const [watched, setWatched] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("watched")) || [];
    } catch {
      return [];
    }
  });
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [watched]);

  function handleSelectMovie(id) {
    setSelectedId(id === selectedId ? null : id);
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((prevWatched) => {
      const isMovieAlreadyWatched = prevWatched.some(watchedMovie => watchedMovie.imdbID === movie.imdbID);
      return isMovieAlreadyWatched 
        ? prevWatched.map(watchedMovie => watchedMovie.imdbID === movie.imdbID ? movie : watchedMovie)
        : [...prevWatched, movie];
    });

    handleCloseMovie();
  }

  function handleDeleteWatched(id) {
    setWatched((prevWatched) => {
      const updatedWatched = prevWatched.filter(movie => movie.imdbID !== id);
      localStorage.setItem("watched", JSON.stringify(updatedWatched)); // Actualiza localStorage inmediatamente
      return updatedWatched;
    });
  }

  return (
    <>
      <Nav>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Nav>
      <main className="main">
        <Box>
          {isLoading && <p className="loader">Cargando...</p>}
          {error && <p className="error">⛔ {error}</p>}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
        </Box>
        <Box>
          <WatchedMoviesContainer>
            {selectedId ? (
              <MovieDetails
                selectedId={selectedId}
                onCloseMovie={handleCloseMovie}
                onAddWatched={handleAddWatched}
                watched={watched}
              />
            ) : (
              <>
                <WatchedSummary watched={watched} />
                <WatchedMoviesList watched={watched} onDeleteMovie={handleDeleteWatched} />
              </>
            )}
          </WatchedMoviesContainer>
        </Box>
      </main>
    </>
  );
}
