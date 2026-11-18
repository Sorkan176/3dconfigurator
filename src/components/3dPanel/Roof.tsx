import { useMemo } from 'react';
import * as THREE from 'three';

type RoofProps = {
    width?: number;
    depth?: number;
    height?: number;
    position?: [number, number, number];
    color?: string;
};

export function Roof({
                         width = 12.15,
                         depth = 4.15,
                         height = 0.85,
                         position = [0, 2.8, 0],
                         color = '#474d51',
                     }: RoofProps) {
    const geometry = useMemo(() => {
        const w = width / 2;
        const d = depth / 2;

        // Конёк отступает от торцов на половину глубины крыши
        const ridgeX = w - d;

        const vertices = new Float32Array([
            // Передний скат — два треугольника
            -w, 0, d,
            w, 0, d,
            ridgeX, height, 0,

            -w, 0, d,
            ridgeX, height, 0,
            -ridgeX, height, 0,

            // Задний скат
            w, 0, -d,
            -w, 0, -d,
            -ridgeX, height, 0,

            w, 0, -d,
            -ridgeX, height, 0,
            ridgeX, height, 0,

            // Левый торцевой скат
            -w, 0, -d,
            -w, 0, d,
            -ridgeX, height, 0,

            // Правый торцевой скат
            w, 0, d,
            w, 0, -d,
            ridgeX, height, 0,
        ]);

        const geo = new THREE.BufferGeometry();
        geo.setAttribute(
            'position',
            new THREE.BufferAttribute(vertices, 3)
        );
        geo.computeVertexNormals();

        return geo;
    }, [width, depth, height]);

    return (
        <group position={position}>
            <mesh geometry={geometry} castShadow={true} receiveShadow={true}>
                <meshStandardMaterial
                    color={color}
                    metalness={0.5}
                    roughness={0.6}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Горизонтальный конёк */}
            <mesh
                position={[0, height - 0.015, 0]}
                castShadow={true}
            >
                <boxGeometry args={[width - depth + 0.08, 0.03, 0.14]} />
                <meshStandardMaterial
                    color="#a3aeb5"
                    metalness={0.6}
                    roughness={0.55}
                />
            </mesh>

            {/* Карниз */}
            <mesh position={[0, -0.04, 0]} castShadow={true}>
                <boxGeometry args={[width + 0.1, 0.1, depth + 0.1]} />
                <meshStandardMaterial
                    color="#777d82"
                    metalness={0.4}
                    roughness={0.6}
                />
            </mesh>
        </group>
    );
}
