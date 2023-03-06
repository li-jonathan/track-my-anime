export const normalizeMALResponse = (malRes) => {
  // returns "malObj"
  return {
    malId: malRes.mal_id,
    image: malRes.images.jpg.image_url,
    title: malRes.title,
    type: malRes.type,
    aired: malRes.aired,
    episodes: malRes.episodes,
    status: malRes.status,
    airing: malRes.airing,
    broadcast: malRes.broadcast,
    url: malRes.url,
  };
};

export const createTMAItem = (id, status, lang, rating, seasons, malObj) => {
  // returns TMA item
  return {
    id: id,
    watchStatus: status,
    watchedLanguage: lang,
    rating: rating,
    seasons: seasons,
    malData: malObj,
  }
}
