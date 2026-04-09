import { SCENES } from '@/lib/sceneConfig'

export function useVariableSpeed(progress: number) {
  // Can be mapped with custom ease algorithms from GSAP CustomEase
  // For now, this returns a multiplier based on the active scene
  const t = Math.max(0, Math.min(1, progress))
  const scene = SCENES.find(s => t >= s.range[0] && t <= s.range[1])
  
  if (!scene) return 1
  switch (scene.speed) {
    case 'SLOW': return 0.5
    case 'MEDIUM': return 1
    case 'FAST': return 1.5
    case 'FAST++': return 2.5
    default: return 1
  }
}
