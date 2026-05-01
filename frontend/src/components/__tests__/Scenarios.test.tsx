import { render, screen } from '@testing-library/react';
import { Scenarios } from '../Scenarios';
import '@testing-library/jest-dom';

// Mock the API service
jest.mock('../../services/api', () => ({
  updateScenario: jest.fn()
}));

describe('Scenarios Component', () => {
  it('renders correctly', async () => {
    render(<Scenarios />);
    // Updated text match to match the current component header
    expect(await screen.findByText(/Interactive Scenario Simulation/i)).toBeInTheDocument();
  });
});
