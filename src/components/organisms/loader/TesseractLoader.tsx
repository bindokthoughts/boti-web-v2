"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// 16 vertices of a 4D Hypercube / Tesseract
// 8 for outer cube, 8 for inner cube
const BASE_CUBE_VERTICES: [number, number, number][] = [
    [-1, -1, -1],
    [1, -1, -1],
    [1, 1, -1],
    [-1, 1, -1],
    [-1, -1, 1],
    [1, -1, 1],
    [1, 1, 1],
    [-1, 1, 1],
];

// Edges connecting indices for a 3D cube
const CUBE_EDGES: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [3, 0], // Back face
    [4, 5], [5, 6], [6, 7], [7, 4], // Front face
    [0, 4], [1, 5], [2, 6], [3, 7], // Connecting edges
];

function TesseractWireframe() {
    const lineRef = useRef<THREE.LineSegments>(null);
    const pointsRef = useRef<THREE.Points>(null);

    // Build initial geometry with 32 edges (64 vertices) and 16 vertex points
    const { positions, lineGeometry, pointsGeometry } = useMemo(() => {
        const linePos = new Float32Array(32 * 2 * 3); // 32 lines * 2 points * 3 coords
        const pointPos = new Float32Array(16 * 3); // 16 vertices * 3 coords

        const lineGeom = new THREE.BufferGeometry();
        lineGeom.setAttribute("position", new THREE.BufferAttribute(linePos, 3));

        const pointGeom = new THREE.BufferGeometry();
        pointGeom.setAttribute("position", new THREE.BufferAttribute(pointPos, 3));

        return { positions: { line: linePos, point: pointPos }, lineGeometry: lineGeom, pointsGeometry: pointGeom };
    }, []);

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        // Morph factor between 0 (2D Flat Square) and 1 (3D Tesseract Hypercube)
        const rawFactor = (Math.sin(t * 1.5) + 1) / 2;
        // Smooth step for natural easing
        const morph = THREE.MathUtils.smoothstep(rawFactor, 0, 1);

        // Rotation angles
        const rotX = t * 0.6;
        const rotY = t * 0.8;
        const rotZ = t * 0.3;

        const euler = new THREE.Euler(rotX, rotY, rotZ);
        const matrix = new THREE.Matrix4().makeRotationFromEuler(euler);

        // Calculate current 16 vertex positions based on morph factor
        // Outer cube scale: morphs from 1.2 (flat square) to 1.5
        const outerScaleX = 1.2;
        const outerScaleY = 1.2;
        const outerScaleZ = morph * 1.5;

        // Inner cube scale: morphs from outerScale (overlapping = flat square) down to 0.65
        const innerScaleX = THREE.MathUtils.lerp(1.2, 0.65, morph);
        const innerScaleY = THREE.MathUtils.lerp(1.2, 0.65, morph);
        const innerScaleZ = THREE.MathUtils.lerp(0, 0.65, morph);

        // 2D Flat Square flattening: when morph is 0, z coordinate is forced to 0
        const currentVertices: THREE.Vector3[] = [];

        // Outer 8 vertices
        for (let i = 0; i < 8; i++) {
            const [bx, by, bz] = BASE_CUBE_VERTICES[i];
            // For a flat 2D square when morph=0: collapse Z face depth to 0, flatten X/Y
            // We use square front face when morph is 0
            const x = bx * outerScaleX;
            const y = by * outerScaleY;
            const z = bz * outerScaleZ;

            const v = new THREE.Vector3(x, y, z);
            v.applyMatrix4(matrix);
            currentVertices.push(v);
        }

        // Inner 8 vertices
        for (let i = 0; i < 8; i++) {
            const [bx, by, bz] = BASE_CUBE_VERTICES[i];
            const x = bx * innerScaleX;
            const y = by * innerScaleY;
            const z = bz * innerScaleZ;

            const v = new THREE.Vector3(x, y, z);
            v.applyMatrix4(matrix);
            currentVertices.push(v);
        }

        // Update line positions (32 edges)
        const lineAttr = lineGeometry.attributes.position as THREE.BufferAttribute;
        let lineIdx = 0;

        // Outer cube 12 edges
        for (const [start, end] of CUBE_EDGES) {
            const v1 = currentVertices[start];
            const v2 = currentVertices[end];

            lineAttr.setXYZ(lineIdx++, v1.x, v1.y, v1.z);
            lineAttr.setXYZ(lineIdx++, v2.x, v2.y, v2.z);
        }

        // Inner cube 12 edges
        for (const [start, end] of CUBE_EDGES) {
            const v1 = currentVertices[start + 8];
            const v2 = currentVertices[end + 8];

            lineAttr.setXYZ(lineIdx++, v1.x, v1.y, v1.z);
            lineAttr.setXYZ(lineIdx++, v2.x, v2.y, v2.z);
        }

        // 8 Cross edges connecting Outer to Inner
        for (let i = 0; i < 8; i++) {
            const v1 = currentVertices[i];
            const v2 = currentVertices[i + 8];

            lineAttr.setXYZ(lineIdx++, v1.x, v1.y, v1.z);
            lineAttr.setXYZ(lineIdx++, v2.x, v2.y, v2.z);
        }

        lineAttr.needsUpdate = true;

        // Update vertex point positions (16 points)
        const pointAttr = pointsGeometry.attributes.position as THREE.BufferAttribute;
        for (let i = 0; i < 16; i++) {
            const v = currentVertices[i];
            pointAttr.setXYZ(i, v.x, v.y, v.z);
        }
        pointAttr.needsUpdate = true;
    });

    return (
        <group>
            {/* Wireframe edges */}
            <lineSegments ref={lineRef} geometry={lineGeometry}>
                <lineBasicMaterial color="#00F0FF" linewidth={2} transparent opacity={0.85} />
            </lineSegments>

            {/* Glowing vertices */}
            <points ref={pointsRef} geometry={pointsGeometry}>
                <pointsMaterial color="#38BDF8" size={0.12} transparent opacity={0.9} />
            </points>
        </group>
    );
}

export default function TesseractLoader() {
    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#020617] text-white select-none">
            {/* CRT overlay background line effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-950/20 via-slate-950 to-black pointer-events-none" />

            {/* 3D Canvas */}
            <div className="w-72 h-72 relative flex items-center justify-center">
                <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[5, 5, 5]} intensity={1.5} color="#00F0FF" />
                    <TesseractWireframe />
                </Canvas>
            </div>

            {/* Futuristic text label */}
            <div className="mt-4 flex flex-col items-center gap-2 z-10 font-mono">
                <div className="flex items-center gap-2 text-cyan-400 text-xs tracking-widest uppercase font-semibold">
                    <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    Loading Spatial Data...
                </div>
            </div>
        </div>
    );
}
