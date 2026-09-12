import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Spinner } from './Spinner';

describe('Spinner component', () => {
  it('renders the loading text', () => {
    render(<Spinner />);
    const loadingText = screen.getByText('Cargando...');
    expect(loadingText).toBeInTheDocument();
  });
});
