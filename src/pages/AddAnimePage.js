import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import { watchStatuses, watchedLanguages, ratings, LOADING_PIC, ANIME_TO_ADD } from '../utils';

export const AddAnimePage = ({animeList, addNewAnime, addAnimeSeason}) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(ratings[0]);
  const [watchStatus, setWatchStatus] = useState(watchStatuses[0]);
  const [watchedLanguage, setWatchedLanguage] = useState(watchedLanguages[0]);

  const currentMalObj = JSON.parse(localStorage.getItem(ANIME_TO_ADD));
  const [relations, setRelations] = useState([]);
  const [parentId, setParentId] = useState(animeList.length > 0 ? 0 : null);
  const [addAsSeason, setAddAsSeason] = useState(false);

  const handleNewAnime = () => {
    addNewAnime(watchStatus, watchedLanguage, rating);
    window.open(currentMalObj.url, '_blank');
    navigate("/");
  }

  const handleAddSeason = () => {
    addAnimeSeason(parentId, watchStatus, watchedLanguage, rating)
    navigate("/");
  }

  const getParent = async () => {
    setLoading(true);
    const result = await axios.get(
      `https://api.jikan.moe/v4/anime/${currentMalObj.malId}/full`
    );
    const prequels = result.data.data.relations.filter(r => r.relation === "Prequel");
    setRelations(prequels);
    setLoading(false);
  }

  useEffect(() => {
    getParent();
  }, [])

  // in dropdown for adding to a parent anime check if already in seasons list

  return (
    <div className="add-anime-page">
      {loading ? (
        <div>
          <img alt="loading" src={LOADING_PIC} />
          <div>Loading results...</div>
        </div>
      ) : (
        <div className="add-anime-page--info">
          <div className="add-anime-page--entry-image">
            <img alt="thumbnail" src={currentMalObj.image} />
          </div>
          <div className="add-anime-page--entry-title">{currentMalObj.title}</div>
          <div className="add-anime-page--entry-info">
            <div className="add-anime-page--entry-info--item">{currentMalObj.type}</div>
            <div className="add-anime-page--entry-info--bullet">•</div>
            <div className="add-anime-page--entry-info--item">{`${currentMalObj.episodes ? currentMalObj.episodes : "?"} episode${currentMalObj.episodes > 1 ? "s" : ""}`}</div>
            <div className="add-anime-page--entry-info--bullet">•</div>
            <div className="add-anime-page--entry-info--item">{currentMalObj.status}</div>
          </div>
          <div className="add-anime-page--details">
            <div className="add-anime-page--details--option">
              <div>Watch Status</div>
              <select
                className="add-anime-page--details--select"
                onChange={(e) => setWatchStatus(e.target.value)}
              >
                {watchStatuses.map((watchStatus) => (
                  <option value={watchStatus}>{watchStatus}</option>
                ))}
              </select>
            </div>
            <div className="add-anime-page--details--option">
              <div>Language</div>
              <select
                className="add-anime-page--details--select"
                onChange={(e) => setWatchedLanguage(e.target.value)}
              >
                {watchedLanguages.map(lang => (
                  <option value={lang}>{lang}</option>
                ))}
              </select>
            </div>
            <div className="add-anime-page--details--option">
              <div>Rating</div>
              <select
                className="add-anime-page--details--select"
                onChange={(e) => setRating(e.target.value)}
              >
                {ratings.map(lang => (
                  <option value={lang}>{lang}</option>
                ))}
              </select>
            </div>
          </div>
          {relations.length > 0 && (
            <div className="add-anime-page--add-option">
              <div className="add-anime-page--add-option--text">
                <div>Anime has prequel, add under parent anime?</div>
                <input type="checkbox" onChange={(e) => setAddAsSeason(e.target.checked)}/>
              </div>
              {addAsSeason && (
                <>
                  <div>Choose parent</div>
                  <select className="add-anime-page--add-select" onChange={e => setParentId(e.target.value)}>
                    {animeList.map((anime, idx) => (
                      <option key={idx} value={anime.id}>{anime.malData.title}</option>
                    ))}
                  </select>
                </>
              )}
            </div>
          )}
          {addAsSeason ? (
            <div className="add-anime-page--buttons">
              {parentId != null ? (
                <button className="add-anime-page--button" onClick={handleAddSeason}>ADD</button>
              ) : (
                <div>No parent anime selected...</div>
              )}
            </div>
          ) : (
            <div className="add-anime-page--buttons">
              <button className="add-anime-page--button" onClick={handleNewAnime}>ADD</button>
            </div>
          )}
        </div>
      )}

    </div>
  )
}
