import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { wireframeVert, wireframeFrag } from '@/lib/shaders'

export function WireframeEngineer() {
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  
  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime()
    }
  })

  return (
    <group position={[0, 0, -135]}>
      {/* Fallback to simple box geometry if model isn't loaded */}
      <mesh>
        <boxGeometry args={[1, 2, 0.5, 4, 8, 2]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={wireframeVert}
          fragmentShader={wireframeFrag}
          uniforms={{
            uTime: { value: 0 },
            uColor: { value: new THREE.Color('#00D4FF') }
          }}
          wireframe={true}
          transparent={true}
        />
      </mesh>
    </group>
  )
}
