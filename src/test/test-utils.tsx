import type { ReactElement, ReactNode } from 'react'

import type { RenderOptions } from '@testing-library/react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'

import { ThemeProvider } from '@/providers/theme-provider'

interface AllProvidersProps {
	children: ReactNode
}

function AllProviders({ children }: AllProvidersProps) {
	return (
		<HelmetProvider>
			<ThemeProvider>
				<BrowserRouter>{children}</BrowserRouter>
			</ThemeProvider>
		</HelmetProvider>
	)
}

function customRender(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
	return {
		user: userEvent.setup(),
		...render(ui, { wrapper: AllProviders, ...options }),
	}
}

// Re-export everything from testing-library
export * from '@testing-library/react'
export { userEvent }

// Override render with our custom render
export { customRender as render }
