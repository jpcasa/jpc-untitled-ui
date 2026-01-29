import type { ReactNode } from 'react'
import { createContext, useContext } from 'react'

type Theme = 'light'

interface ThemeContextType {
	theme: Theme
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = (): ThemeContextType => {
	const context = useContext(ThemeContext)

	if (context === undefined) {
		throw new Error('useTheme must be used within a ThemeProvider')
	}

	return context
}

interface ThemeProviderProps {
	children: ReactNode
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
	// Always enforce light theme
	const theme: Theme = 'light'

	return <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
}
