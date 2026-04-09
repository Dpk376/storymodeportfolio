import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const CITY_RADIUS = 30
const BUILDING_COUNT = 300

export function MicroservicesCity({ position = [0, 0, -80] }: { position?: [number, number, number] }) {
  const meshRef = useRef<THREE.InstancedMesh>(null)

  const { positions, colors, heightScales, oscillationSpeeds, phases } = useMemo(() => {
    const pos = new Float32Array(BUILDING_COUNT * 3)
    const col = new Float32Array(BUILDING_COUNT * 3)
    const asc = new Float32Array(BUILDING_COUNT)
    const spd = new Float32Array(BUILDING_COUNT)
    const phs = new Float32Array(BUILDING_COUNT)

    const palette = [
      new THREE.Color('#00D4FF'), // Electric Blue
      new THREE.Color('#00D4FF').multiplyScalar(0.5), 
      new THREE.Color('#00FF88'), // Green 
      new THREE.Color('#F0F4FF'), // White
    ]

    for (let i = 0; i < BUILDING_COUNT; i++) {
      // Circular city grid placement
      const r = Math.sqrt(Math.random()) * CITY_RADIUS
      const theta = Math.random() * Math.PI * 2
      
      const x = Math.cos(theta) * r
      const z = Math.sin(theta) * r
      // Distribute heights. Taller ones near center
      const maxH = 15 - (r / CITY_RADIUS) * 12
      const hScale = 1 + Math.random() * maxH
      
      // y is half of hScale because we scale a 1x1x1 box, origin is center
      const y = hScale / 2

      pos[i * 3 + 0] = x
      pos[i * 3 + 1] = y
      pos[i * 3 + 2] = z

      asc[i] = hScale
      spd[i] = 0.5 + Math.random() * 1.5
      phs[i] = Math.random() * Math.PI * 2

      // Color mapping
      const c = palette[Math.floor(Math.random() * palette.length)]
      col[i * 3 + 0] = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b
    }

    return { positions: pos, colors: col, heightScales: asc, oscillationSpeeds: spd, phases: phs }
  }, [])

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.elapsedTime
    const dummy = new THREE.Object3D()

    for (let i = 0; i < BUILDING_COUNT; i++) {
      const x = positions[i * 3 + 0]
      const defaultY = positions[i * 3 + 1]
      const z = positions[i * 3 + 2]
      
      const hScale = heightScales[i]

      // Oscillate height to simulate "elastic scaling / pod autoscaling"
      const scaleVariance = 1 + Math.sin(time * oscillationSpeeds[i] + phases[i]) * 0.1
      const currentHScale = hScale * scaleVariance
      const y = currentHScale / 2

      dummy.position.set(x, y - 5, z) // -5 offsets the city base downward slightly
      
      const wScale = 1 + Math.random() * 0.5
      dummy.scale.set(wScale, currentHScale, wScale)

      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    }

    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <group position={new THREE.Vector3(...position)}>
      {/* Platform/Base */}
      <mesh position={[0, -5.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[CITY_RADIUS + 5, 64]} />
        <meshBasicMaterial color="#050810" transparent opacity={0.8} />
      </mesh>
      
      {/* Grid over platform */}
      <mesh position={[0, -5.4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[CITY_RADIUS + 5, 64]} />
        <meshBasicMaterial color="#00D4FF" wireframe transparent opacity={0.1} />
      </mesh>

      <instancedMesh ref={meshRef} args={[undefined, undefined, BUILDING_COUNT]}>
        <boxGeometry args={[1, 1, 1]}>
          <instancedBufferAttribute attach="attributes-color" args={[colors, 3]} />
        </boxGeometry>
        <meshStandardMaterial 
          vertexColors 
          metalness={0.9} 
          roughness={0.1} 
          emissiveIntensity={0.5}
          envMapIntensity={1}
        />
      </instancedMesh>
      
      <pointLight color="#00FF88" intensity={2} distance={50} position={[0, 5, 0]} decay={2} />
    </group>
  )
}
