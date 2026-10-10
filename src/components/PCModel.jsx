import { useRef, useMemo, useEffect } from "react";
import { useGLTF, Float } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Agar monitor ki back dikhe to isay Math.PI / 6 kar do
const BASE_Y = Math.PI / 6 + Math.PI;
const BASE_X = 0.12;

const SENSITIVITY = 0.008; // drag kitna asar kare
const MAX_X = 0.5;         // upar/neeche limit
const SMOOTH = 0.12;       // kam = zyada smooth
const RETURN = true;       // true = chhorne par wapas center

const MODEL_X_RATIO = 0.25; // model right half ke center ma (0.25 = section width ka 25%)

export default function PCModel() {
  const { scene } = useGLTF("/pc-model/scene.gltf");
  const { viewport } = useThree();
  const groupRef = useRef();

  const drag = useRef({ active: false, lastX: 0, lastY: 0 });
  const target = useRef({ y: 0, x: 0 });

  // drag sirf data-drag-zone ke andar shuru ho, baqi window par track ho
  useEffect(() => {
    const onDown = (e) => {
      if (!e.target.closest?.("[data-drag-zone]")) return;
      drag.current.active = true;
      drag.current.lastX = e.clientX;
      drag.current.lastY = e.clientY;
    };

    const onMove = (e) => {
      if (!drag.current.active) return;
      const dx = e.clientX - drag.current.lastX;
      const dy = e.clientY - drag.current.lastY;
      drag.current.lastX = e.clientX;
      drag.current.lastY = e.clientY;

      target.current.y += dx * SENSITIVITY;
      target.current.x = THREE.MathUtils.clamp(
        target.current.x + dy * SENSITIVITY,
        -MAX_X,
        MAX_X
      );
    };

    const onUp = () => {
      drag.current.active = false;
    };

    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);

    return () => {
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, []);

  const { model, scale } = useMemo(() => {
    const cloned = scene.clone(true);
    const box = new THREE.Box3().setFromObject(cloned);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    cloned.position.sub(center);

    const maxDim = Math.max(size.x, size.y, size.z);
    return { model: cloned, scale: 2.6 / maxDim };
  }, [scene]);

  useFrame(() => {
    const g = groupRef.current;
    if (!g) return;

    if (RETURN && !drag.current.active) {
      target.current.y = THREE.MathUtils.lerp(target.current.y, 0, 0.04);
      target.current.x = THREE.MathUtils.lerp(target.current.x, 0, 0.04);
    }

    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, BASE_Y + target.current.y, SMOOTH);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, BASE_X + target.current.x, SMOOTH);
  });

  return (
    <Float speed={1.2} rotationIntensity={0} floatIntensity={0.25}>
      {/* position: model ko right half ke center ma rakhta ha */}
      <group position={[viewport.width * MODEL_X_RATIO, 0, 0]}>
        <group ref={groupRef} scale={scale}>
          <primitive object={model} />
        </group>
      </group>
    </Float>
  );
}

useGLTF.preload("/pc-model/scene.gltf");