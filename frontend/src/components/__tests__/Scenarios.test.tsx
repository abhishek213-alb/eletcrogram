import { render, screen, fireEvent } from '@testing-library/react';
import { Scenarios } from '../Scenarios';
import '@testing-library/jest-dom';
import * as api from '../../services/api';

// Mock the API service
jest.mock('../../services/api', () => ({
  updateScenario: jest.fn()
}));

describe('Scenarios Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', async () => {
    render(<Scenarios />);
    expect(await screen.findByText(/Interactive Scenario Simulation/i)).toBeInTheDocument();
  });

  it('handles selecting a correct option and moving to next', async () => {
    render(<Scenarios />);
    
    // Select correct option for first scenario
    const correctOption = screen.getByText(/Check the official Electoral Roll with the Presiding Officer/i);
    fireEvent.click(correctOption);
    
    expect(api.updateScenario).toHaveBeenCalledWith('guest_user', 's1', true);
    expect(screen.getByText(/Correct! The official Electoral Roll is the only valid document/i)).toBeInTheDocument();
    
    // Click next
    const nextBtn = screen.getByText(/Next Scenario/i);
    fireEvent.click(nextBtn);
    
    // Check second scenario
    expect(screen.getByText(/Scenario 2: EVM Machine Malfunction/i)).toBeInTheDocument();
  });

  it('handles selecting an incorrect option', async () => {
    render(<Scenarios />);
    
    // Select incorrect option
    const incorrectOption = screen.getByText(/Go back home without voting/i);
    fireEvent.click(incorrectOption);
    
    expect(api.updateScenario).not.toHaveBeenCalled();
    expect(screen.getByText(/The party slip is not official/i)).toBeInTheDocument();
  });

  it('completes the simulation and restarts', async () => {
    render(<Scenarios />);
    
    // Finish scenario 1
    fireEvent.click(screen.getByText(/Check the official Electoral Roll with the Presiding Officer/i));
    fireEvent.click(screen.getByText(/Next Scenario/i));
    
    // Finish scenario 2
    fireEvent.click(screen.getByText(/Immediately alert the Presiding Officer before leaving the compartment/i));
    fireEvent.click(screen.getByText(/Finish Simulation/i));
    
    expect(screen.getByText(/Simulation Complete!/i)).toBeInTheDocument();
    
    // Restart
    fireEvent.click(screen.getByText(/Restart Simulation/i));
    expect(screen.getByText(/Scenario 1: Missing Name on Slip/i)).toBeInTheDocument();
  });
});
