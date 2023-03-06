import React from 'react'
import { ListHeader, ListItem } from '../components';

export const AnimeListPage = ({animeList}) => {

  const filterBy = (anime) => {
    return true;
  }

  return (
    <div className="anime-list-page">
      <ListHeader />
      {animeList.map(anime => (
        <ListItem anime={anime}/>
      ))}
    </div>
  )
}
