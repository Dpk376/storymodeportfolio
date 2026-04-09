import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function DatabaseVault({ position = [0, -30, -80] }: { position?: [number, number, number] }) {
  const outerRingRef = useRef<THREE.Mesh>(null)
  const innerRingRef = useRef<THREE.Mesh>(null)
  const coreRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const time = state.clock.elapsedTime
    
    // Slow, heavy rotation representing secure state
    if (outerRingRef.current) {
      outerRingRef.current.rotation.y = time * 0.1
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.y = -time * 0.15
    }
    
    // Core pulsing slowly
    if (coreRef.current) {
      const pulse = 1 + Math.sin(time * 1.5) * 0.05
      coreRef.current.scale.set(pulse, pulse, pulse)
    }
  })

  return (
    <group position={new THREE.Vector3(...position)}>
      {/* Monolithic Database Core */}
      <mesh ref={coreRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[8, 8, 20, 6]} /> {/* Hexagonal Cylinder */}
        <meshStandardMaterial 
          color="#111111" 
          metalness={0.9} 
          roughness={0.1}
          emissive="#FF3B3B" 
          emissiveIntensity={0.2} 
        />
      </mesh>

      {/* Access Control Rings */}
      <mesh ref={outerRingRef} position={[0, 0, 0]}>
        <torusGeometry args={[14, 0.5, 16, 6]} /> {/* Hexagonal Ring */}
        <meshStandardMaterial color="#FF9500" metalness={1} roughness={0} emissive="#FF9500" emissiveIntensity={0.5} transparent opacity={0.6} />
      </mesh>

      <mesh ref={innerRingRef} position={[0, 5, 0]}>
        <torusGeometry args={[11, 0.2, 16, 100]} />
        <meshStandardMaterial color="#FF3B3B" metalness={1} roughness={0} emissive="#FF3B3B" emissiveIntensity={1} />
      </mesh>
      
      <mesh ref={innerRingRef} position={[0, -5, 0]}>
        <torusGeometry args={[11, 0.2, 16, 100]} />
        <meshStandardMaterial color="#FF3B3B" metalness={1} roughness={0} emissive="#FF3B3B" emissiveIntensity={1} />
      </mesh>

      {/* Security Scanning Beam */}
      <spotLight 
        position={[0, 30, 0]} 
        angle={0.5} 
        penumbra={0.5} 
        color="#FF9500" 
        intensity={200} 
        distance={60} 
      />
      <pointLight color="#FF3B3B" intensity={10} distance={40} decay={2} />
    </group>
  )
}
