import { render, screen, fireEvent } from '@testing-library/react';
import { Checklist } from '../Checklist';
import '@testing-library/jest-dom';
import axios from 'axios';

jest.mock('axios');

describe('Checklist Component', () => {
  beforeEach(() => {
    (axios.get as jest.Mock).mockResolvedValue({ data: { checklist: [
      { id: '1', title: 'Verify name on Electoral Roll', completed: false },
      { id: '2', title: 'Find my polling booth', completed: false },
      { id: '3', title: 'Keep EPIC/ID ready', completed: false }
    ] } });
    (axios.post as jest.Mock).mockResolvedValue({ data: [] });
  });

  it('renders correctly', async () => {
    render(<Checklist />);
    expect(await screen.findByText('Voter Readiness Checklist')).toBeInTheDocument();
  });
});
