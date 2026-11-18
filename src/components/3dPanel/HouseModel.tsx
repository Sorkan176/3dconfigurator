import { useConfiguratorStore } from '../../store/useConfiguratorStore.ts';
import { Window } from './Window.tsx';
import { Balcony } from './Balcony.tsx';
import { EntranceDoor } from './EntranceDoor.tsx';
import {FacadeGrid} from "./FacadeGrid.tsx";
import {Roof} from "./Roof.tsx";
import {Chimney} from "./Chimney.tsx";


const FLOORS = 5;
const WINDOWS_PER_FLOOR = 12;

const BALCONY_POSITIONS = [0, 4, 7, 11];

const FRONT_DOOR_POSITIONS = [2, 9];

const WINDOW_SPACING = 1;

const getWindowZ = (index: number) => {
    return index % 2 === 0 ? 1.5 : -1.5;
}

const getWindowX = (index: number) =>
    (index - (WINDOWS_PER_FLOOR - 1) / 2) * WINDOW_SPACING;

const getFloorY = (floor: number) =>
    floor * 0.95 - 1.5;


export function HouseModel() {
    const facadeColor = useConfiguratorStore(
        (state) => state.facadeColor
    );


    return (
        <group>
            {/* Основной корпус здания */}
            <mesh
                position={[0, 0, 0]}
                castShadow={true}
                receiveShadow={true}
            >
                <boxGeometry args={[12, 5.6, 4]}/>
                <meshStandardMaterial
                    color={facadeColor}
                    roughness={0.85}
                />
            </mesh>

            <Roof
                width={12.15}
                depth={4.15}
                height={0.9}
                position={[0, 2.8, 0]}
                color="#a3aeb5"
            />

            {/* Две трубы ближе к заднему скату */}
            <Chimney position={[-3.2, 2.8, -0.65]} />
            <Chimney position={[2.8, 2.8, -0.65]} />

            {/* Серый цоколь здания */}
            <mesh
                position={[0, -2.5, 0]}
                castShadow={true}
                receiveShadow={true}
            >
                <boxGeometry args={[12.04, 0.6, 4.04]}/>
                <meshStandardMaterial
                    color={'#767e83'}
                    roughness={0.85}
                />
            </mesh>

            <FacadeGrid side="front" />
            <FacadeGrid side="back" />
            <FacadeGrid side="left" />
            <FacadeGrid side="right" />

            {/* Окна, двери и балконы */}
            {[2, -2].map((side) => (
                <group key={`facade-${side}`}>
                    {Array.from({length: FLOORS}, (_, floor) => {
                        const floorY = getFloorY(floor);

                        return Array.from(
                            {length: WINDOWS_PER_FLOOR},
                            (_, windowIndex) => {
                                const x = getWindowX(windowIndex);

                                const isFront = side === 2;

                                const hasBalcony =
                                    floor > 0 &&
                                    BALCONY_POSITIONS.includes(windowIndex);

                                const hasDoor =
                                    isFront &&
                                    floor === 0 &&
                                    FRONT_DOOR_POSITIONS.includes(windowIndex);

                                if (hasDoor) {
                                    return (
                                        <EntranceDoor
                                            key={`door-${floor}-${windowIndex}`}
                                            position={[x, floorY - 0.25, 2]}
                                        />
                                    );
                                }

                                return (
                                    <group
                                        key={`element-${side}-${floor}-${windowIndex}`}
                                    >
                                        <Window
                                            position={[x, floorY, side]}
                                            width={hasBalcony ? 0.7 : 0.55}
                                            height={0.6}
                                            rotationDegree={isFront ? 0 : Math.PI}
                                        />

                                        {hasBalcony && (
                                            <group
                                                position={[x, floorY, side]}
                                                rotation={[0, isFront ? 0 : Math.PI, 0]}
                                            >
                                                <Balcony position={[0, 0, 0]}/>
                                            </group>
                                        )}
                                    </group>
                                );
                            }
                        );
                    })}
                </group>
            ))}

            {/* Боковые окна*/}
            {[6, -6].map((side) => (
                <group key={`facade-${side}`}>
                    {Array.from({length: FLOORS}, (_, floor) => {
                        const floorY = getFloorY(floor);

                        return Array.from(
                            {length: 2},
                            (_, windowIndex) => {
                                const z = getWindowZ(windowIndex);

                                const isLeft = side === -6;


                                return (
                                    <group
                                        key={`element-${side}-${floor}-${windowIndex}`}
                                    >
                                        <Window
                                            position={[side, floorY, z]}
                                            width={0.55}
                                            height={0.6}
                                            rotationDegree={isLeft ? -Math.PI / 2 : Math.PI / 2}
                                        />
                                    </group>
                                );
                            }
                        );
                    })}
                </group>
            ))}
        </group>
    );
}

// export function HouseModel() {
//     const facadeColor = useConfiguratorStore(
//         (state) => state.facadeColor
//     );
//
//     const floors = 5;
//     const windowsPerFloor = 12;
//
//     return (
//         <group>
//             {/* Корпус здания */}
//             <mesh position={[0, 0, 0]} castShadow={true} receiveShadow={true}>
//                 <boxGeometry args={[12, 5.6, 4]}/>
//                 <meshStandardMaterial color={facadeColor}/>
//             </mesh>
//
//             {/* Окна */}
//             {Array.from({length: floors}).map((_, floor) =>
//                 Array.from({length: windowsPerFloor}).map((_, window) => (
//                     <Window
//                         key={`${floor}-${window}`}
//                         position={[
//                             (window - 5.5) * 0.95,
//                             floor * 0.95 - 1.65,
//                             2,
//                         ]}
//                     />
//                 ))
//             )}
//         </group>
//     );
// }
