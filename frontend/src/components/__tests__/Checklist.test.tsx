import { render, screen } from '@testing-library/react';
import { Checklist } from '../Checklist';
import '@testing-library/jest-dom';
import { fetchJourney } from '../../services/api';

// Mock the API service
jest.mock('../../services/api', () => ({
  fetchJourney: jest.fn(),
  updateChecklist: jest.fn()
}));

describe('Checklist Component', () => {
  beforeEach(() => {
    (fetchJourney as jest.Mock).mockResolvedValue({
      checklist: [
        { id: '1', title: 'Register to vote', completed: false },
        { id: '2', title: 'Check name in roll', completed: true }
      ]
    });
  });

  it('renders correctly with items', async () => {
    render(<Checklist />);
    expect(await screen.findByText('Register to vote')).toBeInTheDocument();
    expect(await screen.findByText('Check name in roll')).toBeInTheDocument();
  });
});
