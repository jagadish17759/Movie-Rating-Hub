import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import YouTube from 'react-youtube';


const Movie = () => {
  let location = useLocation();
  let specificMovie = location.state.movie;
  let [trailer, setTrailer] = useState("");

  async function getTrailers(id) {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=67d677534400e8f77ddab93fff4be1d8`)
      .then(res => res.json())
      .then(data => setTrailer(data.results[0]?.key))
      .catch(err => console.error('error', err));
  }

  return (
    <div className="movie-details">
      <img alt={specificMovie.title} src={`https://image.tmdb.org/t/p/original/${specificMovie.backdrop_path}`} className="movie-backdrop" />
      <h3>{specificMovie.title}</h3>
      <p>{specificMovie.overview}</p>
      <p>VOTE AVERAGE: {specificMovie.vote_average}</p>
      <button className="trailer-button" onClick={() => getTrailers(specificMovie.id)}>Play Trailer</button>
      {trailer && (
        <YouTube
          videoId={trailer}
          opts={{
            height: '390',
            width: '640',
            playerVars: {
              autoplay: 1,
              origin: window.location.origin,
            },
          }}
        />
      )}
    </div>
  );
}

export default Movie;
