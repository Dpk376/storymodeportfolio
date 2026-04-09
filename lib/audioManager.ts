import { Howl } from 'howler'

type TrackName = 'boot' | 'gateway' | 'highway' | 'city' | 'vault' | 'k8s' | 'space' | 'terminal'

class AudioManager {
  private tracks: Map<TrackName, Howl> = new Map()
  private currentTrack: TrackName | null = null
  private enabled: boolean = false

  constructor() {
    if (typeof window !== 'undefined') {
      // Lazy load tracks — URLs will assume audio files are placed in public/audio later
      this.initTrack('boot', '/audio/boot.mp3')
      this.initTrack('gateway', '/audio/gateway.mp3')
    }
  }

  private initTrack(name: TrackName, src: string) {
    this.tracks.set(name, new Howl({
      src: [src],
      loop: true,
      volume: 0,
    }))
  }

  public setEnabled(enabled: boolean) {
    this.enabled = enabled
    if (!enabled) {
      this.tracks.forEach(t => t.stop())
    } else if (this.currentTrack) {
      const track = this.tracks.get(this.currentTrack)
      if (track && !track.playing()) {
        track.play()
        track.fade(0, 1, 2000)
      }
    }
  }

  public crossfadeTo(name: TrackName) {
    if (this.currentTrack === name) return
    const prev = this.currentTrack
    this.currentTrack = name

    if (!this.enabled) return

    if (prev) {
      const pTrack = this.tracks.get(prev)
      if (pTrack) pTrack.fade(pTrack.volume(), 0, 2000)
    }

    const nTrack = this.tracks.get(name)
    if (nTrack) {
      if (!nTrack.playing()) nTrack.play()
      nTrack.fade(0, 1, 2000)
    }
  }
}

export const globalAudio = new AudioManager()
