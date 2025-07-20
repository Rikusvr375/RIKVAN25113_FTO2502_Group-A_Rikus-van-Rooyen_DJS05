import React, { useEffect, useState } from "react";
import { formatDate } from "./formatDate.js";
import { getNames } from "../components/GenreFilter"; 
import { genres } from "../data.js";

const CreateModal = ({ podcast, onClose, genres }) => {
  const [details, setDetails] = useState(null);
  const [openSeason, setOpenSeason] = useState(null);

  useEffect(() => {
    if (podcast?.id) {
      fetch(`https://podcast-api.netlify.app/id/${podcast.id}`)
        .then(res => res.json())
        .then(data => setDetails(data));
    }
  }, [podcast]);

  if (!podcast) return null;

  const genreNames = getNames(podcast.genres || [], genres || []);
  const updatedDate = formatDate(podcast.updated || new Date().toISOString());

  const shorten = (desc, len = 80) =>
    desc && desc.length > len ? desc.slice(0, len) + "..." : desc;

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
        {details?.seasons && details.seasons.length > 0 ? (
          <div>
            <select
              className="season-dropdown"
              value={openSeason ?? 0}
              onChange={e => setOpenSeason(Number(e.target.value))}
              style={{ marginBottom: "16px", padding: "8px", fontSize: "1rem" }}
            >
              {details.seasons.map((season, idx) => (
                <option key={idx} value={idx}>
                  Season {season.number || idx + 1} ({season.episodes ? season.episodes.length : 0} Episodes)
                </option>
              ))}
            </select>
            {details.seasons[openSeason ?? 0] && (
              <div className="season-details">
                <img
                  src={details.seasons[openSeason ?? 0].image || podcast.image || ""}
                  alt={`Season ${details.seasons[openSeason ?? 0].number} cover`}
                  style={{ width: "100%", maxWidth: "300px", margin: "10px 0" }}
                />
                <ul className="episode-list">
                  {details.seasons[openSeason ?? 0].episodes.map((ep, epIdx) => (
                    <li key={epIdx} className="episode-item" style={{ marginBottom: "10px" }}>
                      <strong>Episode {ep.number || epIdx + 1}: {ep.title || "No Title"}</strong>
                      <p>{shorten(ep.description, 80)}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <ul className="season-list">
            <li>No seasons available</li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default CreateModal;