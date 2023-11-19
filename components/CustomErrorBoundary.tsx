// CustomErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';

type CustomErrorBoundaryProps = {
  children: ReactNode;
};

type CustomErrorBoundaryState = {
  hasError: boolean;
};

class CustomErrorBoundary extends Component<CustomErrorBoundaryProps, CustomErrorBoundaryState> {
  constructor(props: CustomErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): CustomErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log({ error, errorInfo });
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Oops, there is an error!</h2>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false })}
          >
            Try again?
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default CustomErrorBoundary;