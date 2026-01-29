import type { FC } from 'react'

import { Badge } from '@/components/base/badges/badges'
import { cx } from '@/utils/cx'

interface LanguageBadgeProps {
	language: string
	level: string
	className?: string
}

export const LanguageBadge: FC<LanguageBadgeProps> = ({ language, level, className }) => {
	const isNative = level.toLowerCase() === 'native'

	return (
		<div className={cx('flex flex-col items-center gap-2', className)}>
			<span className='text-lg font-semibold text-primary'>{language}</span>
			<Badge type='pill-color' color={isNative ? 'brand' : 'gray'} size='sm'>
				{level}
			</Badge>
		</div>
	)
}
