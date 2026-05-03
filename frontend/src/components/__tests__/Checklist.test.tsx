import { render, screen, fireEvent } from '@testing-library/react';
import { Checklist } from '../Checklist';
import '@testing-library/jest-dom';
import * as api from '../../services/api';

// Mock the API service
jest.mock('../../services/api', () => ({
  fetchJourney: jest.fn(),
  updateChecklist: jest.fn()
}));

describe('Checklist Component', () => {
  const mockItems = [
    { id: '1', title: 'Register to vote', completed: false },
    { id: '2', title: 'Check name in roll', completed: true }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (api.fetchJourney as jest.Mock).mockResolvedValue({
      checklist: mockItems
    });
  });

  it('renders correctly with items', async () => {
    render(<Checklist />);
    expect(await screen.findByText('Register to vote')).toBeInTheDocument();
    expect(await screen.findByText('Check name in roll')).toBeInTheDocument();
  });

  it('toggles an item when clicked', async () => {
    render(<Checklist />);
    const item = await screen.findByText('Register to vote');
    
    fireEvent.click(item);
    
    expect(api.updateChecklist).toHaveBeenCalledWith('guest_user', '1', true);
  });

  it('handles API failure by using fallback items', async () => {
    (api.fetchJourney as jest.Mock).mockRejectedValue(new Error('API Fail'));
    render(<Checklist />);
    
    expect(await screen.findByText('Register to vote')).toBeInTheDocument();
    expect(await screen.findByText('Check name in roll')).toBeInTheDocument();
  });
});
