import { describe, it, expect, beforeEach } from 'vitest';
import { useConfiguratorStore } from '../src/store/useConfiguratorStore.ts';


describe('useConfiguratorStore — light color', () => {
    beforeEach(() => {
        useConfiguratorStore.setState({
            lightColor: '#ffffff',
        });
    });

    it('has white light color by default', () => {
        expect(useConfiguratorStore.getState().lightColor).toBe('#ffffff');
    });

    it('changes light color', () => {
        useConfiguratorStore.getState().setLightColor('#ff8800');

        expect(useConfiguratorStore.getState().lightColor).toBe('#ff8800');
    });
});
