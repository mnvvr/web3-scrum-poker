'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import { LoadingButton } from './LoadingButton'

interface ErrorBoundaryState {
    hasError: boolean
    error?: Error
}

interface ErrorBoundaryProps {
    children: React.ReactNode
    fallback?: React.ComponentType<{ error?: Error; retry: () => void }>
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('Error caught by boundary:', error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            const FallbackComponent = this.props.fallback || DefaultErrorFallback
            return (
                <FallbackComponent 
                    error={this.state.error} 
                    retry={() => this.setState({ hasError: false, error: undefined })}
                />
            )
        }

        return this.props.children
    }
}

function DefaultErrorFallback({ error, retry }: { error?: Error; retry: () => void }) {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full"
            >
                <div className="bg-white border border-black rounded-lg p-8 text-center shadow-lg vintage-paper">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-30"></div>
                    
                    <div className="relative z-10">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <AlertTriangle className="w-8 h-8 text-red-600" />
                        </div>
                        
                        <h2 className="text-2xl font-bold text-black mb-4 font-brand">
                            Oops! Something went wrong
                        </h2>
                        
                        <p className="text-gray-600 mb-6 font-distressed">
                            We encountered an unexpected error. Don't worry, this happens sometimes!
                        </p>
                        
                        {error && process.env.NODE_ENV === 'development' && (
                            <details className="mb-6 text-left bg-gray-100 rounded p-4">
                                <summary className="cursor-pointer font-semibold text-sm">
                                    Error details (dev only)
                                </summary>
                                <pre className="mt-2 text-xs text-red-600 overflow-auto">
                                    {error.message}
                                </pre>
                            </details>
                        )}
                        
                        <div className="flex flex-col sm:flex-row gap-3">
                            <LoadingButton
                                isLoading={false}
                                onClick={retry}
                                className="flex-1"
                            >
                                <span className="flex items-center gap-2">
                                    <RefreshCw className="w-4 h-4" />
                                    Try Again
                                </span>
                            </LoadingButton>
                            
                            <LoadingButton
                                isLoading={false}
                                variant="secondary"
                                onClick={() => window.location.href = '/'}
                                className="flex-1"
                            >
                                <span className="flex items-center gap-2">
                                    <Home className="w-4 h-4" />
                                    Go Home
                                </span>
                            </LoadingButton>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}