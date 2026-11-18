import { create } from 'zustand';

type ConfiguratorState = {
    facadeColor: string;
    lightsOn: boolean;
    brightness: number;
    lightColor: string;
    setFacadeColor: (color: string) => void;
    toggleLights: () => void;
    setBrightness: (value: number) => void;
    setLightColor: (color: string) => void;
};

export const useConfiguratorStore = create<ConfiguratorState>((set) => ({
    facadeColor: '#b8b8b8',
    lightsOn: true,
    brightness: 1,
    lightColor: '#ffffff',

    setFacadeColor: (facadeColor) => set({ facadeColor }),

    toggleLights: () =>
        set((state) => ({ lightsOn: !state.lightsOn })),

    setBrightness: (brightness) => set({ brightness }),
    setLightColor: (lightColor) => set({ lightColor }),
}));