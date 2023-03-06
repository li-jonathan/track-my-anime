import React, { useState, useEffect } from "react";
import axios from "axios";

import { SearchBar, SearchResultItem } from "../components";
import { normalizeMALResponse, LOADING_PIC, NO_RESULTS_PIC } from "../utils";

export const DashboardPage = ({ animeList, removeAnimeFromList }) => {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const getSearchResults = async () => {
    setLoading(true);
    const result = await axios.get(
      `https://api.jikan.moe/v4/anime?q=${search}`
    );
    setSearchResults(result.data.data);
    setLoading(false);
  };

  const checkAnimeSeasonsInList = (anime, animeToCheck) => {
    return anime.seasons.some(season => season.malData.malId === animeToCheck);
  }

  useEffect(() => {
    getSearchResults();
  }, []);

  return (
    <div className="dashboard-page">
      <div className="dashboard-page--title">TrackMyAnime</div>
      <SearchBar setSearch={setSearch} />
      <div className="search-button">
        <button onClick={getSearchResults} className="search-button--btn">
          Go
        </button>
      </div>
      {loading ? (
        <div>
          <img alt="loading" src={LOADING_PIC} />
          <div>Loading results...</div>
        </div>
      ) : (
        <div className="dashboard-page--search-results">
          {searchResults.length > 0 ? (
            searchResults?.map((malObj, idx) => {
              const currentAnime = normalizeMALResponse(malObj);
              const enableAdd = !animeList.some(
                (anime) => anime.malData.malId === currentAnime.malId || checkAnimeSeasonsInList(anime, currentAnime.malId)
              );
              return (
                <SearchResultItem
                  malObj={currentAnime}
                  enableAdd={enableAdd}
                  removeAnimeFromList={removeAnimeFromList}
                  key={idx}
                />
              );
            })
          ) : (
            <div>
              <img alt="no results" src={NO_RESULTS_PIC} />
              <div>No results found</div>
            </div>
          )}
        </div>
      )}
      {searchResults.length > 0 && (
        <div>
          Search limited to 25 results, if you do not see your search try
          adding more to the title or using the Japanese title.
        </div>
      )}
    </div>
  );
};
