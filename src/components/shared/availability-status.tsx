import type { FC } from 'react'

import { cx } from '@/utils/cx'

interface AvailabilityStatusProps {
	isAvailable: boolean
	status: string
	className?: string
}

export const AvailabilityStatus: FC<AvailabilityStatusProps> = ({ isAvailable, status, className }) => {
	return (
		<div
			className={cx(
				'flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium',
				isAvailable ? 'border-success-200 bg-success-50 text-success-700' : 'border-gray-200 bg-gray-50 text-gray-600',
				className
			)}
		>
			<span className='relative flex size-2'>
				{isAvailable && (
					<span className='absolute inline-flex size-full animate-ping rounded-full bg-success-400 opacity-75' />
				)}
				<span
					className={cx('relative inline-flex size-2 rounded-full', isAvailable ? 'bg-success-500' : 'bg-gray-400')}
				/>
			</span>
			{status}
		</div>
	)
}
