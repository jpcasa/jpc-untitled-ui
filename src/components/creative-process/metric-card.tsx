import type { FC } from 'react'

import { cx } from '@/utils/cx'

interface MetricCardProps {
	value: string
	label: string
	className?: string
}

export const MetricCard: FC<MetricCardProps> = ({ value, label, className }) => {
	return (
		<div className={cx('text-center', className)}>
			<div className='mb-2 text-4xl font-bold text-brand-600 md:text-5xl'>{value}</div>
			<p className='text-sm font-medium text-secondary'>{label}</p>
		</div>
	)
}
