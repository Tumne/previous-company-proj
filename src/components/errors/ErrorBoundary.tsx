import React from 'react';

class ErrorBoundary extends React.Component<{}, { error: any }> {
  constructor(props) {
    super(props);
    this.state = { error: undefined };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  // componentDidCatch(error, errorInfo) {
  //   console.log(error, errorInfo);
  // }

  render() {
    if (this.state.error) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
