import type { FC } from 'react'

import { Badge } from '@/components/base/badges/badges'
import { cx } from '@/utils/cx'

interface ExperienceCardProps {
	company: string
	role: string
	tech?: string
	period: string
	location: string
	description: string
	highlights: string[]
	metrics?: string[]
	className?: string
}

export const ExperienceCard: FC<ExperienceCardProps> = ({
	company,
	role,
	tech,
	period,
	location,
	description,
	highlights,
	metrics,
	className,
}) => {
	return (
		<div className={cx('border-b border-gray-200 pb-8', className)}>
			<div className='mb-4 flex flex-col gap-2 md:flex-row md:items-start md:justify-between'>
				<div>
					<h3 className='text-lg font-semibold text-gray-900'>{company}</h3>
					<p className='text-sm text-gray-600'>{role}</p>
				</div>
				<div className='flex flex-wrap items-center gap-2'>
					<Badge color='gray' size='sm'>
						{period}
					</Badge>
					<Badge color='brand' size='sm'>
						{location}
					</Badge>
					{tech && (
						<Badge color='success' size='sm'>
							{tech}
						</Badge>
					)}
				</div>
			</div>

			<p className='mb-4 text-gray-600'>{description}</p>

			{metrics && metrics.length > 0 && (
				<div className='mb-4 flex flex-wrap gap-2'>
					{metrics.map((metric, index) => (
						<span
							key={index}
							className='inline-flex items-center rounded-md bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700'
						>
							{metric}
						</span>
					))}
				</div>
			)}

			<ul className='list-inside list-disc space-y-1 text-sm text-gray-500'>
				{highlights.map((highlight, index) => (
					<li key={index}>{highlight}</li>
				))}
			</ul>
		</div>
	)
}
