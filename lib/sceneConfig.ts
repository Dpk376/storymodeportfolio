export const SCENES = [
  { id: 0, name: "SYSTEM.INIT", range: [0, 0.08], speed: "SLOW" },
  { id: 1, name: "API.GATEWAY", range: [0.08, 0.18], speed: "MEDIUM" },
  { id: 2, name: "LOAD.BALANCER", range: [0.18, 0.28], speed: "FAST" },
  { id: 3, name: "KAFKA.HIGHWAY", range: [0.28, 0.42], speed: "FAST++" },
  { id: 4, name: "MICROSERVICES.CITY", range: [0.42, 0.58], speed: "SLOW" },
  { id: 5, name: "DATABASE.VAULT", range: [0.58, 0.67], speed: "SLOW" },
  { id: 6, name: "KUBERNETES.CLUSTER", range: [0.67, 0.76], speed: "FAST" },
  { id: 7, name: "OPEN_SOURCE.CONSTELLATION", range: [0.76, 0.88], speed: "SLOW" },
  { id: 8, name: "RESPONSE.TERMINAL", range: [0.88, 1.00], speed: "SLOW" }
]

export function getCheckpointForProgress(progress: number): number {
  const t = Math.max(0, Math.min(1, progress))
  const scene = SCENES.find(s => t >= s.range[0] && t <= s.range[1])
  if (scene) return scene.id
  if (t === 1) return 8
  return 0
}
