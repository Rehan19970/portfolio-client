import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'

/* === Globe Model === */
function GlobeModel() {
  const { scene } = useGLTF('/scene.gltf')
  return <primitive object={scene} scale={0.7} />
}

/* === Globe Component === */
export default function Globe() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 50 }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[2, 2, 2]} intensity={1.2} />
      <Suspense fallback={null}>
        <GlobeModel />
      </Suspense>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        autoRotate
        autoRotateSpeed={1}
      />
    </Canvas>
  )
}