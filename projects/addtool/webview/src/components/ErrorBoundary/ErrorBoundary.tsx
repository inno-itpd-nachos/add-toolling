import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'
import './styles.css'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    }
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    this.setState({
      error,
      errorInfo
    })
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    })
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-boundary__container">
            <h1 className="error-boundary__title">⚠️ Something went wrong</h1>
            
            <div className="error-boundary__content">
              <h2 className="error-boundary__subtitle">Error Details:</h2>
              
              {this.state.error && (
                <div className="error-boundary__error">
                  <strong>Message:</strong>
                  <pre className="error-boundary__message">
                    {this.state.error.toString()}
                  </pre>
                </div>
              )}

              {this.state.error?.stack && (
                <details className="error-boundary__stack">
                  <summary>Stack Trace</summary>
                  <pre>{this.state.error.stack}</pre>
                </details>
              )}

              {this.state.errorInfo?.componentStack && (
                <details className="error-boundary__component-stack">
                  <summary>Component Stack</summary>
                  <pre>{this.state.errorInfo.componentStack}</pre>
                </details>
              )}
            </div>

            <button 
              className="error-boundary__reset-button"
              onClick={this.handleReset}
            >
              Try Again
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

