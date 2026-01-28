import type { FC } from 'react'

import { cx } from '@/utils/cx'

interface SectionHeaderProps {
	title?: string
	subtitle?: string
	description?: string
	align?: 'left' | 'center'
	className?: string
}

export const SectionHeader: FC<SectionHeaderProps> = ({
	title,
	subtitle,
	description,
	align = 'center',
	className,
}) => {
	return (
		<div className={cx('mb-8', align === 'center' ? 'text-center' : 'text-left', className)}>
			{subtitle && <p className='mb-2 text-sm font-semibold text-brand-600'>{subtitle}</p>}
			{title && <h2 className='mb-4 text-2xl font-semibold text-gray-900 md:text-3xl'>{title}</h2>}
			{description && <p className='mx-auto max-w-2xl text-gray-600'>{description}</p>}
		</div>
	)
}
