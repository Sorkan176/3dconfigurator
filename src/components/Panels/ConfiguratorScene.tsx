import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { HouseModel } from '../3dPanel/HouseModel.tsx';


type ConfiguratorSceneProps = {
    resetSignal: number;
};

function CameraControls({ resetSignal }: ConfiguratorSceneProps) {
    const controlsRef = useRef<OrbitControlsImpl>(null!);

    useEffect(() => {
        controlsRef.current?.reset();
    }, [resetSignal]);

    return (
        <OrbitControls
            ref={controlsRef}
            enablePan
            enableZoom
            enableRotate
            minDistance={4.5}
            maxDistance={24}
            minPolarAngle={0.2}
            maxPolarAngle={Math.PI / 2.05}
            target={[0, 0, 0]}
        />
    );
}

export function ConfiguratorScene({
                                      resetSignal,
                                  }: ConfiguratorSceneProps) {
    return (
        <div style={{ width: '100%', height: '580px' }}>
            <Canvas
                shadows
                camera={{
                    position: [9, 7, 12],
                    fov: 45,
                    near: 0.1,
                    far: 100,
                }}
                gl={{
                    antialias: true,
                    powerPreference: 'high-performance',
                }}
            >
                <color attach="background" args={['#EDEDED']} />

                <ambientLight intensity={0.45} />

                <directionalLight
                    position={[-6, 12, 8]}
                    intensity={1.5}
                    castShadow={true}
                    shadow-mapSize-width={2048}
                    shadow-mapSize-height={2048}
                    shadow-camera-near={0.5}
                    shadow-camera-far={40}
                    shadow-camera-left={-9}
                    shadow-camera-right={9}
                    shadow-camera-top={12}
                    shadow-camera-bottom={-9}
                    shadow-bias={-0.0002}
                />

                <mesh
                    rotation={[-Math.PI / 2, 0, 0]}
                    position={[0, -2.82, 0]}
                    receiveShadow={true}
                >
                    <planeGeometry args={[14, 8]} />
                    <meshStandardMaterial
                        color={'#aaaeb3'}
                        roughness={0.9}
                    />
                </mesh>

                <HouseModel />

                <CameraControls resetSignal={resetSignal} />
            </Canvas>
        </div>
    );
}
