import { db, storage, getServerTimeStamp } from '../firebase.example'

export const getArtists = () => {
  return db.collection('artists').orderBy('name')
}

export const addArtist = (data: unknown) => {
  data.createdAt = getServerTimeStamp()
  return db.collection('artists').add(data)
}

export const uploadArtistToStorage = (file: File) => {
  const { name } = file
  return storage.ref(`artists-images/${name}`).put(file)
}

export const getArtistImageURL = (fileName: string) => {
  return storage.ref('artists-images').child(fileName).getDownloadURL()
}

export const searchArtist = (name: string) => {
  return db.collection('artists').where('names', 'array-contains', name).get()
}

export const getRecentArtists = (limit = 8) => {
  return db.collection('artists').orderBy('createdAt', 'desc').limit(limit).get()
}
