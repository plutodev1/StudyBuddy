"use client";

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Float } from '@react-three/drei';
import * as THREE from 'three';

const PLANE_COUNT = 8;

function FloatingPlanes() {
  const groupRef = useRef<THREE.Group>(null);

  const items = useMemo(() => {
    const temp = [];
    for (let i = 0; i < PLANE_COUNT; i++) {
      temp.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 6 - 2
        ),
        rotation: new THREE.Euler(
          (Math.random() - 0.5) * 0.5,
          (Math.random() - 0.5) * 0.5,
          (Math.random() - 0.5) * 0.2
        ),
        scale: Math.random() * 0.6 + 0.6,
        color: i % 2 === 0 ? "#a78bfa" : "#2dd4bf",
        speed: Math.random() * 0.4 + 0.1
      });
    }
    return temp;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(time * 0.05) * 0.1;
      groupRef.current.children.forEach((child, i) => {
        const item = items[i];
        child.position.y = item.position.y + Math.sin(time * item.speed + i) * 0.5;
        child.rotation.x = item.rotation.x + Math.cos(time * 0.1 + i) * 0.1;
        child.rotation.y = item.rotation.y + Math.sin(time * 0.1 + i) * 0.1;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {items.map((item, i) => (
        <group key={i} position={item.position} scale={item.scale}>
          <mesh rotation={item.rotation}>
            <boxGeometry args={[2.5, 1.8, 0.05]} />
            <meshPhysicalMaterial 
              color={item.color} 
              emissive={item.color}
              emissiveIntensity={0.2}
              transparent
              opacity={0.3}
              roughness={0.1}
              metalness={0.9}
              transmission={0.6}
              thickness={1.2}
            />
          </mesh>
          {/* Wireframe border to make it look like a floating digital document outline */}
          <mesh rotation={item.rotation} scale={1.01}>
            <boxGeometry args={[2.5, 1.8, 0.05]} />
            <meshBasicMaterial 
              color={item.color} 
              wireframe
              transparent
              opacity={0.5}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export default function Features3D() {
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 7]} fov={50} />
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#a78bfa" />
        <pointLight position={[-10, -10, -5]} intensity={1} color="#2dd4bf" />
        <FloatingPlanes />
      </Canvas>
    </div>
  );
}
