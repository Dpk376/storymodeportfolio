import { EffectComposer, Bloom, ChromaticAberration, Vignette, Noise } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'

export function PostProcessing() {
  return (
    <EffectComposer multisampling={4}>
      <Bloom 
        intensity={0.4} 
        luminanceThreshold={0.2} 
        luminanceSmoothing={0.9} 
      />
      <ChromaticAberration 
        offset={new THREE.Vector2(0.002, 0.002)} 
        blendFunction={BlendFunction.NORMAL} 
        radialModulation={false}
        modulationOffset={0}
      />
      <Vignette 
        eskil={false} 
        offset={0.1} 
        darkness={0.4} 
      />
      <Noise 
        opacity={0.03} 
        blendFunction={BlendFunction.OVERLAY} 
      />
    </EffectComposer>
  )
}
