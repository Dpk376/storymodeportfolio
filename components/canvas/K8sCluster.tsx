import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const POD_COUNT = 80
const CLUSTER_RADIUS = 20

export function K8sCluster({ position = [0, 20, -120] }: { position?: [number, number, number] }) {
  const meshRef = useRef<THREE.InstancedMesh>(null)

  const { positions, randomSpeeds } = useMemo(() => {
    const pos = new Float32Array(POD_COUNT * 3)
    const spd = new Float32Array(POD_COUNT)

    for (let i = 0; i < POD_COUNT; i++) {
      // Gaussian-like distribution around the center using multiple randoms
      const r = (Math.random() + Math.random()) * 0.5 * CLUSTER_RADIUS
      const theta = Math.random() * Math.PI * 2
      const y = (Math.random() - 0.5) * 15

      pos[i * 3 + 0] = Math.cos(theta) * r
      pos[i * 3 + 1] = y
      pos[i * 3 + 2] = Math.sin(theta) * r

      spd[i] = 0.2 + Math.random() * 0.8
    }

    return { positions: pos, randomSpeeds: spd }
  }, [])

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.elapsedTime
    const dummy = new THREE.Object3D()

    for (let i = 0; i < POD_COUNT; i++) {
      const x = positions[i * 3 + 0]
      const baseY = positions[i * 3 + 1]
      const z = positions[i * 3 + 2]

      // Pods breathe/float up and down
      const y = baseY + Math.sin(time * randomSpeeds[i] + i) * 2

      dummy.position.set(x, y, z)
      
      // Slow rotation on axes
      dummy.rotation.x = time * 0.1 * randomSpeeds[i]
      dummy.rotation.y = time * 0.2 * randomSpeeds[i]
      
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    }

    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <group position={new THREE.Vector3(...position)}>
      {/* Central control plane node */}
      <mesh position={[0, 0, 0]}>
        <octahedronGeometry args={[4, 0]} />
        <meshStandardMaterial 
          color="#00D4FF" 
          emissive="#00D4FF" 
          emissiveIntensity={0.5} 
          wireframe={false} 
          transparent opacity={0.8}
        />
      </mesh>

      <instancedMesh ref={meshRef} args={[undefined, undefined, POD_COUNT]}>
        {/* Hexagonal pods */}
        <cylinderGeometry args={[1, 1, 1.5, 6]} />
        <meshStandardMaterial 
          color="#F0F4FF" 
          metalness={0.5} 
          roughness={0.1}
          transparent opacity={0.6}
        />
      </instancedMesh>
      
      <pointLight color="#00D4FF" intensity={10} distance={50} decay={2} />
    </group>
  )
}
