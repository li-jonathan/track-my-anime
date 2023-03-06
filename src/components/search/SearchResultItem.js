import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { ANIME_TO_ADD, ANIME_TO_REMOVE } from '../../utils';

export const SearchResultItem = ({ malObj, enableAdd, removeAnimeFromList }) => {
  const navigate = useNavigate();

  const [actionIcon, setActionIcon] = useState(faCheck);

  const setAnimeToAdd = () => {
    localStorage.setItem(ANIME_TO_ADD, JSON.stringify(malObj));
    navigate("/add-anime");
  }

  const setAnimeToRemove = () => {
    localStorage.setItem(ANIME_TO_REMOVE, JSON.stringify(malObj));
    removeAnimeFromList();
  }

// set the anime to add in local storage
 return (
   <div className="search-result-item">
     <div className="search-result-item--image">
       <img alt="search result" src={malObj.image} />
       <div className="search-result-item--image-overlay">
         <div className="search-result-item--title">{malObj.title}</div>
       </div>
     </div>
     <div className="search-result-item--body">
       <div className="search-result-item--body-text">{malObj.type}</div>
       <span className="search-result-item--body-text search-result-item--body-text_episodes">{`(${
         malObj.episodes ? malObj.episodes : "?"
       } episodes)`}</span>
     </div>
     <div className="search-result-item--buttons">
       {enableAdd ? (
         <button className="search-result-item--button" onClick={setAnimeToAdd}>
           <div className="search-result-item--button--text">ADD</div>
           <FontAwesomeIcon
             icon={faPlus}
             className="search-result-item--button--icon"
             size="sm"
           />
         </button>
       ) : (
        <>
          {actionIcon === faCheck ? (
            <button 
              className="search-result-item--button search-result-item--button_added" 
              onMouseEnter={() => setActionIcon(faTrash)} 
              onMouseLeave={() => setActionIcon(faCheck)}
            >
              <div className="search-result-item--button--text">ADDED</div>
              <FontAwesomeIcon
                icon={faCheck}
                className="search-result-item--button--icon"
                size="sm"
              />         
            </button>
          ) : (
            <button 
              className="search-result-item--button search-result-item--button_added" 
              onClick={setAnimeToRemove}
              onMouseLeave={() => setActionIcon(faCheck)}
            >
              <div className="search-result-item--button--text">REMOVE</div>
              <FontAwesomeIcon
                icon={faTrash}
                className="search-result-item--button--icon"
                size="sm"
              />         
            </button>
          )}
        </>
       )}
     </div>
   </div>
 );
};
