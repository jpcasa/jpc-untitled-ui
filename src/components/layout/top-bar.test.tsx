import { describe, expect, it } from 'vitest'

import { render, screen } from '@/test/test-utils'

import { TopBar } from './top-bar'

describe('TopBar', () => {
	it('renders the logo', () => {
		render(<TopBar />)
		// Logo renders SVG within a link to home
		const homeLink = screen.getAllByRole('link').find((link) => link.getAttribute('href') === '/')
		expect(homeLink).toBeInTheDocument()
	})

	it('renders navigation links', () => {
		render(<TopBar />)
		// Use getAllByRole since links appear in both mobile and desktop navigation
		const aboutLinks = screen.getAllByRole('link', { name: /about me/i })
		expect(aboutLinks.length).toBeGreaterThan(0)
		const workLinks = screen.getAllByRole('link', { name: /^work$/i })
		expect(workLinks.length).toBeGreaterThan(0)
		const blogLinks = screen.getAllByRole('link', { name: /^blog$/i })
		expect(blogLinks.length).toBeGreaterThan(0)
	})

	it('renders CV download button', () => {
		render(<TopBar />)
		const cvLinks = screen.getAllByRole('link', { name: /cv/i })
		expect(cvLinks.length).toBeGreaterThan(0)
		const cvLink = cvLinks[0]
		expect(cvLink).toHaveAttribute('href', '/JP-CV.pdf')
		expect(cvLink).toHaveAttribute('download', 'JP-Casabianca-CV.pdf')
	})

	it("renders Let's Connect button with mailto link", () => {
		render(<TopBar />)
		const connectLinks = screen.getAllByRole('link', { name: /let's connect/i })
		expect(connectLinks.length).toBeGreaterThan(0)
		expect(connectLinks[0]).toHaveAttribute('href', expect.stringContaining('mailto:'))
	})

	it('renders mobile menu button with accessibility label', () => {
		render(<TopBar />)
		const menuButton = screen.getByRole('button', { name: /open menu/i })
		expect(menuButton).toBeInTheDocument()
	})

	it('toggles mobile menu when button is clicked', async () => {
		const { user } = render(<TopBar />)

		const menuButton = screen.getByRole('button', { name: /open menu/i })
		await user.click(menuButton)

		// After opening, there should be close buttons visible
		const closeButtons = screen.getAllByRole('button', { name: /close menu/i })
		expect(closeButtons.length).toBeGreaterThan(0)
	})

	it('closes mobile menu when close button is clicked', async () => {
		const { user } = render(<TopBar />)

		// Open menu
		const menuButton = screen.getByRole('button', { name: /open menu/i })
		await user.click(menuButton)

		// Close menu
		const closeButtons = screen.getAllByRole('button', { name: /close menu/i })
		await user.click(closeButtons[0])

		// Menu should be closed, showing "Open menu" again
		expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument()
	})

	it('renders availability status', () => {
		render(<TopBar />)
		// The status text from profile.json is "Open to Work (EST)"
		const statusElements = screen.getAllByText(/open to work/i)
		expect(statusElements.length).toBeGreaterThan(0)
	})

	it('sets body overflow to hidden when mobile menu is open', async () => {
		const { user } = render(<TopBar />)

		const menuButton = screen.getByRole('button', { name: /open menu/i })
		await user.click(menuButton)

		expect(document.body.style.overflow).toBe('hidden')
	})

	it('restores body overflow when mobile menu is closed', async () => {
		const { user } = render(<TopBar />)

		const menuButton = screen.getByRole('button', { name: /open menu/i })
		await user.click(menuButton)
		expect(document.body.style.overflow).toBe('hidden')

		const closeButtons = screen.getAllByRole('button', { name: /close menu/i })
		await user.click(closeButtons[0])

		expect(document.body.style.overflow).toBe('')
	})

	it('switches to light mode after scrolling past threshold', () => {
		// Mock scroll position
		Object.defineProperty(window, 'scrollY', { value: 600, writable: true })

		const { container } = render(<TopBar />)

		// Trigger scroll event
		window.dispatchEvent(new Event('scroll'))

		// The header should have light mode classes (bg-primary)
		const header = container.querySelector('.bg-primary')
		expect(header).toBeInTheDocument()
	})
})
