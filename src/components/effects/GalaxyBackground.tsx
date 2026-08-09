'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Points, PointMaterial } from '@react-three/drei';
// @ts-ignore
import * as random from 'maath/random/dist/maath-random.esm';
import * as THREE from 'three';

function ParticleGroup({ count, color, size, speed, mouse }: { count: number, color: string, size: number, speed: number, mouse: React.MutableRefObject<{x: number, y: number}> }) {
  const ref = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    return random.inSphere(new Float32Array(count * 3), { radius: 1.5 }) as Float32Array;
  }, [count]);

  const originalX = useMemo(() => {
    const arr = new Float32Array(count);
    for(let i = 0; i < count; i++) arr[i] = positions[i*3];
    return arr;
  }, [positions]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position.array as Float32Array;
    
    // Map normalized pointer (-1 to 1) from the global window event to world coordinates at z=0
    const mouseX = (mouse.current.x * state.viewport.width) / 2;
    const mouseY = (mouse.current.y * state.viewport.height) / 2;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // 1. Continuous upward movement
      pos[i3 + 1] += delta * speed; 
      
      // Loop if it goes too high (wrap around to the bottom)
      if (pos[i3 + 1] > 1.5) {
        pos[i3 + 1] = -1.5;
        // Reset X to avoid carrying over repulsion state to the bottom
        pos[i3] = originalX[i];
      }

      // 2. Mouse repulsion logic
      const dx = pos[i3] - mouseX;
      const dy = pos[i3 + 1] - mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      const interactionRadius = 0.4; // Distance at which stars react
      if (distance < interactionRadius && distance > 0.001) {
        const force = (interactionRadius - distance) / interactionRadius;
        // Push away from cursor
        pos[i3] += (dx / distance) * force * delta * 1.5;
        pos[i3 + 1] += (dy / distance) * force * delta * 1.5;
      } else {
        // Slowly return X to original position (spring back horizontally)
        pos[i3] += (originalX[i] - pos[i3]) * delta * 1.5;
      }
    }
    
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={color}
        size={size}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
}

export default function GalaxyBackground() {
  const mouse = useRef({ x: -10, y: -10 }); // Default off-screen

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
        background: '#05070D',
      }}
    >
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ParticleGroup count={400} color="#00D4FF" size={0.005} speed={0.08} mouse={mouse} />
        <ParticleGroup count={400} color="#8B5CF6" size={0.003} speed={0.04} mouse={mouse} />
        {/* Background distant stars (static) */}
        <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={0.5} />
      </Canvas>
    </div>
  );
}
