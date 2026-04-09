import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { usePortfolioStore } from '@/store/usePortfolioStore'

export function Ghost({ position = [-40, 40, -160] }: { position?: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const unlockGhost = usePortfolioStore((s) => s.unlockGhost)
  const ghostFound = usePortfolioStore((s) => s.easterEggs.ghostFound)
  const [hovered, setHover] = useState(false)

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.elapsedTime
    // Ghost floating behavior
    meshRef.current.position.y = position[1] + Math.sin(time * 1.5) * 2
    meshRef.current.rotation.y = time * 0.5
  })

  const handleClick = (e: any) => {
    e.stopPropagation()
    if (!ghostFound) {
      unlockGhost()
    }
  }

  return (
    <group>
      <mesh
        ref={meshRef}
        position={new THREE.Vector3(...position)}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHover(true)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={(e) => {
          e.stopPropagation()
          setHover(false)
          document.body.style.cursor = 'auto'
        }}
        onClick={handleClick}
      >
        <sphereGeometry args={[2, 32, 32]} />
        {/* If found, turns electric blue, else is barely visible */}
        <meshStandardMaterial
          color={ghostFound ? "#00D4FF" : "#F0F4FF"}
          emissive={ghostFound ? "#00D4FF" : "#F0F4FF"}
          emissiveIntensity={ghostFound ? 2 : (hovered ? 0.5 : 0.1)}
          transparent
          opacity={ghostFound ? 0.8 : (hovered ? 0.5 : 0.2)}
          wireframe={!ghostFound}
        />
      </mesh>
      
      {/* Little light to indicate it's there if you look closely */}
      {!ghostFound && (
        <pointLight position={new THREE.Vector3(...position)} color="#F0F4FF" intensity={0.5} distance={10} />
      )}
      {ghostFound && (
        <pointLight position={new THREE.Vector3(...position)} color="#00D4FF" intensity={5} distance={20} />
      )}
    </group>
  )
}
