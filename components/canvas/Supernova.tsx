import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function Supernova({ position = [0, 0, 40] }: { position?: [number, number, number] }) {
  const coreRef = useRef<THREE.Mesh>(null)
  const ringRef1 = useRef<THREE.Mesh>(null)
  const ringRef2 = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const time = state.clock.elapsedTime
    
    // Core pulsing scaling depending on sine wave
    if (coreRef.current) {
      const scale = 1 + Math.sin(time * 2) * 0.1
      coreRef.current.scale.set(scale, scale, scale)
    }

    // Rings rotating
    if (ringRef1.current) {
      ringRef1.current.rotation.x = time * 0.3
      ringRef1.current.rotation.y = time * 0.5
    }
    
    if (ringRef2.current) {
      ringRef2.current.rotation.x = -time * 0.2
      ringRef2.current.rotation.y = -time * 0.4
    }
  })

  return (
    <group position={new THREE.Vector3(...position)}>
      {/* Outer Glow / Halo */}
      <mesh>
        <sphereGeometry args={[4.5, 32, 32]} />
        <meshBasicMaterial color="#00D4FF" transparent opacity={0.1} />
      </mesh>

      {/* Core Star */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial 
          color="#F0F4FF" 
          emissive="#00D4FF" 
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>

      {/* Ring 1 - Wireframe */}
      <mesh ref={ringRef1}>
        <torusGeometry args={[5, 0.1, 16, 100]} />
        <meshBasicMaterial color="#00FF88" wireframe transparent opacity={0.3} />
      </mesh>

      {/* Ring 2 - Internal Data Ring */}
      <mesh ref={ringRef2} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[3, 0.05, 16, 50]} />
        <meshBasicMaterial color="#FF9500" wireframe transparent opacity={0.5} />
      </mesh>
      
      {/* Intense Point Light attached to the Supernova */}
      <pointLight color="#00D4FF" intensity={50} distance={50} decay={2} />
    </group>
  )
}
