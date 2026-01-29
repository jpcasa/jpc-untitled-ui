import type { FC } from 'react'

import { ArrowUpRight } from '@untitledui/icons'

import { Badge } from '@/components/base/badges/badges'

type CardSize = 'large' | 'medium' | 'small'

interface BentoCardProps {
	title: string
	subtitle: string
	summary: string
	image: string
	logo: string
	bgColor: string
	tags: string[]
	link: string | null
	outcomes?: string[]
	size?: CardSize
}

export const BentoCard: FC<BentoCardProps> = ({
	title,
	subtitle,
	summary,
	image,
	logo,
	bgColor,
	tags,
	link,
	outcomes,
	size = 'medium',
}) => {
	const isLarge = size === 'large'

	return (
		<div
			className={`group flex flex-col overflow-hidden rounded-2xl border border-secondary bg-primary transition-all duration-300 hover:shadow-xl ${
				isLarge ? 'md:col-span-2' : ''
			}`}
		>
			{/* Image Section */}
			<div className='relative overflow-hidden' style={{ backgroundColor: bgColor }}>
				<div className={`relative ${isLarge ? 'h-64 md:h-80' : 'h-48 md:h-56'}`}>
					<img
						src={image}
						alt={title}
						className='h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105'
					/>

					{/* Logo Badge */}
					<div className='absolute top-4 left-4'>
						<div className='rounded-lg bg-white/95 p-2 shadow-sm backdrop-blur-sm'>
							<img src={logo} alt={title} className='h-5 w-auto object-contain' />
						</div>
					</div>

					{/* External Link Icon */}
					{link && (
						<a
							href={link}
							target='_blank'
							rel='noopener noreferrer'
							className='absolute top-4 right-4 rounded-full bg-white/95 p-2 shadow-sm backdrop-blur-sm transition-transform duration-300 hover:scale-110'
							aria-label={`Visit ${title}`}
						>
							<ArrowUpRight className='size-4 text-primary' />
						</a>
					)}
				</div>
			</div>

			{/* Content Section */}
			<div className='flex flex-1 flex-col p-5'>
				{/* Subtitle */}
				<span className='mb-1 text-xs font-semibold tracking-wider text-brand-600 uppercase'>{subtitle}</span>

				{/* Title */}
				<h3 className={`mb-2 font-semibold text-primary ${isLarge ? 'text-xl md:text-2xl' : 'text-lg'}`}>{title}</h3>

				{/* Summary */}
				<p className={`mb-4 text-sm text-secondary ${isLarge ? 'line-clamp-3' : 'line-clamp-2'}`}>{summary}</p>

				{/* Outcomes */}
				{outcomes && outcomes.length > 0 && (
					<div className='mb-4 flex flex-wrap gap-1.5'>
						{outcomes.map((outcome, index) => (
							<span
								key={index}
								className='inline-flex items-center rounded-full bg-success-50 px-2.5 py-1 text-xs font-medium text-success-700'
							>
								{outcome}
							</span>
						))}
					</div>
				)}

				{/* Tags */}
				<div className='mt-auto flex flex-wrap gap-1.5'>
					{tags.map((tag, index) => (
						<Badge key={index} color='gray' size='sm'>
							{tag}
						</Badge>
					))}
				</div>
			</div>
		</div>
	)
}
