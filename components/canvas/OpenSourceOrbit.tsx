import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function OpenSourceOrbit({ position = [0, 40, -160] }: { position?: [number, number, number] }) {
  const outerRingRef = useRef<THREE.Group>(null)
  const middleRingRef = useRef<THREE.Group>(null)
  const innerRingRef = useRef<THREE.Group>(null)
  const centerSphereRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const time = state.clock.elapsedTime
    
    // Orbital rotation
    if (outerRingRef.current) outerRingRef.current.rotation.y = time * 0.05
    if (middleRingRef.current) middleRingRef.current.rotation.y = -time * 0.1
    if (innerRingRef.current) innerRingRef.current.rotation.y = time * 0.15

    // Mild wobble to make it organic
    if (outerRingRef.current) outerRingRef.current.rotation.z = Math.sin(time * 0.2) * 0.1
    
    // Center pulse
    if (centerSphereRef.current) {
      const scale = 1 + Math.sin(time * 2) * 0.05
      centerSphereRef.current.scale.set(scale, scale, scale)
    }
  })

  return (
    <group position={new THREE.Vector3(...position)} rotation={[-Math.PI / 6, 0, 0]}>
      {/* Core represents Fineract / Open Source Project */}
      <mesh ref={centerSphereRef}>
        <sphereGeometry args={[5, 64, 64]} />
        <meshStandardMaterial 
          color="#00D4FF" 
          emissive="#00D4FF" 
          emissiveIntensity={1}
          wireframe={true} 
        />
      </mesh>

      {/* Primary Light Source */}
      <pointLight color="#00D4FF" intensity={50} distance={100} decay={2} />

      {/* Orbit Rings & Orbits (PRs/Commits) */}
      
      {/* Outer Orbit (Ecosystem) */}
      <group ref={outerRingRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[25, 25.2, 64]} />
          <meshBasicMaterial color="#F0F4FF" side={THREE.DoubleSide} transparent opacity={0.3} />
        </mesh>
        {/* Satellites */}
        {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, i) => (
          <mesh key={`outer-${i}`} position={[Math.cos(angle) * 25, 0, Math.sin(angle) * 25]}>
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshBasicMaterial color="#00FF88" />
          </mesh>
        ))}
      </group>

      {/* Middle Orbit (Core Contributors) */}
      <group ref={middleRingRef} rotation={[0.2, 0, 0.1]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[18, 18.2, 64]} />
          <meshBasicMaterial color="#F0F4FF" side={THREE.DoubleSide} transparent opacity={0.5} />
        </mesh>
        {[0, (2 * Math.PI) / 3, (4 * Math.PI) / 3].map((angle, i) => (
          <mesh key={`mid-${i}`} position={[Math.cos(angle) * 18, 0, Math.sin(angle) * 18]}>
            <sphereGeometry args={[0.8, 16, 16]} />
            <meshBasicMaterial color="#FF9500" />
          </mesh>
        ))}
      </group>

      {/* Inner Orbit (Direct Reviews/Merges) */}
      <group ref={innerRingRef} rotation={[-0.2, 0, -0.1]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[12, 12.3, 64]} />
          <meshBasicMaterial color="#00D4FF" side={THREE.DoubleSide} transparent opacity={0.8} />
        </mesh>
        <mesh position={[12, 0, 0]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial color="#FF3B3B" />
        </mesh>
        <mesh position={[-12, 0, 0]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial color="#00D4FF" />
        </mesh>
      </group>
    </group>
  )
}
