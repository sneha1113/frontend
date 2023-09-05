import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/moviePage.css';
import { Link } from 'react-router-dom';

interface Movie {
  _id: string;
  movieName: string;
  releaseDate: string;
}

function MovieInfoPage() {
  const [movieData, setMovieData] = useState<Movie[] | null>(null);

  useEffect(() => {
    axios
      .get('https://movie-lcnz.onrender.com/movie')
      .then((response) => {
        if (response.data.length > 0) {
          setMovieData(response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching movie data:', error);
      });
  }, []);

  const formatReleaseDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return (
    <div className="movie-info-container">
      <header className="top-header">
        <div className="banner">Book Tickets</div>
        <div className="navigation">
          <button className="nav-button">Bookings</button>
          <button className="nav-button">Logout</button>
        </div>
      </header>

      <div className="movie-card-container">
        {movieData &&
          movieData.map((movie) => (
            <div className="movie-card" key={movie._id}>
              <h2 className="movie-title">{movie.movieName}</h2>
              <p className="release-date">
                Release Date: {formatReleaseDate(movie.releaseDate)}
              </p>
              <Link to={`/showtime/${encodeURIComponent(movie.movieName)}`}>
                <button className="book-button">Book</button>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}

export default MovieInfoPage;
