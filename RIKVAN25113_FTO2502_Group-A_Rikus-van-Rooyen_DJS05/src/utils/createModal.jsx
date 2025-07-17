import React from "react";
import { formatDate } from "./formatDate.js";
import { getNames } from "../components/GenreFilter"; 

const CreateModal = ({ podcast, onClose, genres }) => {
  if (!podcast) return null;

  console.log("Modal Podcast Data:", podcast); // Debug the podcast in the modal
  const genreNames = getNames(podcast.genres || [], genres || []);

  const updatedDate = formatDate(podcast.updated || new Date().toISOString());

  const seasonCount = podcast.seasons || 0;

  return (
    <div className={`modal ${!podcast ? "hidden" : ""}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="title-section">
          <h2>{podcast.title || "No Title"}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="banner">
          <img
            className="modal-img"
            src={podcast.image || ""}
            alt={`${podcast.title || "Podcast"} cover`}
          />
          <div className="info-section">
            <h3>Description</h3>
            <p>{podcast.description || "No description available"}</p>
            <h3>Genres</h3>
            <div className="tags">
              {genreNames.length > 0 ? (
                genreNames.map((genre) => (
                  <span key={genre} className="tag">
                    {genre}
                  </span>
                ))
              ) : (
                <span className="tag">No genres available</span>
              )}
            </div>
            <p className="modal-updated-text">{updatedDate}</p>
          </div>
        </div>
        <h3>Seasons</h3>
        <ul className="season-list">
          {seasonCount > 0 ? (
            <li className="season-item">
              <strong className="season-title">{seasonCount} Season{seasonCount !== 1 ? "s" : ""}</strong>
              <span className="episodes">Episode count not available</span>
            </li>
          ) : (
            <li>No seasons available</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CreateModal;