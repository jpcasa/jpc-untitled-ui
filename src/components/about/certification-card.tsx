import type { FC } from 'react'

import { Award05 } from '@untitledui/icons'

import { FeaturedIcon } from '@/components/foundations/featured-icon/featured-icon'
import { cx } from '@/utils/cx'

interface CertificationCardProps {
	name: string
	issuer: string
	date: string
	icon?: string
	credentialUrl?: string
	className?: string
}

export const CertificationCard: FC<CertificationCardProps> = ({
	name,
	issuer,
	date,
	icon,
	credentialUrl,
	className,
}) => {
	const content = (
		<div
			className={cx(
				'flex items-center gap-4 rounded-xl border border-secondary bg-primary p-4 transition-all',
				credentialUrl && 'hover:border-brand-200 hover:shadow-md dark:hover:border-brand-800',
				className
			)}
		>
			{icon ? (
				<img src={icon} alt={`${issuer} logo`} className='size-12 rounded-lg object-contain' />
			) : (
				<FeaturedIcon icon={Award05} size='lg' color='brand' theme='light' />
			)}
			<div className='flex-1'>
				<h4 className='font-semibold text-primary'>{name}</h4>
				<p className='text-sm text-secondary'>
					{issuer} &middot; {date}
				</p>
			</div>
		</div>
	)

	if (credentialUrl) {
		return (
			<a href={credentialUrl} target='_blank' rel='noopener noreferrer'>
				{content}
			</a>
		)
	}

	return content
}
