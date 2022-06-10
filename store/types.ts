export type MusiCatStorage = {
  theme: Theme
  audioSystem: AudioSystem
  playlist: Playlist
  user: User
}

export type Theme = {
  value: string
}

export type AudioSystem = {
  loop: boolean
  muted: boolean
  volume: number
  paused: boolean
  active: AudioItem | null
}

export type User = {
  favoritesTracks: FavoriteTrack[]
  favoritesArtists: Artist[]
  playlists: Playlists[]
}

export type FavoriteTrack = {
  id: string
  track: Track
}

export type Playlists = {
  id: number
  image: string
  title: string
  excerpt: string
  tracks: Track[]
}

export type AudioItem = {
  isLoaded: boolean
  isLoading: boolean
  isError: boolean
  track: Track
}

export type Track = {
  id: number
  src: string
  artist: Artist
  title: string
  image: string
}

export type AppState = {
  data: MusiCatStorage
}

export type Artist = {
  id: number
  name: string
}

export type Playlist = {
  active: Track[]
}
