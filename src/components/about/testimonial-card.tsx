import type { FC } from 'react'

import { Avatar } from '@/components/base/avatar/avatar'
import { RatingStars } from '@/components/foundations/rating-stars'
import { cx } from '@/utils/cx'

interface TestimonialCardProps {
	quote: string
	name: string
	company: string
	role: string
	rating: number
	image: string
	className?: string
}

export const TestimonialCard: FC<TestimonialCardProps> = ({ quote, name, company, role, rating, image, className }) => {
	return (
		<div className={cx('flex h-full flex-col rounded-2xl bg-primary p-6 shadow-lg', className)}>
			<RatingStars rating={rating} className='mb-4' />

			<blockquote className='mb-6 flex-1 text-secondary'>"{quote}"</blockquote>

			<div className='flex items-center gap-3'>
				<Avatar src={image} alt={name} size='lg' />
				<div>
					<p className='font-semibold text-primary'>{name}</p>
					<p className='text-sm text-secondary'>
						{role} @ {company}
					</p>
				</div>
			</div>
		</div>
	)
}
