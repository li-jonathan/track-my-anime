import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faX } from "@fortawesome/free-solid-svg-icons";

export const SearchBar = ({
 setSearch,
}) => {
 const [current, setCurrent] = useState("");
 return (
   <div className="search-bar">
     <FontAwesomeIcon
       className="search-bar--icon"
       size="lg"
       icon={faMagnifyingGlass}
     />
     <input
       className="search-bar--input"
       placeholder="Search..."
       onChange={(e) => {
         setCurrent(e.target.value);
         setSearch(e.target.value);
       }}
       value={current}
     />
     <FontAwesomeIcon className={`search-bar--clear ${current ? "search-bar--clear_show" : ""}`} size="sm" icon={faX} onClick={() => setCurrent("")}/>
   </div>
 );
}
