import React, { useEffect, useState } from 'react'

export const SchedulePage = ({animeList}) => {

  const [week, setWeek] = useState({})

  const sortBroadcastDays = () => {
    let sortWeek = {
      Sundays: [],
      Mondays: [],
      Tuesdays: [],
      Wednesdays: [],
      Thursdays: [],
      Fridays: [],
      Saturdays: [],
    }
    animeList.forEach(currentAnime => {
      console.log(currentAnime)
      currentAnime.malData.airing && sortWeek[currentAnime.malData.broadcast.day].push(currentAnime);
      const airingSeasons = currentAnime.seasons.filter(season => season.malData.airing);
      airingSeasons.forEach(anime => sortWeek[currentAnime.malData.broadcast.day].push(anime));
    })
    setWeek(sortWeek);
  }

  useEffect(() => {
    sortBroadcastDays();
  }, [])

  return (
    <div className="schedule-page">
      <div className="schedule-page--week">
        {Object.entries(week).map(([day, values]) => 
          <div className="schedule-page--day">
            <div className="schedule-page--day--title">{day}</div>
            <div className="schedule-page--day--list">
              {values.map(anime => (
                <div>{anime.malData.title}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
