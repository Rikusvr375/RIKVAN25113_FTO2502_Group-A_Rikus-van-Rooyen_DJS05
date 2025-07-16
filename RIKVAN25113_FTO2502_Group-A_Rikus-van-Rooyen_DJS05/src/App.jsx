import { useEffect, useState } from "react";
import { PodcastProvider } from "./context/PodcastContext";
import { fetchPodcasts } from "./api/fetchPodcasts";
import { genres } from "./data";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import SortSelect from "./components/SortSelect";
import GenreFilter from "./components/GenreFilter";
import PodcastGrid from "./components/PodcastGrid";
import Pagination from "./components/Pagination";
import styles from "./App.module.css";
import CreateModal from "./utils/createModal.jsx";

/**
 * Root component of the Podcast Explorer app.
 * Handles data fetching and layout composition.
 */
export default function App() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ selectedPodcast, setSelectedPodcast ] = useState(null);
  const [ isModalOpen, setIsModalOpen ] = useState(false);

  useEffect(() => {
    fetchPodcasts(setPodcasts, setError, setLoading);
  }, []);

  // podcast selection function
  const handlePodcastClick = (podcast) => {
    setSelectedPodcast(podcast);
    setIsModalOpen(true);
  }

  // close modal function 
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPodcast(null);
  }

  return (
    <>
      <Header />

      <PodcastProvider initialPodcasts={podcasts}>
        <main className={styles.main}>
          <section className={styles.controls}>
            <SearchBar />
            <GenreFilter genres={genres} />
            <SortSelect />
          </section>

          {loading && (
            <div className={styles.messageContainer}>
              <div className={styles.spinner}></div>
              <p>Loading podcasts...</p>
            </div>
          )}

          {error && (
            <div className={styles.message}>
              <div className={styles.error}>
                Error occurred while fetching podcasts: {error}
              </div>
            </div>
          )}

          {!loading && !error && (
            <>
              <PodcastGrid 
              genres={genres} 
              onPodcastClick={handlePodcastClick} 
              />
              {console.log("onPodcastClick in App:", handlePodcastClick)}
              <Pagination />
            </>
          )}

          {isModalOpen && (
            <CreateModal
              podcast={selectedPodcast}
              onClose={handleCloseModal}
              genres={genres}
            />
          )}
        </main>
      </PodcastProvider>
    </>
  );
}
