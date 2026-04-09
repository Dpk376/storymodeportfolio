import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type ViewMode = 'ENGINEER' | 'STORY'
export type Checkpoint = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

interface PortfolioState {
  // Navigation & Progress
  scrollProgress: number
  checkpoint: Checkpoint
  
  // Settings & Modes
  mode: ViewMode
  audioEnabled: boolean
  
  // Visitor Identity
  visitorName: string
  visitCount: number
  isReturnVisitor: boolean
  
  // Interactive Triggers
  incidentActive: boolean
  easterEggs: {
    ghostFound: boolean
    konamiActive: boolean
  }
  
  // Actions
  setScrollProgress: (progress: number) => void
  setCheckpoint: (checkpoint: Checkpoint) => void
  setMode: (mode: ViewMode) => void
  setAudioEnabled: (enabled: boolean) => void
  setVisitorName: (name: string) => void
  hydrateVisitor: () => void
  triggerIncident: (active: boolean) => void
  unlockGhost: () => void
  activateKonami: (active: boolean) => void
}

export const usePortfolioStore = create<PortfolioState>()(
  persist(
    (set, get) => ({
      // Math & progression
      scrollProgress: 0,
      checkpoint: 0,
      
      // Default settings
      mode: 'STORY',
      audioEnabled: false,
      
      // Visitor Data
      visitorName: '',
      visitCount: 0,
      isReturnVisitor: false,
      
      // Triggers
      incidentActive: false,
      easterEggs: {
        ghostFound: false,
        konamiActive: false
      },

      setScrollProgress: (scrollProgress) => set({ scrollProgress }),
      setCheckpoint: (checkpoint) => set({ checkpoint }),
      setMode: (mode) => set({ mode }),
      setAudioEnabled: (audioEnabled) => set({ audioEnabled }),
      setVisitorName: (visitorName) => set({ visitorName }),
      
      hydrateVisitor: () => {
        const count = get().visitCount + 1
        set({
          isReturnVisitor: get().visitCount > 0,
          visitCount: count,
        })
      },
      
      triggerIncident: (active) => set({ incidentActive: active }),
      unlockGhost: () => set({ easterEggs: { ...get().easterEggs, ghostFound: true } }),
      activateKonami: (active) => set({ easterEggs: { ...get().easterEggs, konamiActive: active } }),
    }),
    {
      name: 'dpk-portfolio-storage',
      storage: createJSONStorage(() => {
        if (typeof window === 'undefined') {
          return {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
          }
        }
        return localStorage
      }),
      // Only persist identity and settings
      partialize: (state) => ({
        visitorName: state.visitorName,
        visitCount: state.visitCount,
        mode: state.mode,
        audioEnabled: state.audioEnabled,
        easterEggs: state.easterEggs,
      }),
    }
  )
)
