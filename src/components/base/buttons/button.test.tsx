import { describe, expect, it, vi } from 'vitest'

import { render, screen } from '@/test/test-utils'

import { Button } from './button'

describe('Button', () => {
	it('renders with text content', () => {
		render(<Button>Click me</Button>)
		expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
	})

	it('calls onClick handler when clicked', async () => {
		const handleClick = vi.fn()
		const { user } = render(<Button onClick={handleClick}>Click me</Button>)

		await user.click(screen.getByRole('button', { name: /click me/i }))

		expect(handleClick).toHaveBeenCalledTimes(1)
	})

	it('does not call onClick when disabled', async () => {
		const handleClick = vi.fn()
		const { user } = render(
			<Button onClick={handleClick} isDisabled>
				Click me
			</Button>
		)

		const button = screen.getByRole('button', { name: /click me/i })
		await user.click(button)

		expect(handleClick).not.toHaveBeenCalled()
	})

	it('renders loading state with spinner', () => {
		render(<Button isLoading>Click me</Button>)

		const button = screen.getByRole('button')
		expect(button).toHaveAttribute('data-loading', 'true')
	})

	it('renders as a link when href is provided', () => {
		render(<Button href='/about'>Go to About</Button>)

		expect(screen.getByRole('link', { name: /go to about/i })).toBeInTheDocument()
	})

	it('applies size variant classes', () => {
		const { container } = render(<Button size='lg'>Large Button</Button>)

		const button = container.querySelector('button')
		expect(button).toHaveClass('text-md')
	})

	it('applies color variant classes', () => {
		const { container } = render(<Button color='secondary'>Secondary Button</Button>)

		const button = container.querySelector('button')
		expect(button).toHaveClass('bg-primary')
	})

	it('renders leading icon', () => {
		const TestIcon = ({ className }: { className?: string }) => <svg data-testid='leading-icon' className={className} />

		render(<Button iconLeading={TestIcon}>With Icon</Button>)

		expect(screen.getByTestId('leading-icon')).toBeInTheDocument()
	})

	it('renders trailing icon', () => {
		const TestIcon = ({ className }: { className?: string }) => (
			<svg data-testid='trailing-icon' className={className} />
		)

		render(<Button iconTrailing={TestIcon}>With Icon</Button>)

		expect(screen.getByTestId('trailing-icon')).toBeInTheDocument()
	})

	it('renders icon-only button', () => {
		const TestIcon = ({ className }: { className?: string }) => <svg data-testid='icon' className={className} />

		render(<Button iconLeading={TestIcon} />)

		const button = screen.getByRole('button')
		expect(button).toHaveAttribute('data-icon-only', 'true')
	})
})
