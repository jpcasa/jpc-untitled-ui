import type { FC } from 'react'

import { ArrowUpRight } from '@untitledui/icons'

import { Badge } from '@/components/base/badges/badges'
import { Button } from '@/components/base/buttons/button'

interface Benefit {
	label: string
	description: string
}

interface CaseStudyCardProps {
	slug: string
	title: string
	subtitle: string
	summary: string
	image: string
	logo: string
	bgColor: string
	titleColor: string
	subtitleColor: string
	summaryColor: string
	benefitColor: string
	benefits: Benefit[]
	tags: string[]
	link: string | null
	outcomes?: string[]
}

export const CaseStudyCard: FC<CaseStudyCardProps> = ({
	title,
	subtitle,
	summary,
	image,
	logo,
	bgColor,
	titleColor,
	subtitleColor,
	summaryColor,
	benefitColor,
	benefits,
	tags,
	link,
	outcomes,
}) => {
	return (
		<div className='overflow-hidden rounded-2xl shadow-lg' style={{ backgroundColor: bgColor }}>
			{/* Header */}
			<div className='px-8 pt-12 text-center'>
				<img src={logo} alt={title} className='mx-auto mb-4 h-12 w-auto object-contain' />
				<p className='mb-2 text-sm font-semibold' style={{ color: subtitleColor }}>
					{subtitle}
				</p>
				<h3 className='mb-4 text-2xl font-semibold' style={{ color: titleColor }}>
					{title}
				</h3>
				<p className='mx-auto mb-8 max-w-lg text-sm' style={{ color: summaryColor }}>
					{summary}
				</p>
			</div>

			{/* Image */}
			<div className='px-8'>
				<img src={image} alt={title} className='mx-auto w-full max-w-2xl rounded-t-lg object-cover' />
			</div>

			{/* Benefits */}
			<div className='bg-white px-8 py-8'>
				{outcomes && outcomes.length > 0 && (
					<div className='mb-6 flex flex-wrap gap-2'>
						{outcomes.map((outcome, index) => (
							<span
								key={index}
								className='inline-flex items-center rounded-full bg-success-50 px-3 py-1 text-sm font-medium text-success-700'
							>
								{outcome}
							</span>
						))}
					</div>
				)}
				<div className='mb-6 grid gap-4 md:grid-cols-3'>
					{benefits.map((benefit, index) => (
						<div key={index} className='rounded-lg bg-gray-50 p-4'>
							<div className='mb-2 h-1 w-12 rounded' style={{ backgroundColor: benefitColor }} />
							<h4 className='mb-2 text-sm font-semibold text-gray-900'>{benefit.label}</h4>
							<p className='text-xs text-gray-500'>{benefit.description}</p>
						</div>
					))}
				</div>

				{/* Tags and CTA */}
				<div className='flex flex-wrap items-center justify-between gap-4'>
					<div className='flex flex-wrap gap-2'>
						{tags.map((tag, index) => (
							<Badge key={index} color='gray' size='sm'>
								{tag}
							</Badge>
						))}
					</div>

					{link && (
						<Button
							href={link}
							target='_blank'
							rel='noopener noreferrer'
							color='secondary'
							size='sm'
							iconTrailing={ArrowUpRight}
						>
							View Project
						</Button>
					)}
				</div>
			</div>
		</div>
	)
}
