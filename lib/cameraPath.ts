import * as THREE from 'three'

// The camera travels along a CatmullRom curve traversing the 8 checkpoints.
// The primary movement is moving deeper into the Z-axis, with some vertical and lateral shifts.

export const positionPoints = [
  new THREE.Vector3(0, 2, 80),      // 0 - Boot (Slow)
  new THREE.Vector3(-2, 1, 50),     // 1 - Gateway (Med)
  new THREE.Vector3(0, 0, 10),      // 2 - Load Balancer (Fast)
  new THREE.Vector3(2, -1, -30),    // 3 - Kafka Highway (Fast++)
  new THREE.Vector3(0, -2, -80),    // 4 - Microservices City (Slow)
  new THREE.Vector3(0, -20, -80),   // 5 - Database Vault (Slow drop)
  new THREE.Vector3(0, 20, -120),   // 6 - K8s Cloud (Fast rise)
  new THREE.Vector3(0, 40, -160),   // 7 - Open Source Space (Slow)
  new THREE.Vector3(0, 40, -180),   // 8 - Terminal (Slow)
]

export const lookAtPoints = [
  new THREE.Vector3(0, 2, 60),
  new THREE.Vector3(-2, 1, 30),
  new THREE.Vector3(0, 0, -10),
  new THREE.Vector3(2, -1, -50),
  new THREE.Vector3(0, -2, -100),
  new THREE.Vector3(0, -25, -80),  
  new THREE.Vector3(0, 25, -140),  
  new THREE.Vector3(0, 45, -180),
  new THREE.Vector3(0, 40, -200),
]

export const cameraPositionSpline = new THREE.CatmullRomCurve3(positionPoints, false, 'catmullrom', 0.5)
export const cameraTargetSpline = new THREE.CatmullRomCurve3(lookAtPoints, false, 'catmullrom', 0.5)

export function getCameraState(progress: number) {
  const t = Math.max(0, Math.min(1, progress))
  return {
    position: cameraPositionSpline.getPoint(t),
    target: cameraTargetSpline.getPoint(t)
  }
}
