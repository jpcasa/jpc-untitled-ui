import type { FC } from 'react'

import { ArrowLeft } from '@untitledui/icons'
import { Link, useParams } from 'react-router'

import { Badge, type BadgeColor } from '@/components/base/badges/badges'
import { Button } from '@/components/base/buttons/button'
import { BlogPostCard } from '@/components/blog'
import { Footer } from '@/components/layout/footer'
import { BlogPostJsonLd, BreadcrumbJsonLd, Seo } from '@/components/seo'
import { getCanonicalUrl } from '@/config/seo-config'
import blogData from '@/data/blog.json'

type ContentBlock =
	| { type: 'heading'; text: string }
	| { type: 'paragraph'; text: string }
	| { type: 'quote'; text: string; author: string }
	| { type: 'image'; url: string; caption: string }
	| { type: 'conclusion'; title: string; text: string }

interface BlogPost {
	id: string
	title: string
	summary: string
	thumbnailUrl: string
	heroImageUrl: string
	href: string
	category: string
	author: string
	publishedAt: string
	readingTime: string
	tags: { name: string; color: string }[]
	featured?: boolean
	content: ContentBlock[]
}

const ContentRenderer: FC<{ content: ContentBlock[] }> = ({ content }) => {
	return (
		<div className='mx-auto prose prose-lg max-w-none prose-gray'>
			{content.map((block, index) => {
				switch (block.type) {
					case 'heading':
						return (
							<h2 key={index} className='mt-8 mb-4 text-2xl font-semibold text-gray-900'>
								{block.text}
							</h2>
						)
					case 'paragraph':
						return (
							<p key={index} className='mb-4 text-lg leading-relaxed text-gray-600'>
								{block.text}
							</p>
						)
					case 'quote':
						return (
							<figure key={index} className='my-8 border-l-4 border-brand-500 pl-6'>
								<blockquote className='text-xl text-gray-700 italic'>"{block.text}"</blockquote>
								<figcaption className='mt-4 flex items-center gap-3'>
									<div>
										<p className='font-semibold text-gray-900'>— {block.author}</p>
									</div>
								</figcaption>
							</figure>
						)
					case 'image':
						return (
							<figure key={index} className='my-8'>
								<img src={block.url} alt={block.caption} className='w-full rounded-lg object-cover' />
								<figcaption className='mt-2 text-center text-sm text-gray-500'>{block.caption}</figcaption>
							</figure>
						)
					case 'conclusion':
						return (
							<div key={index} className='my-12 rounded-2xl bg-gray-100 p-6 md:p-8'>
								<h2 className='mb-4 text-xl font-semibold text-gray-900'>{block.title}</h2>
								<p className='text-lg text-gray-600'>{block.text}</p>
							</div>
						)
					default:
						return null
				}
			})}
		</div>
	)
}

export const BlogPostScreen: FC = () => {
	const { id } = useParams<{ id: string }>()
	const post = blogData.posts.find((p) => p.id === id) as BlogPost | undefined
	const relatedPosts = blogData.posts.filter((p) => p.id !== id).slice(0, 3)

	if (!post) {
		return (
			<div className='flex min-h-screen items-center justify-center'>
				<div className='text-center'>
					<h1 className='mb-4 text-2xl font-semibold text-gray-900'>Post not found</h1>
					<Link to='/blog' className='text-brand-600 hover:text-brand-700'>
						Back to Blog
					</Link>
				</div>
			</div>
		)
	}

	return (
		<>
			<Seo
				title={post.title}
				description={post.summary}
				image={post.heroImageUrl}
				type='article'
				article={{
					publishedTime: post.publishedAt,
					author: post.author,
					tags: post.tags.map((t) => t.name),
				}}
			/>
			<BlogPostJsonLd
				title={post.title}
				description={post.summary}
				image={post.heroImageUrl}
				url={getCanonicalUrl(`/blog/${post.id}`)}
				publishedTime={post.publishedAt}
				tags={post.tags.map((t) => t.name)}
			/>
			<BreadcrumbJsonLd
				items={[
					{ name: 'Home', url: '/' },
					{ name: 'Blog', url: '/blog' },
					{ name: post.title, url: `/blog/${post.id}` },
				]}
			/>

			<div className='bg-white'>
				{/* Header */}
				<div className='bg-white pt-24'>
					<div className='container mx-auto px-4 py-16 md:px-8'>
						<div className='mx-auto max-w-3xl'>
							<Link
								to='/blog'
								className='mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900'
							>
								<ArrowLeft className='size-4' />
								Back to Blog
							</Link>
							<p className='text-sm font-semibold text-brand-600 md:text-base'>Published {post.publishedAt}</p>
							<h1 className='mt-3 text-3xl font-semibold text-gray-900 md:text-4xl lg:text-5xl'>{post.title}</h1>
							<p className='mt-4 text-lg text-gray-600 md:mt-6 md:text-xl'>{post.summary}</p>
						</div>
					</div>
				</div>

				{/* Hero Image */}
				<div className='container mx-auto px-4 md:px-8'>
					<div className='mx-auto max-w-4xl'>
						<img src={post.heroImageUrl} alt={post.title} className='w-full rounded-2xl object-cover' />
					</div>
				</div>

				{/* Content */}
				<div className='container mx-auto px-4 py-12 md:px-8 md:py-16'>
					<div className='mx-auto max-w-3xl'>
						<ContentRenderer content={post.content} />

						{/* Author & Tags */}
						<div className='mt-12 flex flex-col items-start justify-between gap-y-6 border-t border-gray-200 pt-6 md:flex-row'>
							<div className='flex items-center gap-3 md:gap-4'>
								<img
									src={blogData.author.avatarUrl}
									alt={blogData.author.name}
									className='size-12 rounded-full object-cover md:size-14'
								/>
								<div>
									<p className='font-semibold text-gray-900 md:text-lg'>{blogData.author.name}</p>
									<p className='text-gray-500'>{blogData.author.role}</p>
								</div>
							</div>

							<div className='flex flex-wrap gap-2'>
								{post.tags.map((tag) => (
									<Badge key={tag.name} color={tag.color as BadgeColor<'pill-color'>} size='md'>
										{tag.name}
									</Badge>
								))}
							</div>
						</div>
					</div>
				</div>

				{/* Related Posts */}
				<section className='bg-gray-50 py-16 md:py-24'>
					<div className='container mx-auto px-4 md:px-8'>
						<div className='flex flex-col items-start justify-between lg:flex-row'>
							<div className='max-w-3xl'>
								<p className='text-sm font-semibold text-brand-600 md:text-base'>Our blog</p>
								<h2 className='mt-3 text-2xl font-semibold text-gray-900 md:text-3xl'>Latest blog posts</h2>
								<p className='mt-4 text-lg text-gray-600'>
									More insights on design, development, and the creative process.
								</p>
							</div>

							<div className='mt-6 lg:mt-0'>
								<Button href='/blog' color='secondary' size='lg'>
									View all posts
								</Button>
							</div>
						</div>

						<ul className='mt-12 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3'>
							{relatedPosts.map((relatedPost) => (
								<li key={relatedPost.id}>
									<BlogPostCard
										title={relatedPost.title}
										summary={relatedPost.summary}
										thumbnailUrl={relatedPost.thumbnailUrl}
										href={`/blog/${relatedPost.id}`}
										author={relatedPost.author}
										publishedAt={relatedPost.publishedAt}
										readingTime={relatedPost.readingTime}
										tags={relatedPost.tags as { name: string; color: BadgeColor<'pill-color'> }[]}
										isInternal
									/>
								</li>
							))}
						</ul>
					</div>
				</section>
			</div>

			<Footer />
		</>
	)
}
