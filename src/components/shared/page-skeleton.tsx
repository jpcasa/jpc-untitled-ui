import type { FC } from 'react'

import { cx } from '@/utils/cx'

interface PageSkeletonProps {
	className?: string
}

export const PageSkeleton: FC<PageSkeletonProps> = ({ className }) => {
	return (
		<div className={cx('min-h-screen bg-secondary', className)}>
			{/* Header skeleton */}
			<div className='bg-gray-900 py-16 pt-32'>
				<div className='container mx-auto px-4'>
					<div className='mx-auto max-w-2xl text-center'>
						{/* Subtitle */}
						<div className='mx-auto mb-3 h-4 w-24 animate-pulse rounded bg-gray-700' />
						{/* Title */}
						<div className='mx-auto mb-6 h-10 w-80 animate-pulse rounded bg-gray-700' />
						{/* Description */}
						<div className='mx-auto h-5 w-96 max-w-full animate-pulse rounded bg-gray-700' />
					</div>
				</div>
			</div>

			{/* Content skeleton */}
			<div className='container mx-auto px-4 py-12'>
				<div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
					{Array.from({ length: 6 }).map((_, i) => (
						<div key={i} className='rounded-lg border border-secondary bg-primary p-6'>
							{/* Card image placeholder */}
							<div className='mb-4 h-40 animate-pulse rounded-lg bg-tertiary' />
							{/* Card title */}
							<div className='mb-2 h-5 w-3/4 animate-pulse rounded bg-tertiary' />
							{/* Card description */}
							<div className='mb-1 h-4 w-full animate-pulse rounded bg-secondary' />
							<div className='h-4 w-2/3 animate-pulse rounded bg-secondary' />
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
