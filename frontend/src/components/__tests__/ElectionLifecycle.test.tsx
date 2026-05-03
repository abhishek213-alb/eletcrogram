import { render, screen, fireEvent } from '@testing-library/react';
import { ElectionLifecycle } from '../ElectionLifecycle';
import '@testing-library/jest-dom';

// Mock framer-motion and icons
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

jest.mock('lucide-react', () => ({
  Calendar: () => <div data-testid="icon-calendar" />,
  UserCheck: () => <div data-testid="icon-usercheck" />,
  Megaphone: () => <div data-testid="icon-megaphone" />,
  Vote: () => <div data-testid="icon-vote" />,
  BarChart3: () => <div data-testid="icon-barchart" />,
  Trophy: () => <div data-testid="icon-trophy" />,
  ChevronRight: () => <div data-testid="icon-right" />,
  ChevronLeft: () => <div data-testid="icon-left" />,
}));

describe('ElectionLifecycle Component', () => {
  it('renders correctly', () => {
    render(<ElectionLifecycle />);
    expect(screen.getByText(/The Democratic Journey/i)).toBeInTheDocument();
  });

  it('navigates through steps', () => {
    render(<ElectionLifecycle />);
    const nextBtn = screen.getByText(/Next Step/i);
    
    // Initial step
    expect(screen.getAllByText(/Election Notification/i).length).toBeGreaterThan(1);
    
    // Go to next step
    fireEvent.click(nextBtn);
    expect(screen.getAllByText(/Nominations & Scrutiny/i).length).toBeGreaterThan(1);
    
    // Go to previous step
    const prevBtn = screen.getByText(/Previous/i);
    fireEvent.click(prevBtn);
    expect(screen.getAllByText(/Election Notification/i).length).toBeGreaterThan(1);
  });

  it('jumps to a step via sidebar', () => {
    render(<ElectionLifecycle />);
    const pollingStep = screen.getByText(/Polling Day/i);
    fireEvent.click(pollingStep);
    expect(screen.getAllByText(/Polling Day/i).length).toBeGreaterThan(1); // Header and content
  });
});
