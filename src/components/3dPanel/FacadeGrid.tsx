
type FacadeGridProps = {
    side: 'front' | 'back' | 'left' | 'right';
};

const FLOORS = 5;
const WINDOWS_PER_FLOOR = 12;

const FLOOR_SPACING = 1;
const WINDOW_SPACING = 1;

const GRID_COLOR = '#a3aeb5';
const GRID_DEPTH = 0.05;

export function FacadeGrid({ side }: FacadeGridProps) {
    const isFront = side === 'front' || side === 'back';

    // Размер фасада по горизонтали
    const facadeWidth = isFront ? 12 : 4;

    // Количество оконных секций по горизонтали
    const columns = isFront ? WINDOWS_PER_FLOOR : 4;

    const spacing = isFront ? WINDOW_SPACING : 1;

    const surfacePosition = {
        front: [0, 0, 2],
        back: [0, 0, -2],
        left: [-6, 0, 0],
        right: [6, 0, 0],
    }[side];

    return (
        <group
            position={surfacePosition as [number, number, number]}
            rotation={
                side === 'left'
                    ? [0, -Math.PI / 2, 0]
                    : side === 'right'
                        ? [0, Math.PI / 2, 0]
                        : [0, 0, 0]
            }
        >
            {/* Вертикальные границы панелей */}
            {Array.from({ length: columns - 1 }, (_, index) => {
                const x = -((columns - 1) * spacing) / 2
                    - spacing / 2
                    + index * spacing + 1;

                return (
                    <mesh
                        key={`vertical-${index}`}
                        position={[x, 0, 0]}
                        castShadow={true}
                        receiveShadow={true}
                    >
                        <boxGeometry
                            args={[GRID_DEPTH, 5.6, 0.001]}
                        />
                        <meshStandardMaterial color={GRID_COLOR} />
                    </mesh>
                );
            })}

            {/* Горизонтальные границы этажей */}
            {Array.from({ length: FLOORS - 1 }, (_, index) => {
                const y = -((FLOORS - 1) * FLOOR_SPACING) / 2
                    - FLOOR_SPACING / 2
                    + index * FLOOR_SPACING + 1.4;

                return (
                    <mesh
                        key={`horizontal-${index}`}
                        position={[0, y, 0]}
                        castShadow={true}
                        receiveShadow={true}
                    >
                        <boxGeometry
                            args={[facadeWidth, GRID_DEPTH, 0.001]}
                        />
                        <meshStandardMaterial color={GRID_COLOR} />
                    </mesh>
                );
            })}
        </group>
    );
}
