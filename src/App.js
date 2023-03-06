import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import { BrowserRouter  } from "react-router-dom";

import { DashboardPage, AnimeListPage, AddAnimePage, SchedulePage, SettingsPage, PageNotFound, EditAnimePage } from "./pages";
import { NavBar, ScrollToTop } from "./components";
import { createTMAItem, ANIME_LIST, ANIME_TO_ADD, ANIME_TO_REMOVE } from "./utils";

function App() {

  const [animeList, setAnimeList] = useState(() => {
    const savedAnimeList = localStorage.getItem("animeList");
    return savedAnimeList ? JSON.parse(savedAnimeList) : [];
  });
 
  useEffect(() => {
    localStorage.setItem("animeList", JSON.stringify(animeList));
  }, [animeList]);

  const addNewAnime = (status, lang, rating) => {
    const animeToAdd = JSON.parse(localStorage.getItem(ANIME_TO_ADD)); // malObj
    const newEntry = createTMAItem(animeList.length, status, lang, rating, [], animeToAdd);
    setAnimeList([...animeList, newEntry]);
    localStorage.removeItem(ANIME_TO_ADD);
  }

  const addAnimeSeason = (parentIdx, status, lang, rating) => {
    const animeToAdd = JSON.parse(localStorage.getItem(ANIME_TO_ADD));
    const updatedList = [...animeList];
    const newEntry = createTMAItem(updatedList[parentIdx].seasons.length, status, lang, rating, [], animeToAdd);
    updatedList[parentIdx].seasons = [...updatedList[parentIdx].seasons, newEntry];
    setAnimeList(updatedList);
    localStorage.removeItem(ANIME_TO_ADD);
  }

  const removeAnimeFromList = () => {
    const animeToRemove = JSON.parse(localStorage.getItem(ANIME_TO_REMOVE));
    animeList.every(currentAnime => {
      if (currentAnime.malData.malId === animeToRemove.malId) {
        setAnimeList(animeList.filter(anime => anime.malData.malId !== animeToRemove.malId));
        localStorage.removeItem(ANIME_TO_REMOVE);
        return false;
      }
      const findSeason = currentAnime.seasons.find(season => season.malData.malId === animeToRemove.malId);
      if (findSeason) {
        const updatedList = [...animeList];
        updatedList[currentAnime.id].seasons = updatedList[currentAnime.id].seasons.filter(anime => anime.malData.malId !== animeToRemove.malId);
        setAnimeList(updatedList);
        localStorage.removeItem(ANIME_TO_REMOVE);
        return false;
      }
      return true;
    })
  }

  const clearList = () => {
    localStorage.removeItem(ANIME_LIST);
    setAnimeList([]);
  }

  return (
    <div>
      <BrowserRouter>
        <ScrollToTop />
        <NavBar />
        <Routes className="app">
          <Route path="/" element={<DashboardPage animeList={animeList} removeAnimeFromList={removeAnimeFromList} />}/>
          <Route path="/list" element={<AnimeListPage animeList={animeList} />}/>
          <Route path="/add-anime" element={<AddAnimePage animeList={animeList} addNewAnime={addNewAnime} addAnimeSeason={addAnimeSeason}/>}/>
          <Route path="/edit-anime" element={<EditAnimePage />}/>
          <Route path="/schedule" element={<SchedulePage animeList={animeList} />}/>
          <Route path="/settings" element={<SettingsPage clearList={clearList}/>}/>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;