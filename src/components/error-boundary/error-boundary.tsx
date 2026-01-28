import { Component, type ErrorInfo, type ReactNode } from 'react'

import { RefreshCw01 } from '@untitledui/icons'

import { Button } from '@/components/base/buttons/button'

interface ErrorBoundaryProps {
	children: ReactNode
	fallback?: ReactNode
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

	componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		// Log error to console in development
		if (import.meta.env.DEV) {
			console.error('Error Boundary caught an error:', error)
			console.error('Component stack:', errorInfo.componentStack)
		}
	}

	handleRetry = (): void => {
		this.setState({ hasError: false, error: null })
	}

	handleGoHome = (): void => {
		window.location.href = '/'
	}

	render(): ReactNode {
		if (this.state.hasError) {
			if (this.props.fallback) {
				return this.props.fallback
			}

			return (
				<div className='flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4'>
					<div className='mx-auto max-w-md text-center'>
						<div className='mb-6 inline-flex size-16 items-center justify-center rounded-full bg-error-100'>
							<svg
								className='size-8 text-error-600'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
								strokeWidth={2}
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
								/>
							</svg>
						</div>

						<h1 className='mb-2 text-2xl font-semibold text-gray-900'>Something went wrong</h1>
						<p className='mb-8 text-gray-600'>
							We're sorry, but something unexpected happened. Please try again or return to the home page.
						</p>

						{import.meta.env.DEV && this.state.error && (
							<div className='mb-8 rounded-lg bg-gray-100 p-4 text-left'>
								<p className='mb-1 text-xs font-medium text-gray-500'>Error details (dev only):</p>
								<code className='text-xs text-error-600'>{this.state.error.message}</code>
							</div>
						)}

						<div className='flex flex-col gap-3 sm:flex-row sm:justify-center'>
							<Button onClick={this.handleRetry} color='primary' iconLeading={RefreshCw01}>
								Try Again
							</Button>
							<Button onClick={this.handleGoHome} color='secondary'>
								Go Home
							</Button>
						</div>
					</div>
				</div>
			)
		}

		return this.props.children
	}
}
