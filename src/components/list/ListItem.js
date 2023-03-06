import React from 'react';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

import { ANIME_TO_ADD, ANIME_TO_EDIT } from '../../utils';

export const ListItem = ({anime}) => {
  const navigate = useNavigate();

  const watchStatusStyle = anime.watchStatus.toLowerCase().split(" ").join("_");

  const editHandler = () => {
    localStorage.setItem(ANIME_TO_EDIT, JSON.stringify(anime));
    navigate("/edit-anime");
  }

  return (
    <div className="list-item">
      <div className="list-item--image">
        <img alt="thumbnail" src={anime.malData.image} />
      </div>
      <div className={`list-item--watch-status-bar list-item--watch-status-bar_${watchStatusStyle}`}/>
      <div className="list-item--title">{anime.malData.title}</div>
      <div className="list-item--detail">{anime.watchStatus}</div>
      <div className="list-item--detail">{anime.watchedLanguage}</div>
      <div className="list-item--detail list-item--detail_rating">{anime.rating}</div>
      <div className="list-item--edit">
        <FontAwesomeIcon
          className="list-item--edit-icon"
          icon={faPenToSquare}
          onClick={editHandler}
        />
      </div>
    </div>
  )
}
