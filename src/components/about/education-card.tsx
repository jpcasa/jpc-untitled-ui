import type { FC } from 'react'

import { GraduationHat02 } from '@untitledui/icons'

import { Badge } from '@/components/base/badges/badges'
import { FeaturedIcon } from '@/components/foundations/featured-icon/featured-icon'
import { cx } from '@/utils/cx'

interface EducationCardProps {
	institution: string
	degree: string
	period: string
	gpa?: string
	logo?: string
	className?: string
}

export const EducationCard: FC<EducationCardProps> = ({ institution, degree, period, gpa, logo, className }) => {
	return (
		<div className={cx('flex items-center gap-4 rounded-xl border border-secondary bg-primary p-4', className)}>
			{logo ? (
				<img src={logo} alt={`${institution} logo`} className='size-12 rounded-lg object-contain' />
			) : (
				<FeaturedIcon icon={GraduationHat02} size='lg' color='brand' theme='light' />
			)}
			<div className='flex-1'>
				<h4 className='font-semibold text-primary'>{institution}</h4>
				<p className='text-sm text-secondary'>{degree}</p>
				<div className='mt-2 flex flex-wrap items-center gap-2'>
					<Badge type='pill-color' color='gray' size='sm'>
						{period}
					</Badge>
					{gpa && (
						<Badge type='pill-color' color='brand' size='sm'>
							GPA: {gpa}
						</Badge>
					)}
				</div>
			</div>
		</div>
	)
}
