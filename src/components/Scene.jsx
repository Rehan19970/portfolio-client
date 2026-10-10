import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Environment } from "@react-three/drei";
import PCModel from "./PCModel";

export default function Scene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.3, 5.2], fov: 35 }}
      gl={{ alpha: true }}
      style={{ width: "100%", height: "100%", background: "transparent" }}
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 5, 5]} intensity={1.2} />
      <pointLight position={[-3, 2, 2]} intensity={2.5} color="#6366f1" />
      <pointLight position={[3, 0.5, 2]} intensity={2} color="#2dd4bf" />

      <Suspense fallback={null}>
        <PCModel />
        <Environment preset="city" environmentIntensity={0.45} />
      </Suspense>
    </Canvas>
  );
}