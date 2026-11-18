import { useConfiguratorStore } from '../../store/useConfiguratorStore.ts';


type WindowProps = {
    position?: [number, number, number];
    width?: number;
    height?: number;
    rotationDegree?: number;
};

export function Window({
                           position = [0, 0, 0],
                           width = 0.65,
                           height = 0.7,
                           rotationDegree = 0,
                       }: WindowProps) {
    const lightsOn = useConfiguratorStore(
        (state) => state.lightsOn
    );

    const brightness = useConfiguratorStore(
        (state) => state.brightness
    );

    const lightColor = useConfiguratorStore(
        (state) => state.lightColor
    );

    const frameColor = '#e0ded8';
    const frameDepth = 0.03;
    const frameThickness = 0.03;

    return (
        <group rotation={[0, rotationDegree, 0]} position={position}>
            {/* Стекло */}
            <mesh position={[0, 0, 0]} >
                <boxGeometry
                    args={[width - frameThickness * 2, height - frameThickness * 2, 0.035]}
                />
                <meshStandardMaterial
                    color={lightsOn ? lightColor : '#25364a'}
                    emissive={lightsOn ? lightColor : '#000000'}
                    emissiveIntensity={lightsOn ? brightness : 0}
                />
            </mesh>

            {/* Левая рама */}
            <mesh position={[-width / 2 + frameThickness / 2, 0, frameDepth / 2]} castShadow={true} receiveShadow={true}>
                <boxGeometry args={[frameThickness, height, frameDepth]} />
                <meshStandardMaterial color={frameColor} />
            </mesh>

            {/* Правая рама */}
            <mesh position={[width / 2 - frameThickness / 2, 0, frameDepth / 2]} castShadow={true} receiveShadow={true}>
                <boxGeometry args={[frameThickness, height, frameDepth]} />
                <meshStandardMaterial color={frameColor} />
            </mesh>

            {/* Верхняя рама */}
            <mesh position={[0, height / 2 - frameThickness / 2, frameDepth / 2]} castShadow={true} receiveShadow={true}>
                <boxGeometry args={[width, frameThickness, frameDepth]} />
                <meshStandardMaterial color={frameColor} />
            </mesh>

            {/* Нижняя рама */}
            <mesh position={[0, -height / 2 + frameThickness / 2, frameDepth / 2]} castShadow={true} receiveShadow={true}>
                <boxGeometry args={[width, frameThickness, frameDepth]} />
                <meshStandardMaterial color={frameColor} />
            </mesh>

            {/* Центральная перемычка */}
            <mesh position={[0, 0, frameDepth / 2]} castShadow={true} receiveShadow={true}>
                <boxGeometry args={[0.035, height - frameThickness * 2, frameDepth]} />
                <meshStandardMaterial color={frameColor} />
            </mesh>

            {/* Подоконник */}
            <mesh position={[0, -height / 2 - 0.027, frameDepth / 2 + 0.025]} castShadow={true} receiveShadow={true}>
                <boxGeometry args={[width + 0.12, 0.04, 0.14]} />
                <meshStandardMaterial color="#c8c5bd" />
            </mesh>
        </group>
    );
}
