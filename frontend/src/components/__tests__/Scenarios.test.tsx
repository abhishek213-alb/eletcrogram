import { render, screen, fireEvent } from '@testing-library/react';
import { Scenarios } from '../Scenarios';
import '@testing-library/jest-dom';
import axios from 'axios';

jest.mock('axios');

describe('Scenarios Component', () => {
  beforeEach(() => {
    (axios.get as jest.Mock).mockResolvedValue({ data: { scenarios: [] } });
    (axios.post as jest.Mock).mockResolvedValue({ data: [] });
  });

  it('renders correctly', async () => {
    render(<Scenarios />);
    expect(await screen.findByText('Election Day Simulations')).toBeInTheDocument();
  });
});
