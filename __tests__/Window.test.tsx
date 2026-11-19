import { describe, it, expect, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { Canvas } from '@react-three/fiber';
import { Window } from '../src/components/3dPanel/Window';
import { useConfiguratorStore } from '../src/store/useConfiguratorStore'


describe('Window', () => {
    beforeEach(() => {
        useConfiguratorStore.setState({
            lightsOn: true,
            brightness: 1,
            lightColor: '#ffffff',
        });
    });

    it('renders without crashing', () => {
        const { container } = render(
            <Canvas>
                <Window />
            </Canvas>
        );

        expect(container.querySelector('canvas')).toBeInTheDocument();
    });

    it('uses custom dimensions and position', () => {
        const { container } = render(
            <Canvas>
                <Window
                    position={[1, 2, 3]}
                    width={0.7}
                    height={0.8}
                />
            </Canvas>
        );

        expect(container.querySelector('canvas')).toBeInTheDocument();
    });
});
