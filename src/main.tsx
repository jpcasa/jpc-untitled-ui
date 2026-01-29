import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router'

import '@/assets/fonts/style.css'
import { ErrorBoundary } from '@/components/error-boundary'
import { TopBar } from '@/components/layout/top-bar'
// Initialize i18n before other imports
import '@/locales'
import { RouteProvider } from '@/providers/router-provider'
import { ThemeProvider } from '@/providers/theme-provider'
import { AppRoutes } from '@/router'
import '@/styles/globals.css'
import { initWebVitals } from '@/utils/web-vitals'

// Initialize Web Vitals monitoring
initWebVitals()

const App = () => {
	return (
		<StrictMode>
			<ErrorBoundary>
				<HelmetProvider>
					<ThemeProvider>
						<BrowserRouter>
							<RouteProvider>
								<TopBar />
								<main id='main-content'>
									<AppRoutes />
								</main>
							</RouteProvider>
						</BrowserRouter>
					</ThemeProvider>
				</HelmetProvider>
			</ErrorBoundary>
		</StrictMode>
	)
}

createRoot(document.getElementById('root')!).render(<App />)
