interface Song {
  name: string
  artist: string
  url: string
  imageUrl: string
}

export const songList: Song[] = [
  {
    name: 'paris',
    artist: 'Chainsmokers',
    url: 'https://data.mymp3app.com/320/the-chainsmokers-paris-lyric.mp3',
    imageUrl: 'https://i1.sndcdn.com/artworks-000241607187-d5elh4-t500x500.jpg',
  },
  {
    name: 'Bujji',
    artist: 'Anirudh',
    url: 'https://dslink.xyz/Masstamilan.In/Jagame%20Thanthiram/Bujji-Masstamilan.In.mp3',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcgqVN3Iy5Y4XJeXK10n0o4_GZ_YfGE35JtQ&usqp=CAU',
  },
  {
    name: 'This Feeling',
    artist: 'Chainsmokers',
    url: 'https://data.mymp3app.com/320/the-chainsmokers-this-feeling-ft.-kelsea-ballerini-lyric.mp3',
    imageUrl: 'https://i1.sndcdn.com/artworks-000241607187-d5elh4-t500x500.jpg',
  },
]

export function getRandomSong() {
  const randomIndex = Math.floor(Math.random() * songList.length)
  return songList[randomIndex]
}

// -------------------- LocalStorage -----------------------------
// Retrive Recently Listned Songs from localStorage
export function getRecentSongsLocalStorage(): Song[] {
  const songs = JSON.parse(localStorage.getItem('RECENT_SONGS'))
  return songs ? songs : []
}

// save currentSong details to localStorage
export function setRecentSongsLocalStorage(currentSong: Song) {
  let songs = getRecentSongsLocalStorage()
  if (songs.length === 5) songs.pop()
  // To remove if the current song already exists in localStorage
  songs = songs.filter((song) => song.name !== currentSong.name)
  localStorage.setItem('RECENT_SONGS', JSON.stringify([currentSong, ...songs]))
}

// -------------------- sessionStorage -----------------------------
export function getSongSessionStorage(): Song[] {
  const songs = JSON.parse(sessionStorage.getItem('SONG_LIST'))
  return songs ? songs : []
}

export function setSongSessionStorage(currentSong: Song) {
  let songs = getSongSessionStorage()
  songs = songs.filter((song) => song.name !== currentSong.name)
  songs.push(currentSong)
  sessionStorage.setItem('SONG_LIST', JSON.stringify(songs))
}

export function removeSongAndReturnSessionStorage(removeSong: Song) {
  let songs = getSongSessionStorage()

  let removedSongIndex = null
  let newSongList = []
  for (let i = 0; i < songs.length; i++) {
    if (songs[i].name === removeSong.name) removedSongIndex = i
    else newSongList.push(songs[i])
  }
  // songs = songs.filter((song) => song.name !== removeSong.name)

  return [newSongList, removedSongIndex]
}

// pop the first song from sessionStorage
export function getNextSong(index: number) {
  let songs = getSongSessionStorage()
  return songs[index + 1]
}

export function getPreviousSong(index: number) {
  let songs = getSongSessionStorage()
  return songs[index - 1]
}

export function playNewSong(index: number, newSong: Song) {
  let [songList, removedSongIndex] = removeSongAndReturnSessionStorage(newSong)
  if (songList.length === 0 || index === -1) songList.push(newSong)
  else {
    const newIndex = removedSongIndex < index ? index - 1 : index
    songList = songList.slice(newIndex)
    songList[0] = newSong
  }
  sessionStorage.setItem('SONG_LIST', JSON.stringify(songList))
}
