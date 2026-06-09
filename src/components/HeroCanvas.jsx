import { Suspense, useRef, Component } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

// A4-proportioned document panel, kept very thin to avoid a blocky feel.
function FloatingDoc({ position, rotation, speed, phase }) {
  const mesh = useRef()
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    mesh.current.position.y = position[1] + Math.sin(t * speed + phase) * 0.11
    mesh.current.rotation.z = rotation[2] + Math.sin(t * 0.35 + phase) * 0.035
    mesh.current.rotation.x = rotation[0] + Math.sin(t * 0.28 + phase + 1) * 0.02
  })
  return (
    <mesh ref={mesh} position={[...position]} rotation={[...rotation]}>
      {/* A4 ratio ≈ 1:1.414 → 0.60 × 0.85 */}
      <boxGeometry args={[0.60, 0.85, 0.008]} />
      <meshStandardMaterial
        color="#C9A84C"
        metalness={0.92}
        roughness={0.08}
        emissive="#C9A84C"
        emissiveIntensity={0.18}
      />
    </mesh>
  )
}

// Thin horizontal line — simulates a line of text on a document face.
function DocLine({ position, rotation, speed, phase, width = 0.33 }) {
  const mesh = useRef()
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    mesh.current.position.y = position[1] + Math.sin(t * speed + phase + 1.2) * 0.07
  })
  return (
    <mesh ref={mesh} position={position} rotation={rotation}>
      <boxGeometry args={[width, 0.016, 0.001]} />
      <meshStandardMaterial
        color="#F0C040"
        metalness={1}
        roughness={0.05}
        emissive="#F0C040"
        emissiveIntensity={0.7}
      />
    </mesh>
  )
}

// Primary ring — rotates on Y, gentle Z wobble.
function PrimaryRing() {
  const mesh = useRef()
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    mesh.current.rotation.y = t * 0.16
    mesh.current.rotation.z = Math.sin(t * 0.22) * 0.07
  })
  return (
    <mesh ref={mesh}>
      <torusGeometry args={[1.18, 0.026, 12, 100]} />
      <meshStandardMaterial
        color="#D4AF37"
        metalness={1}
        roughness={0.04}
        emissive="#C9A84C"
        emissiveIntensity={0.4}
      />
    </mesh>
  )
}

// Secondary ring — tilted 90°, slower rotation for a knowledge-network feel.
function SecondaryRing() {
  const mesh = useRef()
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    mesh.current.rotation.x = Math.PI / 2 + t * 0.1
    mesh.current.rotation.z = Math.sin(t * 0.18 + 1) * 0.06
  })
  return (
    <mesh ref={mesh}>
      <torusGeometry args={[1.18, 0.012, 8, 80]} />
      <meshStandardMaterial
        color="#C9A84C"
        metalness={1}
        roughness={0.1}
        emissive="#C9A84C"
        emissiveIntensity={0.2}
        transparent
        opacity={0.55}
      />
    </mesh>
  )
}

function Scene() {
  const docs = [
    { position: [1.88,  0.22, -0.35], rotation: [0.08, -0.3,  0.05],  speed: 0.88, phase: 0.0 },
    { position: [-1.88, -0.14, -0.2], rotation: [-0.06, 0.36, -0.04], speed: 1.1,  phase: 1.2 },
    { position: [0.42,  1.58,  0.28], rotation: [0.2,   0.1,  0.26],  speed: 0.8,  phase: 2.1 },
    { position: [-0.28, -1.58, 0.48], rotation: [-0.18, -0.2, -0.1],  speed: 1.2,  phase: 0.7 },
    { position: [1.18,  -0.88, 0.88], rotation: [0.1,  -0.1,  0.18],  speed: 1.0,  phase: 3.1 },
  ]

  // Line offsets relative to each doc's local Y — 3 lines per doc face
  const lineYOffsets = [0.22, 0.07, -0.08]
  const lineWidths   = [0.30, 0.22, 0.26]

  return (
    <>
      <ambientLight intensity={0.22} />
      <pointLight position={[4.5, 4, 4]}    intensity={2.4} color="#D4AF37" />
      <pointLight position={[-4, -3, -2]}   intensity={0.55} color="#ffffff" />
      <pointLight position={[0, 0.5, 3.5]}  intensity={0.45} color="#C9A84C" />

      <PrimaryRing />
      <SecondaryRing />

      {docs.map((d, i) => (
        <FloatingDoc key={i} {...d} />
      ))}

      {/* Text lines on the three forward-facing documents */}
      {docs.slice(0, 3).map((d, di) =>
        lineYOffsets.map((yOff, li) => (
          <DocLine
            key={`${di}-${li}`}
            position={[
              d.position[0],
              d.position[1] + yOff,
              d.position[2] + 0.007,
            ]}
            rotation={d.rotation}
            speed={d.speed}
            phase={d.phase + li * 0.25}
            width={lineWidths[li]}
          />
        ))
      )}
    </>
  )
}

class CanvasErrorBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() {
    return this.state.failed ? null : this.props.children
  }
}

export default function HeroCanvas() {
  return (
    <CanvasErrorBoundary>
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 44 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </CanvasErrorBoundary>
  )
}
