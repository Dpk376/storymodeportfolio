import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { CameraRig } from './CameraRig'
import { WireframeEngineer } from './WireframeEngineer'
import { PostProcessing } from './PostProcessing'
import { Supernova } from './Supernova'
import { KafkaHighway } from './KafkaHighway'
import { MicroservicesCity } from './MicroservicesCity'
import { DatabaseVault } from './DatabaseVault'
import { K8sCluster } from './K8sCluster'
import { OpenSourceOrbit } from './OpenSourceOrbit'
import { Ghost } from './Ghost'
import { TerminalNode } from './TerminalNode'
export function Experience() {
  return (
    <Canvas dpr={[1, 2]} gl={{ antialias: false, powerPreference: 'high-performance' }}>
      <color attach="background" args={['#050810']} />
      
      <CameraRig />
      
      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#00D4FF" />
      
      {/* Scenes will be conditionally rendered based on scroll progress or fully mounted with LOD */}
      <Suspense fallback={null}>
        <WireframeEngineer />
        
        {/* We will add checkpoints here in subsequent sprints */}
        <Supernova position={[0, 0, 30]} />
        <KafkaHighway position={[2, -1, -30]} />
        <MicroservicesCity position={[0, -2, -80]} />
        <DatabaseVault position={[0, -25, -80]} />
        <K8sCluster position={[0, 20, -120]} />
        <OpenSourceOrbit position={[0, 40, -160]} />
        <Ghost position={[-40, 40, -160]} />
        <TerminalNode position={[0, 40, -180]} />
        {/* <Gateway /> */}
      </Suspense>

      <PostProcessing />
    </Canvas>
  )
}
