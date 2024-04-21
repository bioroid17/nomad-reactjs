import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState(null);
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovie(json.data.movie);
    setLoading(false);
  };
  useEffect(() => {
    getMovie();
  });
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h1>{movie.title}</h1>
          <img src={movie.large_cover_image} alt={movie.title} />
          <h4>Rating: {movie.rating}</h4>
          <ul>
            {movie.genres
              ? movie.genres.map((genre, index) => <li key={index}>{genre}</li>)
              : null}
          </ul>
          <hr />
          <p>{movie.description_full}</p>
        </div>
      )}
    </div>
  );
}
export default Detail;
