'use client';

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Sphere, Float } from '@react-three/drei';
import * as THREE from 'three';

// ---------------------------
// Config
// ---------------------------
const TOTAL_DEPTH = 100; // How far the camera moves from top to bottom

const PLANETS = [
  {
    id: 'live-battles',
    z: -15, // Hero is Z=0. Start seeing it early
    color: '#ef4444', // Red
    emissive: '#7f1d1d',
    size: 2.5,
    xOffset: 3,
    yOffset: -0.5,
  },
  {
    id: 'games',
    z: -40,
    color: '#00d4ff', // Cyan/Blue
    emissive: '#005580',
    size: 3.5,
    xOffset: -4,
    yOffset: 1.5,
    hasRing: true,
  },
  {
    id: 'store',
    z: -65,
    color: '#8b5cf6', // Violet
    emissive: '#4c1d95',
    size: 3,
    xOffset: 3.5,
    yOffset: 0.5,
  },
  {
    id: 'leaderboard',
    z: -95,
    color: '#f59e0b', // Gold
    emissive: '#78350f',
    size: 4.5,
    xOffset: -2,
    yOffset: -1.5,
    hasRing: true,
  },
];

// ---------------------------
// Components
// ---------------------------
function Planet({ config }: { config: typeof PLANETS[0] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.05;
      ringRef.current.rotation.x = Math.PI / 2.5; // Tilt ring
    }
  });

  return (
    <group position={[config.xOffset, config.yOffset, config.z]}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere ref={meshRef} args={[config.size, 64, 64]}>
          <meshStandardMaterial 
            color={config.color} 
            emissive={config.emissive}
            emissiveIntensity={0.5}
            roughness={0.4}
            metalness={0.8}
            wireframe={false}
          />
        </Sphere>

        {/* Atmosphere glow */}
        <Sphere args={[config.size * 1.1, 32, 32]}>
          <meshBasicMaterial 
            color={config.color} 
            transparent 
            opacity={0.15} 
            side={THREE.BackSide} 
          />
        </Sphere>

        {/* Planet Light */}
        <pointLight color={config.color} intensity={500} distance={50} decay={2} />

        {/* Optional Ring */}
        {config.hasRing && (
          <mesh ref={ringRef}>
            <torusGeometry args={[config.size * 1.8, 0.1, 16, 100]} />
            <meshStandardMaterial 
              color={config.color} 
              emissive={config.emissive} 
              emissiveIntensity={2} 
            />
          </mesh>
        )}
      </Float>
    </group>
  );
}

function StarTunnel() {
  const starsRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (starsRef.current) {
      starsRef.current.rotation.z += delta * 0.02; // Very slow rotation
    }
  });

  return (
    <group ref={starsRef}>
      <group position={[0, 0, 0]}><Stars radius={50} depth={20} count={2000} factor={4} saturation={0} fade speed={1} /></group>
      <group position={[0, 0, -40]}><Stars radius={50} depth={20} count={2000} factor={4} saturation={0} fade speed={1} /></group>
      <group position={[0, 0, -80]}><Stars radius={50} depth={20} count={2000} factor={4} saturation={0} fade speed={1} /></group>
      <group position={[0, 0, -120]}><Stars radius={50} depth={20} count={2000} factor={4} saturation={0} fade speed={1} /></group>
    </group>
  );
}

function CameraController({ maxScroll }: { maxScroll: number }) {
  useFrame((state) => {
    // Calculate scroll progress (0 to 1)
    const scrollY = window.scrollY;
    // Fallback if maxScroll is 0 (e.g., initial render before measurements)
    const progress = maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0;
    
    // Smooth camera Z movement
    const targetZ = -progress * TOTAL_DEPTH;
    
    // Lerp for smoothness
    state.camera.position.z += (targetZ - state.camera.position.z) * 0.08;
    
    // Subtle bobbing based on mouse position
    const targetX = state.pointer.x * 1.5;
    const targetY = state.pointer.y * 1.5;
    
    state.camera.position.x += (targetX - state.camera.position.x) * 0.05;
    state.camera.position.y += (targetY - state.camera.position.y) * 0.05;
    
    // Keep camera looking slightly forward
    state.camera.lookAt(
      state.camera.position.x * 0.2, 
      state.camera.position.y * 0.2, 
      state.camera.position.z - 10
    );
  });
  
  return null;
}

export default function SolarSystemJourney() {
  const [maxScroll, setMaxScroll] = useState(0);

  useEffect(() => {
    const updateMaxScroll = () => {
      setMaxScroll(document.documentElement.scrollHeight - window.innerHeight);
    };
    
    updateMaxScroll();
    window.addEventListener('resize', updateMaxScroll);
    
    // Create an observer to watch for DOM changes that might affect scroll height
    const observer = new MutationObserver(updateMaxScroll);
    observer.observe(document.body, { childList: true, subtree: true });
    
    return () => {
      window.removeEventListener('resize', updateMaxScroll);
      observer.disconnect();
    };
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
        background: '#030508', // Deep space background
      }}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.2} />
        
        {PLANETS.map((planet) => (
          <Planet key={planet.id} config={planet} />
        ))}
        
        <StarTunnel />
        
        <CameraController maxScroll={maxScroll} />
        
        {/* Fog to smooth out rendering in distance */}
        <fog attach="fog" args={['#030508', 5, 30]} />
      </Canvas>
    </div>
  );
}
