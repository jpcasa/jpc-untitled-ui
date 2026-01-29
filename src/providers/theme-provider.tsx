import type { ReactNode } from 'react'
import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
	theme: Theme
	toggleTheme: () => void
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
	const [theme, setTheme] = useState<Theme>(() => {
		if (typeof window !== 'undefined') {
			const savedTheme = localStorage.getItem('ui-theme') as Theme | null
			return savedTheme || 'light'
		}
		return 'light'
	})

	useEffect(() => {
		const root = window.document.documentElement

		if (theme === 'dark') {
			root.classList.add('dark-mode')
		} else {
			root.classList.remove('dark-mode')
		}

		localStorage.setItem('ui-theme', theme)
	}, [theme])

	const toggleTheme = () => {
		setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
	}

	return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}
