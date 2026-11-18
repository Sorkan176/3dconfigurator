
type ChimneyProps = {
    position: [number, number, number];
    height?: number;
};

export function Chimney({
                            position,
                            height = 1.1,
                        }: ChimneyProps) {
    return (
        <group position={position}>
            {/* Корпус трубы */}
            <mesh position={[0, height / 2, 0]} castShadow={true}>
                <boxGeometry args={[0.32, height, 0.32]} />
                <meshStandardMaterial
                    color="#85817c"
                    roughness={0.9}
                />
            </mesh>

            {/* Верхний колпак */}
            <mesh position={[0, height + 0.04, 0]} castShadow={true}>
                <boxGeometry args={[0.38, 0.12, 0.38]} />
                <meshStandardMaterial
                    color="#55595d"
                    metalness={0.5}
                    roughness={0.6}
                />
            </mesh>

            {/* Тёмное отверстие трубы */}
            <mesh position={[0, height + 0.105, 0]}>
                <boxGeometry args={[0.22, 0.015, 0.27]} />
                <meshStandardMaterial color="#252729" />
            </mesh>
        </group>
    );
}
