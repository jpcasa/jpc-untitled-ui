import { describe, expect, it } from 'vitest'

import { render, screen } from '@/test/test-utils'

import { ExperienceCard } from './experience-card'

const defaultProps = {
	company: 'Acme Corp',
	role: 'Senior Developer',
	period: '2022 - Present',
	location: 'Remote',
	description: 'Building amazing products.',
	highlights: ['Led team of 5 engineers', 'Shipped 3 major features'],
}

describe('ExperienceCard', () => {
	it('renders company name', () => {
		render(<ExperienceCard {...defaultProps} />)
		expect(screen.getByText('Acme Corp')).toBeInTheDocument()
	})

	it('renders role', () => {
		render(<ExperienceCard {...defaultProps} />)
		expect(screen.getByText('Senior Developer')).toBeInTheDocument()
	})

	it('renders period badge', () => {
		render(<ExperienceCard {...defaultProps} />)
		expect(screen.getByText('2022 - Present')).toBeInTheDocument()
	})

	it('renders location badge', () => {
		render(<ExperienceCard {...defaultProps} />)
		expect(screen.getByText('Remote')).toBeInTheDocument()
	})

	it('renders description', () => {
		render(<ExperienceCard {...defaultProps} />)
		expect(screen.getByText('Building amazing products.')).toBeInTheDocument()
	})

	it('renders all highlights', () => {
		render(<ExperienceCard {...defaultProps} />)
		expect(screen.getByText('Led team of 5 engineers')).toBeInTheDocument()
		expect(screen.getByText('Shipped 3 major features')).toBeInTheDocument()
	})

	it('renders tech badge when provided', () => {
		render(<ExperienceCard {...defaultProps} tech='React, TypeScript' />)
		expect(screen.getByText('React, TypeScript')).toBeInTheDocument()
	})

	it('does not render tech badge when not provided', () => {
		render(<ExperienceCard {...defaultProps} />)
		expect(screen.queryByText('React, TypeScript')).not.toBeInTheDocument()
	})

	it('renders metrics when provided', () => {
		const metrics = ['40% faster delivery', 'Led 5-person team']
		render(<ExperienceCard {...defaultProps} metrics={metrics} />)

		expect(screen.getByText('40% faster delivery')).toBeInTheDocument()
		expect(screen.getByText('Led 5-person team')).toBeInTheDocument()
	})

	it('does not render metrics section when not provided', () => {
		const { container } = render(<ExperienceCard {...defaultProps} />)
		const metricsContainer = container.querySelector('.bg-brand-50')
		expect(metricsContainer).not.toBeInTheDocument()
	})

	it('does not render metrics section for empty array', () => {
		const { container } = render(<ExperienceCard {...defaultProps} metrics={[]} />)
		const metricsContainer = container.querySelector('.bg-brand-50')
		expect(metricsContainer).not.toBeInTheDocument()
	})

	it('applies custom className', () => {
		const { container } = render(<ExperienceCard {...defaultProps} className='custom-class' />)
		expect(container.firstChild).toHaveClass('custom-class')
	})
})
