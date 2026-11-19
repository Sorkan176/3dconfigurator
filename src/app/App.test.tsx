import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithProviders } from './renderWithProviders.tsx';
import App from './App';

describe('App', () => {
    it('renders application title', () => {
        renderWithProviders(<App />);

        expect(
            screen.getByText('Панельный дом — светильник'),
        ).toBeInTheDocument();
    });
});