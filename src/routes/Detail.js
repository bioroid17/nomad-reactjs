import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import styles from "./Detail.module.css";

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
    <div className={styles.container}>
      {loading ? (
        <div className={styles.loader}>
          <span>Loading...</span>
        </div>
      ) : (
        <div className={styles.movie}>
          <img
            src={movie.large_cover_image}
            alt={movie.title}
            className={styles.movie__img}
          />
          <div className={styles.col}>
            <div>
              <h2 className={styles.movie__title}>{movie.title_long}</h2>
              <h3 className={styles.movie__year}>{movie.year}</h3>
              <p>{movie.description_full}</p>
            </div>
            <div>
              <div className={styles.movie__rating}>
                Rating: {movie.rating} / 10.0
              </div>
              <ul className={styles.movie__genres}>
                {movie.genres.map((g) => (
                  <li key={g}>{g}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Detail;
