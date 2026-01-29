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
			<div className='mb-4'>
				<FeaturedIcon icon={Icon} size='lg' color='brand' theme='gradient' />
			</div>
			<div className='text-4xl font-bold text-primary md:text-5xl'>{value}</div>
			<p className='mt-2 text-sm font-medium text-secondary'>{label}</p>
		</div>
	)
}
