import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { usePortfolioStore } from '@/store/usePortfolioStore'

const PACKET_COUNT = 1500
const TUNNEL_LENGTH = 100
const TUNNEL_RADIUS = 8

// Helper to generate a random point strictly within a cylindrical shell
function getCylinderPoint(radius: number, length: number) {
  const theta = Math.random() * Math.PI * 2
  // We want particles primarily on the outer shell, with some variance
  const r = radius * (0.8 + Math.random() * 0.4)
  const z = (Math.random() - 0.5) * length
  return new THREE.Vector3(Math.cos(theta) * r, Math.sin(theta) * r, z)
}

export function KafkaHighway({ position = [0, 0, -30] }: { position?: [number, number, number] }) {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  
  // We don't read scroll directly for speed per say, but we can hook it up later if requested.
  // For now we use the global clock.
  
  // Pre-compute original positions and colors
  const { positions, colors, speeds } = useMemo(() => {
    const pos = new Float32Array(PACKET_COUNT * 3)
    const col = new Float32Array(PACKET_COUNT * 3)
    const spd = new Float32Array(PACKET_COUNT)

    const colorPalette = [
      new THREE.Color('#00D4FF'), // Electric Blue
      new THREE.Color('#00FF88'), // Terminal Green
      new THREE.Color('#8B5CF6'), // Purple (Topics)
      new THREE.Color('#FF3B3B'), // Red (Errors/Retry)
    ]

    for (let i = 0; i < PACKET_COUNT; i++) {
      const p = getCylinderPoint(TUNNEL_RADIUS, TUNNEL_LENGTH)
      pos[i * 3 + 0] = p.x
      pos[i * 3 + 1] = p.y
      pos[i * 3 + 2] = p.z

      const c = colorPalette[Math.floor(Math.random() * colorPalette.length)]
      col[i * 3 + 0] = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b

      // Speeds vary so it looks like different QoS queues
      spd[i] = 10 + Math.random() * 30
    }

    return { positions: pos, colors: col, speeds: spd }
  }, [])

  const initialPositions = useRef(positions.slice())

  useFrame((state, delta) => {
    if (!meshRef.current) return

    const dummy = new THREE.Object3D()

    for (let i = 0; i < PACKET_COUNT; i++) {
      // Current positions
      let x = positions[i * 3 + 0]
      let y = positions[i * 3 + 1]
      let z = positions[i * 3 + 2]

      // Move along Z axis (hyperdrive effect towards camera, i.e. +Z direction)
      z += speeds[i] * delta

      // If particle goes past a certain point, reset it back to the start of the tunnel
      if (z > TUNNEL_LENGTH / 2) {
        z = -TUNNEL_LENGTH / 2
      }

      // Update position array
      positions[i * 3 + 2] = z

      dummy.position.set(x, y, z)
      
      // We can stretch them along Z to look like streaks using scale
      dummy.scale.set(0.1, 0.1, 2.0)
      
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    }

    meshRef.current.instanceMatrix.needsUpdate = true
  })

  // We place the tunnel grouped around the given position
  return (
    <group position={new THREE.Vector3(...position)}>
      <instancedMesh ref={meshRef} args={[undefined, undefined, PACKET_COUNT]}>
        {/* We use a simple cylinder or box as the "streak" */}
        <boxGeometry args={[0.2, 0.2, 1]}>
          <instancedBufferAttribute attach="attributes-color" args={[colors, 3]} />
        </boxGeometry>
        <meshBasicMaterial vertexColors toneMapped={false} transparent opacity={0.8} />
      </instancedMesh>
    </group>
  )
}
