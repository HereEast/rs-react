import { Component, ReactNode, ErrorInfo } from "react";
import { Message } from "../Message";
import { Button } from "../Button";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    this.setState({ hasError: true });
    console.log(error, info);
  }

  resetError(): void {
    this.setState({ hasError: false });
    location.reload();
    console.clear();
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <Message message="Something went wrong!">
          <Button title="Reload page" onClick={(): void => this.resetError()} />
        </Message>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
