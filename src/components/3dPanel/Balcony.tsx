type BalconyProps = {
    position: [number, number, number];
    width?: number;
};

export function Balcony({
                            position,
                            width = 1.0,
                        }: BalconyProps) {
    const railHeight = 0.23;
    const depth = 0.4;
    const railColor = '#9d9d9e';
    const slabColor = '#cccccc';

    return (
        <group position={position}>
            {/* Бетонная плита балкона */}
            <mesh
                position={[0, -0.33, depth / 2]}
                castShadow={true}
                receiveShadow={true}
            >
                <boxGeometry args={[width, 0.06, depth]} />
                <meshStandardMaterial
                    color={slabColor}
                    roughness={0.9}
                />
            </mesh>

            {/* Передние стойки ограждения */}
            {Array.from({ length: 21 }, (_, index) => {
                const x = (index / 4) * (width - 0.804) - 0.49;

                return (
                    <mesh
                        key={`front-post-${index}`}
                        position={[x, -0.2, depth - 0.01]}
                        castShadow={true}
                    >
                        <boxGeometry args={[0.008, railHeight, 0.008]} />
                        <meshStandardMaterial color={railColor} />
                    </mesh>
                );
            })}

            {/* Верхнее переднее перило */}
            <mesh
                position={[0, -0.08, depth]}
                castShadow={true}
            >
                <boxGeometry args={[width, 0.01, 0.02]} />
                <meshStandardMaterial color={railColor} />
            </mesh>

            {/* Боковые ограждения */}
            {[-1, 1].map((side) => (
                <group key={side}>
                    <mesh
                        position={[
                            side * (width / 2 - 0.01),
                            -0.2,
                            depth / 2,
                        ]}
                        castShadow={true}
                    >
                        <boxGeometry args={[0.01, railHeight-0.1, depth-0.1]} />
                        <meshStandardMaterial color={railColor} />
                    </mesh>

                    <mesh
                        position={[
                            side * (width / 2 - 0.005),
                            -0.08,
                            depth / 2,
                        ]}
                        castShadow={true}
                    >
                        <boxGeometry args={[0.01, 0.01, depth]} />
                        <meshStandardMaterial color={railColor} />
                    </mesh>
                </group>
            ))}
        </group>
    );
}
