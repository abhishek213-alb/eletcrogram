import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Assistant } from '../Assistant';
import { getAIResponse } from '../../services/api';
import '@testing-library/jest-dom';

// Mock the API service
jest.mock('../../services/api', () => ({
  getAIResponse: jest.fn()
}));

// Mock DOMPurify
jest.mock('dompurify', () => ({
  __esModule: true,
  default: {
    sanitize: (html: string) => html
  }
}));

describe('Assistant Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders initial assistant message', () => {
    render(<Assistant />);
    expect(screen.getByText(/Namaste! I am your AI Election Assistant/i)).toBeInTheDocument();
  });

  it('sends a query and displays the response', async () => {
    (getAIResponse as jest.Mock).mockResolvedValue({ reply: 'Test response' });
    
    render(<Assistant />);
    
    const input = screen.getByPlaceholderText(/Type your civic query here/i);
    const sendButton = screen.getByLabelText(/Send message/i);
    
    fireEvent.change(input, { target: { value: 'How do I register?' } });
    fireEvent.click(sendButton);
    
    expect(screen.getByText(/How do I register\?/i)).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText(/Test response/i)).toBeInTheDocument();
    });
  });

  it('handles API errors gracefully', async () => {
    (getAIResponse as jest.Mock).mockRejectedValue(new Error('API Error'));
    
    render(<Assistant />);
    
    const input = screen.getByPlaceholderText(/Type your civic query here/i);
    const sendButton = screen.getByLabelText(/Send message/i);
    
    fireEvent.change(input, { target: { value: 'Error query' } });
    fireEvent.click(sendButton);
    
    await waitFor(() => {
      expect(screen.getByText(/I apologize, but I am having trouble connecting/i)).toBeInTheDocument();
    });
  });
});
