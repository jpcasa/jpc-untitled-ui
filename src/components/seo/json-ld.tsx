import { Helmet } from 'react-helmet-async'

import { getCanonicalUrl, siteConfig } from '@/config/seo-config'

/**
 * Website JSON-LD structured data
 */
export function WebsiteJsonLd() {
	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: siteConfig.siteName,
		alternateName: siteConfig.name,
		url: siteConfig.baseUrl,
		description: siteConfig.description,
		author: {
			'@type': 'Person',
			name: siteConfig.professional.name,
		},
	}

	return (
		<Helmet>
			<script type='application/ld+json'>{JSON.stringify(jsonLd)}</script>
		</Helmet>
	)
}

/**
 * Person JSON-LD structured data for professional profile
 */
export function PersonJsonLd() {
	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: siteConfig.professional.name,
		url: siteConfig.baseUrl,
		image: siteConfig.ogImage,
		jobTitle: siteConfig.professional.jobTitle,
		description: siteConfig.description,
		email: `mailto:${siteConfig.email}`,
		knowsAbout: siteConfig.professional.knowsAbout,
		workLocation: {
			'@type': 'Place',
			name: siteConfig.location,
		},
		sameAs: [
			siteConfig.social.linkedin,
			siteConfig.social.github,
			siteConfig.social.behance,
			siteConfig.social.dribbble,
		],
	}

	return (
		<Helmet>
			<script type='application/ld+json'>{JSON.stringify(jsonLd)}</script>
		</Helmet>
	)
}

interface PortfolioJsonLdProps {
	name: string
	description?: string
	image?: string
	url?: string
	dateCreated?: string
	keywords?: string[]
}

/**
 * Portfolio/Creative Work JSON-LD structured data
 */
export function PortfolioJsonLd({ name, description, image, url, dateCreated, keywords }: PortfolioJsonLdProps) {
	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'CreativeWork',
		name,
		description: description || `${name} - A UI/UX design and development project by JP Casabianca`,
		image: image || siteConfig.ogImage,
		url: url || getCanonicalUrl('/work'),
		creator: {
			'@type': 'Person',
			name: siteConfig.professional.name,
			url: siteConfig.baseUrl,
		},
		...(dateCreated && { dateCreated }),
		...(keywords?.length && { keywords: keywords.join(', ') }),
	}

	return (
		<Helmet>
			<script type='application/ld+json'>{JSON.stringify(jsonLd)}</script>
		</Helmet>
	)
}

interface BlogPostJsonLdProps {
	title: string
	description: string
	image?: string
	url: string
	publishedTime: string
	modifiedTime?: string
	author?: string
	tags?: string[]
}

/**
 * Blog Post JSON-LD structured data
 */
export function BlogPostJsonLd({
	title,
	description,
	image,
	url,
	publishedTime,
	modifiedTime,
	author,
	tags,
}: BlogPostJsonLdProps) {
	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: title,
		description,
		image: image || siteConfig.ogImage,
		url,
		datePublished: publishedTime,
		...(modifiedTime && { dateModified: modifiedTime }),
		author: {
			'@type': 'Person',
			name: author || siteConfig.professional.name,
			url: siteConfig.baseUrl,
		},
		publisher: {
			'@type': 'Person',
			name: siteConfig.professional.name,
			url: siteConfig.baseUrl,
		},
		...(tags?.length && { keywords: tags.join(', ') }),
	}

	return (
		<Helmet>
			<script type='application/ld+json'>{JSON.stringify(jsonLd)}</script>
		</Helmet>
	)
}

interface BreadcrumbItem {
	name: string
	url: string
}

interface BreadcrumbJsonLdProps {
	items: BreadcrumbItem[]
}

/**
 * Breadcrumb JSON-LD structured data
 */
export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: item.name,
			item: item.url.startsWith('http') ? item.url : getCanonicalUrl(item.url),
		})),
	}

	return (
		<Helmet>
			<script type='application/ld+json'>{JSON.stringify(jsonLd)}</script>
		</Helmet>
	)
}
