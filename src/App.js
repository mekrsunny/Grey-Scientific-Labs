import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import { fetchMovies } from "./api/api";
import "./styles/App.css";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    searchMovies("Batman");
  }, []);

  const searchMovies = async (title, page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMovies(title, page);
      setMovies(data.Search || []);
    } catch (error) {
      setError('Failed to fetch movies');
    }
    setLoading(false);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setPage(1);
    searchMovies(term, 1);
  };

  const loadMoreMovies = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    searchMovies(searchTerm, nextPage);
  };

  return (
    <div className="app">
      <h1>MovieLand</h1>
      <SearchBar onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <MovieList movies={movies} />
      {movies.length > 0 && (
        <button onClick={loadMoreMovies} className="load-more">
          Load More
        </button>
      )}
    </div>
  );
};

export default App;
