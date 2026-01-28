import type { FC } from 'react'

import { BlogPostCard } from '@/components/blog'
import { Footer } from '@/components/layout/footer'
import { BreadcrumbJsonLd, Seo } from '@/components/seo'
import { pagesSeo } from '@/config/seo-config'
import blogData from '@/data/blog.json'

export const BlogScreen: FC = () => {
	const featuredPost = blogData.posts.find((post) => post.featured)
	const regularPosts = blogData.posts.filter((post) => !post.featured)

	return (
		<>
			<Seo title={pagesSeo.blog.title} description={pagesSeo.blog.description} keywords={pagesSeo.blog.keywords} />
			<BreadcrumbJsonLd
				items={[
					{ name: 'Home', url: '/' },
					{ name: 'Blog', url: '/blog' },
				]}
			/>

			<div className='bg-gray-50'>
				{/* Header Section */}
				<section className='bg-gray-900 py-16 pt-32'>
					<div className='container mx-auto px-4 text-center'>
						<div className='mx-auto max-w-2xl'>
							<p className='mb-3 font-medium text-brand-400'>{blogData.header.subtitle}</p>
							<h1 className='mb-6 text-4xl font-semibold text-white md:text-5xl'>{blogData.header.title}</h1>
							<p className='text-gray-300'>{blogData.header.description}</p>
						</div>
					</div>
				</section>

				{/* Blog Posts */}
				<main className='container mx-auto px-4 py-12 md:py-16'>
					{/* Featured Post */}
					{featuredPost && (
						<div className='mb-12 md:mb-16'>
							<BlogPostCard
								title={featuredPost.title}
								summary={featuredPost.summary}
								thumbnailUrl={featuredPost.thumbnailUrl}
								href={`/blog/${featuredPost.id}`}
								author={featuredPost.author}
								publishedAt={featuredPost.publishedAt}
								readingTime={featuredPost.readingTime}
								tags={
									featuredPost.tags as {
										name: string
										color:
											| 'brand'
											| 'gray'
											| 'error'
											| 'warning'
											| 'success'
											| 'gray-blue'
											| 'blue-light'
											| 'blue'
											| 'indigo'
											| 'purple'
											| 'pink'
											| 'orange'
									}[]
								}
								featured
								isInternal
							/>
						</div>
					)}

					{/* Regular Posts Grid */}
					<ul className='grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3'>
						{regularPosts.map((post) => (
							<li key={post.id}>
								<BlogPostCard
									title={post.title}
									summary={post.summary}
									thumbnailUrl={post.thumbnailUrl}
									href={`/blog/${post.id}`}
									author={post.author}
									publishedAt={post.publishedAt}
									readingTime={post.readingTime}
									tags={
										post.tags as {
											name: string
											color:
												| 'brand'
												| 'gray'
												| 'error'
												| 'warning'
												| 'success'
												| 'gray-blue'
												| 'blue-light'
												| 'blue'
												| 'indigo'
												| 'purple'
												| 'pink'
												| 'orange'
										}[]
									}
									isInternal
								/>
							</li>
						))}
					</ul>

					{/* View More Link */}
					<div className='mt-12 text-center'>
						<a
							href='https://medium.com/@jpc_774'
							target='_blank'
							rel='noopener noreferrer'
							className='inline-flex items-center gap-2 font-semibold text-brand-600 transition-colors hover:text-brand-700'
						>
							View all posts on Medium
							<span aria-hidden='true'>&rarr;</span>
						</a>
					</div>
				</main>
			</div>

			<Footer />
		</>
	)
}
