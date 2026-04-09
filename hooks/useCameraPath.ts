import { useFrame } from '@react-three/fiber'
import { usePortfolioStore } from '@/store/usePortfolioStore'
import { getCameraState } from '@/lib/cameraPath'
import * as THREE from 'three'

// Smoothly interpolate the camera position/target based on scroll progress
export function useCameraPath() {
  const progress = usePortfolioStore((s) => s.scrollProgress)
  const targetObj = new THREE.Vector3()
  const mouse = new THREE.Vector2()

  // Capture mouse movement for parallax
  if (typeof window !== 'undefined') {
    window.addEventListener('mousemove', (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
    })
  }

  useFrame(({ camera }) => {
    const { position, target } = getCameraState(progress)
    
    // Weighted inertia (0.05 vs previous 0.1)
    camera.position.lerp(position, 0.05)
    
    // Mouse parallax offset (looking slightly towards mouse)
    const parallaxX = mouse.x * 2
    const parallaxY = mouse.y * 2
    const finalTarget = target.clone().add(new THREE.Vector3(parallaxX, parallaxY, 0))
    
    targetObj.lerp(finalTarget, 0.05)
    camera.lookAt(targetObj)
  })
}
