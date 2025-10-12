import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log("Panel Crashed:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return null; // silently ignore or show a fallback
    }
    return this.props.children;
  }
}

export default ErrorBoundary;