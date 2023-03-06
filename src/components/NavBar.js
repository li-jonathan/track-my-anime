import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faList, faCalendar, faGear, faCircleInfo, faUser } from "@fortawesome/free-solid-svg-icons";

export const NavBar = () => {

  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`nav-bar ${expanded ? "nav-bar_expanded" : ""}`}>
      <ul className="nav-bar--nav">
        <li className="nav-bar--logo" onClick={() => setExpanded(!expanded)}>
          <img src="https://cdn.7tv.app/emote/60ae7316f7c927fad14e6ca2/2x.webp" className="nav-bar--logo-icon" />
          <span className={`nav-bar--text-logo ${expanded ? "nav-bar--text-logo_expanded" : ""}`}>
            TRACK MY
            <div className="nav-bar--text-logo--text">ANIME</div>
          </span>
        </li>
        <li className="nav-bar--item">
          <Link to="/" className="nav-bar--link">
            <FontAwesomeIcon icon={faHouse} size="xl" className="nav-bar--icon"/>
            <span className={`nav-bar--text ${expanded ? "nav-bar--text_expanded" : ""}`}>Dashboard</span>
          </Link>
        </li>
        <li className="nav-bar--item">
          <Link to="/list" className="nav-bar--link">
            <FontAwesomeIcon icon={faList} size="xl" className="nav-bar--icon"/>
            <span className={`nav-bar--text ${expanded ? "nav-bar--text_expanded" : ""}`}>List</span>
          </Link>
        </li>
        <li className="nav-bar--item">
          <Link to="/schedule" className="nav-bar--link">
            <FontAwesomeIcon icon={faCalendar} size="xl" className="nav-bar--icon"/>
            <span className={`nav-bar--text ${expanded ? "nav-bar--text_expanded" : ""}`}>Schedule</span>
          </Link>
        </li>
        <li className="nav-bar--item">
          <Link to="/info" className="nav-bar--link">
            <FontAwesomeIcon icon={faCircleInfo} size="xl" className="nav-bar--icon"/>
            <span className={`nav-bar--text ${expanded ? "nav-bar--text_expanded" : ""}`}>Help</span>
          </Link>
        </li>
        <li className="nav-bar--item">
          <Link to="/settings" className="nav-bar--link">
            <FontAwesomeIcon icon={faGear} size="xl" className="nav-bar--icon"/>
            <span className={`nav-bar--text ${expanded ? "nav-bar--text_expanded" : ""}`}>Settings</span>
          </Link>
        </li>
        {/* <li className="nav-bar--item">
          <Link to="/profile" className="nav-bar--link">
            <FontAwesomeIcon icon={faUser} size="xl" className="nav-bar--icon"/>
            <span className={`nav-bar--text ${expanded ? "nav-bar--text_expanded" : ""}`}>Profile</span>
          </Link>
        </li> */}
      </ul>
    </div>
  )
}
