import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function SimpleQuantumEffect() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.rotation.y = time * 0.2;
      meshRef.current.rotation.x = time * 0.1;
    }
  });
  return (
    <mesh ref={meshRef}>
      <boxGeometry {...{ args: [2, 2, 2] }} />
      <meshBasicMaterial {...{ color: "#67e8f9", wireframe: true }} />
    </mesh>
  );
}

export default function QuantumScene() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: "transparent" }}
        dpr={[0.5, 1]}
      >
        <ambientLight {...{ intensity: 0.5 }} />
        <SimpleQuantumEffect />
      </Canvas>
    </div>
  );
}
