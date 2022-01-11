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

const lyricMap = {}

export const getLyric = (song) => {
  const mid = song.mid
  const lyric = lyricMap[mid]
  if(lyric){
    return Promise.resolve(lyric)
  }

  return get('/api/getLyric', {
    mid
  }).then((res) => {
    const lyric = res ? res.lyric : '[00:00:00]Lyrics not showing'
    lyricMap[mid] = lyric
    return lyric
  })
}
