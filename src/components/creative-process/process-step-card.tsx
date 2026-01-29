import type { FC } from 'react'

import { FeaturedIcon } from '@/components/foundations/featured-icon/featured-icon'
import { cx } from '@/utils/cx'

interface ProcessStepCardProps {
	stepNumber: string
	icon: FC<{ className?: string }>
	title: string
	description: string
	deliverable?: string
	className?: string
}

export const ProcessStepCard: FC<ProcessStepCardProps> = ({
	stepNumber,
	icon: Icon,
	title,
	description,
	deliverable,
	className,
}) => {
	return (
		<div className={cx('group relative', className)}>
			{/* Step Number */}
			<div className='mb-4 text-sm font-semibold text-brand-400'>{stepNumber}</div>

			{/* Icon */}
			<div className='mb-4'>
				<FeaturedIcon icon={Icon} size='lg' color='brand' theme='gradient' />
			</div>

			{/* Content */}
			<h3 className='mb-2 text-lg font-semibold text-primary'>{title}</h3>
			<p className='mb-4 text-sm leading-relaxed text-secondary'>{description}</p>

			{/* Deliverable */}
			{deliverable && (
				<div className='rounded-lg bg-brand-50 px-3 py-2 dark:bg-brand-950'>
					<p className='text-xs font-medium text-brand-700 dark:text-brand-300'>{deliverable}</p>
				</div>
			)}
		</div>
	)
}
