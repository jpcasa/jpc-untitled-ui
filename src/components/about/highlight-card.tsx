import type { FC } from 'react'

import { FeaturedIcon } from '@/components/foundations/featured-icon/featured-icon'
import { cx } from '@/utils/cx'

interface HighlightCardProps {
	value: string
	label: string
	icon: FC<{ className?: string }>
	className?: string
}

export const HighlightCard: FC<HighlightCardProps> = ({ value, label, icon: Icon, className }) => {
	return (
		<div className={cx('flex flex-col items-center text-center', className)}>
			<div className='mb-3 md:mb-4'>
				<FeaturedIcon icon={Icon} size='md' color='brand' theme='gradient' />
			</div>
			<div className='text-3xl font-bold text-primary sm:text-4xl md:text-5xl'>{value}</div>
			<p className='mt-1 text-xs font-medium text-secondary sm:mt-2 sm:text-sm'>{label}</p>
		</div>
	)
}
