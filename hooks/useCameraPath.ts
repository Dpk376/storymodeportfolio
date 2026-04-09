import { useFrame } from '@react-three/fiber'
import { usePortfolioStore } from '@/store/usePortfolioStore'
import { getCameraState } from '@/lib/cameraPath'
import * as THREE from 'three'

// Smoothly interpolate the camera position/target based on scroll progress
export function useCameraPath() {
  const progress = usePortfolioStore((s) => s.scrollProgress)
  const targetObj = new THREE.Vector3()

  useFrame(({ camera }) => {
    const { position, target } = getCameraState(progress)
    camera.position.lerp(position, 0.1)
    targetObj.lerp(target, 0.1)
    camera.lookAt(targetObj)
  })
}
