export class OnceAudio {
  private static instance: null | HTMLAudioElement = null
  audio: HTMLAudioElement

  constructor(src: string) {
    const audio = OnceAudio.getInstance()

    if (audio) {
      if (audio.src !== src) audio.src = src

      this.audio = audio

      return
    }

    OnceAudio.instance = new Audio(src)

    this.audio = OnceAudio.instance
  }

  static getInstance() {
    return OnceAudio.instance
  }
}