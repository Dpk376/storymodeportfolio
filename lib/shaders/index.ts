export const wireframeVert = `
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vUv = uv;
  vPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

export const wireframeFrag = `
uniform vec3 uColor;
uniform float uTime;
varying vec3 vPosition;

void main() {
  // Simple pulsing glow effect
  float glow = 0.8 + 0.2 * sin(uTime * 2.0);
  gl_FragColor = vec4(uColor * glow, 1.0);
}
`

export const particleVert = `
uniform float uTime;
attribute float aSpeed;
attribute float aRandom;

varying float vAlpha;

void main() {
  vec3 pos = position;
  pos.z += uTime * aSpeed * 100.0;
  
  // Wrap around logic for tunnel
  pos.z = mod(pos.z, 200.0) - 100.0;
  
  vAlpha = smoothstep(-100.0, -80.0, pos.z) * smoothstep(100.0, 80.0, pos.z);
  
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = 4.0 * (1.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}
`

export const particleFrag = `
uniform vec3 uColor;
varying float vAlpha;

void main() {
  float dist = length(gl_PointCoord - vec2(0.5));
  if (dist > 0.5) discard; // circle
  
  gl_FragColor = vec4(uColor, (0.5 - dist) * 2.0 * vAlpha);
}
`
