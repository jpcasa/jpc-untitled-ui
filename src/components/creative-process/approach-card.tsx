import type { FC } from 'react'

import { FeaturedIcon } from '@/components/foundations/featured-icon/featured-icon'
import { cx } from '@/utils/cx'

interface ApproachCardProps {
	icon: FC<{ className?: string }>
	title: string
	description: string
	className?: string
}

export const ApproachCard: FC<ApproachCardProps> = ({ icon: Icon, title, description, className }) => {
	return (
		<div
			className={cx(
				'rounded-xl border border-secondary bg-primary p-6 transition-all hover:border-brand-200 hover:shadow-lg dark:hover:border-brand-800',
				className
			)}
		>
			{/* Icon */}
			<div className='mb-4'>
				<FeaturedIcon icon={Icon} size='lg' color='brand' theme='modern-neue' />
			</div>

			{/* Content */}
			<h3 className='mb-2 text-lg font-semibold text-primary'>{title}</h3>
			<p className='text-sm leading-relaxed text-secondary'>{description}</p>
		</div>
	)
}
