type EntranceDoorProps = {
    position: [number, number, number];
};

export function EntranceDoor({ position }: EntranceDoorProps) {
    const doorCorniceColor = '#87888c';
    const doorColor = '#877976'

    return (
        <group position={position}>
            {/* Дверная коробка */}
            <mesh position={[0, 0, 0]} castShadow={true}>
                <boxGeometry args={[0.5, 1, 0.02]} />
                <meshStandardMaterial color={doorCorniceColor} />
            </mesh>

            {/* Полотно двери */}
            <mesh position={[0.0, 0, 0.02]} castShadow={true}>
                <boxGeometry args={[0.44, 0.9, 0.02]} />
                <meshStandardMaterial
                    color={doorColor}
                    roughness={0.75}
                />
            </mesh>
        </group>
    );
}
