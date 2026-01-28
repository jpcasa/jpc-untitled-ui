import type { FC } from 'react'

interface ResourceCardProps {
	name: string
	icon: string
	url: string
	description: string
	horizontal?: boolean
}

export const ResourceCard: FC<ResourceCardProps> = ({ name, icon, url, description, horizontal }) => {
	return (
		<a
			href={url}
			target='_blank'
			rel='noopener noreferrer'
			className='flex cursor-pointer items-center justify-center rounded-lg border border-gray-200 bg-white px-6 py-8 text-center transition-colors hover:border-brand-500'
		>
			<div>
				<img src={icon} alt={name} className={horizontal ? 'mx-auto h-auto w-3/4' : 'mx-auto h-12 w-auto'} />
				<p className='mt-2 mb-3 font-medium text-gray-900'>{name}</p>
				<span className='text-sm text-gray-500'>{description}</span>
			</div>
		</a>
	)
}
