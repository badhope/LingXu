'use client'

import React, { Component, ReactNode, useEffect } from 'react'

interface FallbackProps {
  error: Error
  resetErrorBoundary: () => void
}

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode | ((props: FallbackProps) => ReactNode)
  onReset?: () => void
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('🔴 ErrorBoundary捕获异常:', error, errorInfo)
    this.props.onError?.(error, errorInfo)
  }

  resetErrorBoundary = () => {
    this.props.onReset?.()
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError && this.state.error) {
      const fallbackProps: FallbackProps = {
        error: this.state.error,
        resetErrorBoundary: this.resetErrorBoundary,
      }

      if (typeof this.props.fallback === 'function') {
        return this.props.fallback(fallbackProps)
      }

      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-950 p-8">
          <div className="text-center max-w-md">
            <div className="text-8xl mb-6">☯️</div>
            <h2 className="text-3xl font-bold text-amber-400 mb-4" style={{ fontFamily: 'Ma Shan Zheng' }}>
              道途遇阻
            </h2>
            <p className="text-slate-400 mb-2 text-lg">
              修行路上难免遭遇心魔
            </p>
            <p className="text-slate-500 mb-8 text-sm">
              {this.state.error.message || '未知异常'}
            </p>
            <button
              onClick={this.resetErrorBoundary}
              className="px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg hover:shadow-xl"
            >
              🧘 重新入定
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export function GlobalErrorHandler() {
  useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.warn('⚠️ 未处理的Promise异常:', event.reason)
      event.preventDefault()
    }

    const handleError = (event: ErrorEvent) => {
      console.error('🔴 全局错误:', event.error)
    }

    window.addEventListener('unhandledrejection', handleUnhandledRejection)
    window.addEventListener('error', handleError)

    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
      window.removeEventListener('error', handleError)
    }
  }, [])

  return null
}
