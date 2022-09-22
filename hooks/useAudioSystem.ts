import { useAppSelector } from '@/store'

export function useAudioSystem() {
  const playlist = useAppSelector(({ playlist }) => playlist.active)
  const paused = useAppSelector(({ audioSystem }) => audioSystem.paused)
  const loop = useAppSelector(({ audioSystem }) => audioSystem.loop)
  const muted = useAppSelector(({ audioSystem }) => audioSystem.muted)
  const volume = useAppSelector(({ audioSystem }) => audioSystem.volume)
  const active = useAppSelector(({ audioSystem }) => audioSystem.active)

  return {
    playlist,
    paused,
    loop,
    muted,
    volume,
    active,
  }
}
