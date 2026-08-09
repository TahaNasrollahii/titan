'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import * as THREE from 'three';

function CameraRig() {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    // Smoothly interpolate camera position
    const targetX = mouse.current.x * 0.8;
    const targetY = mouse.current.y * 0.8;

    state.camera.position.x += (targetX - state.camera.position.x) * delta * 2;
    state.camera.position.y += (targetY - state.camera.position.y) * delta * 2;
    state.camera.lookAt(0, 0, -1); // Keep looking towards the stars
  });

  return null;
}

function Starfield() {
  const ref = useRef<THREE.Points>(null);
  const sphere = random.inSphere(new Float32Array(400 * 3), { radius: 1.5 });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere as Float32Array} stride={3} frustumCulled={false} {...{}}>
        <PointMaterial
          transparent
          color="#00D4FF"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
      <Points positions={random.inSphere(new Float32Array(400 * 3), { radius: 1.5 }) as Float32Array} stride={3} frustumCulled={false} {...{}}>
        <PointMaterial
          transparent
          color="#8B5CF6"
          size={0.003}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function GalaxyBackground() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        pointerEvents: 'none',
        background: '#05070D', // var(--titan-bg-deep)
      }}
    >
      <Canvas camera={{ position: [0, 0, 1] }}>
        <CameraRig />
        <Starfield />
        <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
      </Canvas>
    </div>
  );
}
