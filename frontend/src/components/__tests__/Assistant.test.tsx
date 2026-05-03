import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Assistant } from '../Assistant';
import { getAIResponse, uploadFile } from '../../services/api';
import { LanguageProvider } from '../../i18n/LanguageContext';
import '@testing-library/jest-dom';

// Mock the API service
jest.mock('../../services/api', () => ({
  getAIResponse: jest.fn(),
  uploadFile: jest.fn()
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
    // Mock scrollIntoView which is not available in JSDOM
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  });

  it('renders initial assistant message', () => {
    render(<LanguageProvider><Assistant /></LanguageProvider>);
    expect(screen.getAllByText(/Have a question\? Ask our smart Google Gemini AI assistant/i).length).toBeGreaterThan(0);
  });

  it('sends a query and displays the response', async () => {
    (getAIResponse as jest.Mock).mockResolvedValue({ reply: 'Test response' });
    
    render(<LanguageProvider><Assistant /></LanguageProvider>);
    
    const input = screen.getByPlaceholderText(/Type your civic query here/i);
    const sendButton = screen.getByLabelText(/Send message/i);
    
    fireEvent.change(input, { target: { value: 'How do I register?' } });
    fireEvent.click(sendButton);
    
    expect(screen.getByText(/How do I register\?/i)).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText(/Test response/i)).toBeInTheDocument();
    });
  });

  it('handles suggestion chips', async () => {
    (getAIResponse as jest.Mock).mockResolvedValue({ reply: 'Suggestion response' });
    render(<LanguageProvider><Assistant /></LanguageProvider>);
    
    const suggestion = screen.getByText(/How do I register to vote\?/i);
    fireEvent.click(suggestion);
    
    await waitFor(() => {
      expect(screen.getByText(/Suggestion response/i)).toBeInTheDocument();
    });
  });

  it('handles file upload', async () => {
    (uploadFile as jest.Mock).mockResolvedValue({ url: 'http://test.com/file.jpg' });
    render(<LanguageProvider><Assistant /></LanguageProvider>);
    
    const file = new File(['hello'], 'hello.png', { type: 'image/png' });
    const input = screen.getByLabelText(/Upload document/i).nextElementSibling as HTMLInputElement;
    
    fireEvent.change(input, { target: { files: [file] } });
    
    await waitFor(() => {
      expect(screen.getByText(/Uploaded a file: hello.png/i)).toBeInTheDocument();
      expect(screen.getByText(/I've received your document/i)).toBeInTheDocument();
    });
  });

  it('handles API errors gracefully', async () => {
    (getAIResponse as jest.Mock).mockRejectedValue(new Error('API Error'));
    
    render(<LanguageProvider><Assistant /></LanguageProvider>);
    
    const input = screen.getByPlaceholderText(/Type your civic query here/i);
    const sendButton = screen.getByLabelText(/Send message/i);
    
    fireEvent.change(input, { target: { value: 'Error query' } });
    fireEvent.click(sendButton);
    
    await waitFor(() => {
      expect(screen.getByText(/I apologize, but I am having trouble connecting/i)).toBeInTheDocument();
    });
  });
});
