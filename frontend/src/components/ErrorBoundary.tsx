import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-8 bg-red-50 border border-red-200 rounded-2xl text-center">
          <h2 className="text-xl font-bold text-red-800 mb-2">Something went wrong in this section.</h2>
          <p className="text-red-600">Please try refreshing the page or check back later.</p>
          <button 
            onClick={() => this.setState({ hasError: false })}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg font-bold"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
