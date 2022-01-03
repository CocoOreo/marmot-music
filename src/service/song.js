import { get } from './base'
export const processSongs = (songs) => {
  if (!songs.length) {
    return Promise.resolve(songs)
  }

  return get('/api/getBackUpSongsUrl', {
    mid: songs.map((song) => {
      return song.mid
    })
  }).then((result) => {
    const map = result.map
    return songs.map((song) => {
      song.url = map[song.mid]
      return song
    }).filter((song) => {
      return song.url && song.url.indexOf('vkey') > -1
    })
  })
}

