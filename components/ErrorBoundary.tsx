"use client"

import React, { Component, ReactNode } from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: React.ErrorInfo | null
}

/**
 * Production-grade Error Boundary Component
 * 
 * Catches JavaScript errors anywhere in child component tree,
 * logs those errors, and displays a fallback UI.
 * 
 * Features:
 * - Graceful error display with recovery options
 * - Error logging for debugging
 * - Automatic error reporting (optional)
 * - Reset functionality
 */
export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    }
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error details for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    
    // Store error info in state
    this.setState({
      error,
      errorInfo
    })

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }

    // Optional: Send to error tracking service (e.g., Sentry)
    // this.logErrorToService(error, errorInfo)
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    })
  }

  handleGoHome = () => {
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback provided
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default error UI
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-6">
          <Card className="max-w-2xl w-full shadow-xl">
            <CardHeader className="border-b border-red-200 bg-red-50">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-red-900">Something went wrong</CardTitle>
                  <p className="text-sm text-red-700 mt-1">
                    We encountered an unexpected error. Don't worry, your data is safe.
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-6 space-y-6">
              {/* Error Details (Development/Debug) */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="bg-slate-900 rounded-lg p-4 overflow-auto max-h-64">
                  <div className="text-xs font-mono text-red-400 mb-2">
                    {this.state.error.name}: {this.state.error.message}
                  </div>
                  <pre className="text-xs font-mono text-slate-300 whitespace-pre-wrap">
                    {this.state.error.stack}
                  </pre>
                  {this.state.errorInfo && (
                    <details className="mt-4">
                      <summary className="text-xs font-mono text-slate-400 cursor-pointer hover:text-slate-300">
                        Component Stack
                      </summary>
                      <pre className="text-xs font-mono text-slate-300 mt-2 whitespace-pre-wrap">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </details>
                  )}
                </div>
              )}

              {/* Production Message */}
              {process.env.NODE_ENV !== 'development' && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <p className="text-slate-700 text-sm leading-relaxed">
                    The application encountered an error and couldn't complete your request. 
                    This has been logged and our team will investigate. You can try the following:
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-slate-600 list-disc list-inside">
                    <li>Refresh the page and try again</li>
                    <li>Clear your browser cache</li>
                    <li>Return to the home page</li>
                    <li>Contact support if the issue persists</li>
                  </ul>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={this.handleReset}
                  className="flex-1 bg-umukozi-orange hover:bg-umukozi-orange/90 text-white"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
                <Button
                  onClick={this.handleGoHome}
                  variant="outline"
                  className="flex-1 border-slate-300 hover:bg-slate-50"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Go Home
                </Button>
              </div>

              {/* Support Info */}
              <div className="text-center text-xs text-slate-500 pt-4 border-t border-slate-200">
                If this problem persists, please contact{' '}
                <a href="mailto:support@umukozihr.com" className="text-umukozi-orange hover:underline">
                  support@umukozihr.com
                </a>
                {' '}with the error details above.
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}

/**
 * Hook-based error boundary wrapper for functional components
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode
) {
  return function WithErrorBoundary(props: P) {
    return (
      <ErrorBoundary fallback={fallback}>
        <Component {...props} />
      </ErrorBoundary>
    )
  }
}
