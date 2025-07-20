import { formatDate } from "../utils/formatDate";
import styles from "./PodcastCard.module.css";
import { genres } from "../data";

/**
 * PodcastCard Component
 *
 * Renders a single podcast card with metadata including title, image, genres,
 * season count, and last updated date.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.podcast - Podcast data object
 * @param {{id: number, name: string}[]} props.genres - Array of genre definitions
 * @param {function} props.onClick - Function to call when the card is clicked
 *
 * @returns {JSX.Element} A podcast card element
 */
export default function PodcastCard({ podcast, genres, onPodcastClick }) {
  
  const genreNames = genres
    .filter((g) => podcast.genres.includes(g.id))
    .map((g) => g.title);

  return (
    <div className={styles.card} onClick={onPodcastClick ? () => onPodcastClick(podcast) : undefined}>
      <img
        src={podcast.image || "placeholder.jpg"}
        alt={`${podcast.title} cover`}
        className={styles.image}
      />
      <h3 className={styles.title}>{podcast.title || "No Title"}</h3>
      <p className={styles.genres}>
        {genreNames.length > 0 ? genreNames.join(", ") : "No genres"}
      </p>
      <p className={styles.seasons}>
        {podcast.seasons || 0} season{podcast.seasons !== 1 ? "s" : ""}
      </p>
      <p className={styles.updated}>
        Updated: {formatDate(podcast.updated || new Date().toISOString())}
      </p>
    </div>
  );
}