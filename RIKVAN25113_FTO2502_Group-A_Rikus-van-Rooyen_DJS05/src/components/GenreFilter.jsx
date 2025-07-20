import { useContext } from "react";
import { PodcastContext } from "../context/PodcastContext";
import styles from "./GenreFilter.module.css";

/**
 * @param {{genres: {id:number,name:string}[]}} props – list of genres from data.
 */

export const getNames = (genreIds, genres) => {
  return genreIds
    .map((id) => genres.find((genre) => genre.id === id)?.title)
    .filter(Boolean);
};

export default function GenreFilter({ genres }) {
  const { genre, setGenre } = useContext(PodcastContext);

  return (
    <select
      className={styles.select}
      value={genre}
      onChange={(e) => setGenre(e.target.value)}
    >
      <option value="all">All Genres</option>
      {genres.map((g) => (
        <option key={g.id} value={g.id}>
          {g.name || g.title}
        </option>
      ))}
    </select>
  );
}
