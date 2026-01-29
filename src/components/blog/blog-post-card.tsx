import type { FC } from 'react'

import { ArrowUpRight } from '@untitledui/icons'
import { Link } from 'react-router'

import { Badge, type BadgeColor } from '@/components/base/badges/badges'

interface BlogPostTag {
	name: string
	color: BadgeColor<'pill-color'>
}

interface BlogPostCardProps {
	title: string
	summary: string
	thumbnailUrl: string
	href: string
	author: string
	publishedAt: string
	readingTime: string
	tags: BlogPostTag[]
	featured?: boolean
	isInternal?: boolean
}

export const BlogPostCard: FC<BlogPostCardProps> = ({
	title,
	summary,
	thumbnailUrl,
	href,
	author,
	publishedAt,
	readingTime,
	tags,
	featured,
	isInternal,
}) => {
	const LinkWrapper = isInternal
		? ({ children, className }: { children: React.ReactNode; className?: string }) => (
				<Link to={href} className={className}>
					{children}
				</Link>
			)
		: ({ children, className }: { children: React.ReactNode; className?: string }) => (
				<a href={href} target='_blank' rel='noopener noreferrer' className={className}>
					{children}
				</a>
			)

	return (
		<article className='flex flex-col gap-4'>
			<LinkWrapper className='overflow-hidden rounded-2xl'>
				<img
					src={thumbnailUrl}
					alt={title}
					className={`w-full object-cover transition-transform duration-300 hover:scale-105 ${featured ? 'aspect-[2/1]' : 'aspect-[1.5]'}`}
				/>
			</LinkWrapper>

			<div className='flex flex-col gap-6'>
				<div className='flex flex-col items-start gap-2'>
					<p className='text-sm font-semibold text-brand-600'>
						{author} &bull; {publishedAt}
					</p>
					<div className='flex w-full flex-col gap-1'>
						<LinkWrapper
							className={`flex justify-between gap-x-4 font-semibold text-primary transition-colors hover:text-brand-600 ${featured ? 'text-2xl' : 'text-lg'}`}
						>
							{title}
							<ArrowUpRight className='mt-0.5 size-6 shrink-0 text-secondary' aria-hidden='true' />
						</LinkWrapper>
						<p className='line-clamp-2 text-secondary'>{summary}</p>
					</div>
				</div>

				<div className='flex flex-wrap gap-2'>
					{tags.map((tag) => (
						<Badge key={tag.name} color={tag.color} size='md'>
							{tag.name}
						</Badge>
					))}
				</div>

				<p className='text-sm text-secondary'>{readingTime}</p>
			</div>
		</article>
	)
}
