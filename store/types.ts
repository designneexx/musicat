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
  favoritesTracks: Track[]
  favoritesArtists: Artist[]
  playlists: Album[]
  profile: UserProfile | null
}

export type UserProfile = {
  avatar_url: string
  email: string
  grant: number
  id: number
  name: string
  token: string
}

export type ShortAlbum = {
  id: number
  image: string
  title: string
}

export interface Album extends ShortAlbum {
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
  album: ShortAlbum
}

export type Artist = {
  id: number
  name: string
}

export type ActivePlaylist = {
  album: null | ShortAlbum
  tracks: Track[]
}

export type Playlist = {
  active: ActivePlaylist
}

export type SetSiblingAudioTrack = {
  playlist: Track[]
  track: Track | null
}

export type SetPlayAudioTrack = {
  track: Track | null
  currentTrack: Track
  paused: boolean
}
