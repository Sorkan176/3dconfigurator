import { describe, it, expect, beforeEach } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ControlsPanel } from '../src/components/Panels/ControlsPanel';
import { useConfiguratorStore } from '../src/store/useConfiguratorStore';
import { renderWithProviders } from '../src/app/renderWithProviders';


describe('ControlsPanel', () => {
    beforeEach(() => {
        useConfiguratorStore.setState({
            facadeColor: '#b8b8b8',
            lightsOn: true,
            brightness: 1,
        });
    });

    it('changes facade color', () => {
        renderWithProviders(<ControlsPanel />);

        const colorInput = screen.getByLabelText(/Цвет фасада/i);

        fireEvent.change(colorInput, {
            target: { value: '#ff0000' },
        });

        expect(useConfiguratorStore.getState().facadeColor).toBe('#ff0000');
    });

    it('toggles window lights', async () => {
        const user = userEvent.setup();
        renderWithProviders(<ControlsPanel />);

        const checkbox = screen.getByRole('checkbox');

        expect(checkbox).toBeChecked();

        await user.click(checkbox);

        expect(useConfiguratorStore.getState().lightsOn).toBe(false);
    });

    it('changes brightness', () => {
        renderWithProviders(<ControlsPanel />);

        const brightnessInput = screen.getByRole('slider');

        fireEvent.change(brightnessInput, {
            target: { value: '1.5' },
        });

        expect(useConfiguratorStore.getState().brightness).toBe(1.5);
    });

    it('changes light color', () => {
        renderWithProviders(<ControlsPanel />);

        const colorInput = screen.getByLabelText(
            /свой цвет/i
        );

        fireEvent.change(colorInput, {
            target: { value: '#ff8800' },
        });

        expect(useConfiguratorStore.getState().lightColor).toBe('#ff8800');
    });
});
