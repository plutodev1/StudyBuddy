"use client";

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, Float, Stars, Line } from '@react-three/drei';
import * as THREE from 'three';
import { MotionValue } from 'framer-motion';

const PARTICLE_COUNT = 200;
const CONSTELLATION_NODE_COUNT = 30; // Use first 30 particles for the network lines

interface MorphingSceneProps {
  scrollProgress: MotionValue<number>;
}

function ParticlesMorph({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const linesGroupRef = useRef<THREE.Group>(null);
  
  const { viewport } = useThree();
  const isDesktop = viewport.width > 8;
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // 1. Generate clean template positions for all 4 states (centered at 0)
  const templates = useMemo(() => {
    const hero = [];
    const solutionChaos = [];
    const solutionOrder = [];
    const whyUs = [];
    const testimonial = [];

    // Pre-calculate line connections for the constellation
    const linesIndices: [number, number][] = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // --- State 1: Hero Sphere ---
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 1.0 + Math.random() * 0.7;
      hero.push(new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      ));

      // --- State 2a: Solution Chaos Wide Cloud ---
      solutionChaos.push(new THREE.Vector3(
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 14
      ));

      // --- State 2b: Solution Perfect 5x5x5 Grid ---
      const isGrid = i < 125;
      const gx = isGrid ? (i % 5) - 2 : 0;
      const gy = isGrid ? Math.floor((i / 5) % 5) - 2 : 0;
      const gz = isGrid ? Math.floor(i / 25) - 2 : 0;
      solutionOrder.push(new THREE.Vector3(gx * 0.9, gy * 0.9, gz * 0.9));

      // --- State 3: Why Us Constellation ---
      // We use random nodes but keep them structured
      whyUs.push(new THREE.Vector3(
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6
      ));

      // --- State 4: Testimonials Floating Orbs ---
      testimonial.push(new THREE.Vector3(
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8 - 3
      ));
    }

    // Connect constellation nodes that are close to each other
    for (let i = 0; i < CONSTELLATION_NODE_COUNT; i++) {
      for (let j = i + 1; j < CONSTELLATION_NODE_COUNT; j++) {
        const dist = whyUs[i].distanceTo(whyUs[j]);
        if (dist < 2.5) {
          linesIndices.push([i, j]);
        }
      }
    }

    return { hero, solutionChaos, solutionOrder, whyUs, testimonial, linesIndices };
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    const p = scrollProgress.get(); // Main scroll value (0 to 1)

    // Responsive Offsets
    const solutionX = isDesktop ? 2.2 : 0;
    const whyUsX = isDesktop ? -2.2 : 0;

    let cycle = 0;
    let currentPos = new THREE.Vector3();
    let startPos = new THREE.Vector3();
    let endPos = new THREE.Vector3();

    // Define current target segment and interpolate
    if (p <= 0.22) {
      // Segment 1: Hero Sphere -> Solution Chaos
      cycle = p / 0.22;
      particlesLerp(templates.hero, templates.solutionChaos, cycle, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0));
      setLinesOpacity(0);
    } else if (p > 0.22 && p <= 0.44) {
      // Segment 2: Solution Chaos -> Solution Grid (offset to right)
      cycle = (p - 0.22) / 0.22;
      particlesLerp(templates.solutionChaos, templates.solutionOrder, cycle, new THREE.Vector3(0, 0, 0), new THREE.Vector3(solutionX, 0, 0));
      setLinesOpacity(0);
    } else if (p > 0.44 && p <= 0.70) {
      // Segment 3: Solution Grid -> Why Us Constellation (offset to left)
      cycle = (p - 0.44) / 0.26;
      particlesLerp(templates.solutionOrder, templates.whyUs, cycle, new THREE.Vector3(solutionX, 0, 0), new THREE.Vector3(whyUsX, 0, 0));
      
      // Constellation lines fade in and out during this segment
      const lineOpacity = Math.sin(cycle * Math.PI) * 0.35; // Peak opacity in middle
      setLinesOpacity(lineOpacity);
      if (linesGroupRef.current) {
        linesGroupRef.current.position.set(whyUsX, 0, 0);
        // Slowly rotate lines group to match constellation nodes
        const baseRotY = time * 0.05 + state.pointer.x * 0.3;
        const baseRotX = time * 0.03 - state.pointer.y * 0.3;
        linesGroupRef.current.rotation.y += (baseRotY - linesGroupRef.current.rotation.y) * 0.05;
        linesGroupRef.current.rotation.x += (baseRotX - linesGroupRef.current.rotation.x) * 0.05;
      }
    } else {
      // Segment 4: Why Us Constellation -> Testimonials Floating Orbs
      cycle = (p - 0.70) / 0.30;
      particlesLerp(templates.whyUs, templates.testimonial, cycle, new THREE.Vector3(whyUsX, 0, 0), new THREE.Vector3(0, 0, 0));
      
      // Fade out lines completely
      setLinesOpacity(0);
    }

    // Apply rotations and scaling based on segments
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      dummy.rotation.x = time * 0.1 + i * 0.01;
      dummy.rotation.y = time * 0.15 + i * 0.01;

      // Scaling: standard size for Hero/Solution, expands into large transparent bubbles in Testimonials
      let scale = 0.09;
      if (p <= 0.22) {
        scale = 0.09 - p * 0.05; // Contract slightly during explosion
      } else if (p > 0.22 && p <= 0.44) {
        scale = 0.04 + cycle * 0.08; // Grow to grid size
      } else if (p > 0.70) {
        // Grow massively for floating orbs
        scale = 0.12 + cycle * 0.65;
      }

      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;

    // Apply subtle global mesh rotations based on mouse tracking
    const targetGlobalRotY = time * 0.04 + state.pointer.x * 0.4;
    const targetGlobalRotX = time * 0.02 - state.pointer.y * 0.4;
    
    meshRef.current.rotation.y += (targetGlobalRotY - meshRef.current.rotation.y) * 0.05;
    meshRef.current.rotation.x += (targetGlobalRotX - meshRef.current.rotation.x) * 0.05;

    // Helper: interpolate particle positions between start and end lists
    function particlesLerp(
      startList: THREE.Vector3[], 
      endList: THREE.Vector3[], 
      t: number, 
      startOffset: THREE.Vector3,
      endOffset: THREE.Vector3
    ) {
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        startPos.copy(startList[i]).add(startOffset);
        endPos.copy(endList[i]).add(endOffset);
        currentPos.lerpVectors(startPos, endPos, t);
        dummy.position.copy(currentPos);
        dummy.updateMatrix();
      }
    }

    // Helper: Set line group mesh material opacity
    function setLinesOpacity(opacity: number) {
      if (linesGroupRef.current) {
        linesGroupRef.current.children.forEach((lineMesh) => {
          const mat = (lineMesh as any).material;
          if (mat) {
            mat.opacity = opacity;
            mat.transparent = true;
          }
        });
      }
    }
  });

  return (
    <group>
      {/* 200 Morphing Particles */}
      <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshPhysicalMaterial 
          color="#a78bfa" 
          emissive="#2dd4bf"
          emissiveIntensity={0.6}
          roughness={0.1}
          metalness={0.9}
          transmission={0.4}
          thickness={1}
        />
      </instancedMesh>

      {/* Constellation lines - static templates connecting the WhyUs positions */}
      <group ref={linesGroupRef}>
        {templates.linesIndices.map(([startIdx, endIdx], i) => (
          <Line
            key={i}
            points={[templates.whyUs[startIdx], templates.whyUs[endIdx]]}
            color="#2dd4bf"
            lineWidth={1}
            transparent
            opacity={0}
          />
        ))}
      </group>
    </group>
  );
}

export default function MorphingScene({ scrollProgress }: MorphingSceneProps) {
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 6.5]} fov={50} />
        
        {/* Lights */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={2.5} color="#2dd4bf" />
        <directionalLight position={[-10, -10, -5]} intensity={2} color="#8b5cf6" />
        <pointLight position={[0, 5, 0]} intensity={1.5} color="#c084fc" />

        {/* Persistent Starfield */}
        <Stars radius={100} depth={50} count={3000} factor={3} saturation={0.5} fade speed={1.5} />
        
        {/* Unified morphing particles system */}
        <ParticlesMorph scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
