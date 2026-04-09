import { useRef } from 'react'
import { PerspectiveCamera } from '@react-three/drei'
import { useCameraPath } from '@/hooks/useCameraPath'
import * as THREE from 'three'

export function CameraRig() {
  // Custom hook that interpolates camera path
  useCameraPath()

  return (
    <PerspectiveCamera 
      makeDefault 
      position={[0, 2, 80]} 
      fov={45} 
      near={0.1} 
      far={1000} 
    />
  )
}
