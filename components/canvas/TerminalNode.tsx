import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function TerminalNode({ position = [0, 40, -180] }: { position?: [number, number, number] }) {
  const frameRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    const time = state.clock.elapsedTime
    if (frameRef.current) {
      // Subtle float
      frameRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.5
    }
  })

  return (
    <group ref={frameRef} position={new THREE.Vector3(...position)}>
      {/* Outer frame brackets */}
      <mesh position={[-15, 0, 0]}>
        <boxGeometry args={[0.5, 20, 2]} />
        <meshStandardMaterial color="#00D4FF" emissive="#00D4FF" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[15, 0, 0]}>
        <boxGeometry args={[0.5, 20, 2]} />
        <meshStandardMaterial color="#00D4FF" emissive="#00D4FF" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Top and bottom bars */}
      <mesh position={[0, 10, 0]}>
        <boxGeometry args={[30.5, 0.5, 2]} />
        <meshStandardMaterial color="#00D4FF" emissive="#00D4FF" emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[0, -10, 0]}>
        <boxGeometry args={[30.5, 0.5, 2]} />
        <meshStandardMaterial color="#00D4FF" emissive="#00D4FF" emissiveIntensity={0.2} />
      </mesh>

      {/* Screen background glow */}
      <mesh position={[0, 0, -1]}>
        <planeGeometry args={[30, 20]} />
        <meshBasicMaterial color="#050810" transparent opacity={0.5} />
      </mesh>
      
      {/* Terminal background particles / flux */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={100}
            array={new Float32Array(300).map(() => (Math.random() - 0.5) * 30)}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial color="#00FF88" size={0.1} transparent opacity={0.3} />
      </points>

      <pointLight color="#00D4FF" intensity={5} distance={30} decay={2} />
    </group>
  )
}
