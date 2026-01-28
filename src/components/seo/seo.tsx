import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'

import { getCanonicalUrl, siteConfig } from '@/config/seo-config'

interface SeoProps {
	title?: string
	description?: string
	keywords?: string
	image?: string
	type?: string
	article?: {
		publishedTime?: string
		modifiedTime?: string
		author?: string
		tags?: string[]
	}
	noIndex?: boolean
}

/**
 * SEO Component for managing page meta tags
 * Uses react-helmet-async for dynamic head management
 */
export function Seo({
	title,
	description = siteConfig.description,
	keywords = siteConfig.keywords,
	image = siteConfig.ogImage,
	type = 'website',
	article,
	noIndex = false,
}: SeoProps) {
	const location = useLocation()
	const canonicalUrl = getCanonicalUrl(location.pathname)
	const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.defaultTitle

	return (
		<Helmet>
			{/* Primary Meta Tags */}
			<title>{fullTitle}</title>
			<meta name='title' content={fullTitle} />
			<meta name='description' content={description} />
			<meta name='keywords' content={keywords} />
			<meta name='author' content={siteConfig.professional.name} />

			{/* Canonical URL */}
			<link rel='canonical' href={canonicalUrl} />

			{/* Open Graph / Facebook */}
			<meta property='og:type' content={type} />
			<meta property='og:url' content={canonicalUrl} />
			<meta property='og:title' content={fullTitle} />
			<meta property='og:description' content={description} />
			<meta property='og:image' content={image} />
			<meta property='og:site_name' content={siteConfig.siteName} />
			<meta property='og:locale' content='en_US' />

			{/* Twitter Card */}
			<meta name='twitter:card' content='summary_large_image' />
			<meta name='twitter:url' content={canonicalUrl} />
			<meta name='twitter:title' content={fullTitle} />
			<meta name='twitter:description' content={description} />
			<meta name='twitter:image' content={image} />
			<meta name='twitter:creator' content={siteConfig.social.twitter} />

			{/* Article metadata if provided */}
			{article?.publishedTime && <meta property='article:published_time' content={article.publishedTime} />}
			{article?.modifiedTime && <meta property='article:modified_time' content={article.modifiedTime} />}
			{article?.author && <meta property='article:author' content={article.author} />}
			{article?.tags?.map((tag) => (
				<meta key={tag} property='article:tag' content={tag} />
			))}

			{/* Robots */}
			{noIndex ? <meta name='robots' content='noindex, nofollow' /> : <meta name='robots' content='index, follow' />}
		</Helmet>
	)
}

export default Seo
