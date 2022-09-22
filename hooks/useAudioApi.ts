import { Player } from 'tone'

export function useAudioApi(url: string) {
  const player = new Player(url)

  let a = player.toDestination()

  a.start()
}
