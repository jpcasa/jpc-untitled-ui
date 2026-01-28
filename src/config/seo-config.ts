/**
 * Centralized SEO Configuration
 * All site-wide SEO settings and page-specific overrides
 */

export const siteConfig = {
	name: 'JP Casabianca',
	siteName: 'JP Casabianca Portfolio',
	titleTemplate: '%s | JP Casabianca',
	defaultTitle: 'JP Casabianca - UI/UX Designer & Fullstack Engineer',
	baseUrl: 'https://www.jpcasabianca.com',

	// Default meta description
	description:
		'UI/UX Designer & Fullstack Engineer available for remote work (EST timezone). Expertise in React, Vue, Python, Figma, and building exceptional digital products.',

	// Recruiter-focused keywords
	keywords: [
		'JP Casabianca',
		'UI/UX Designer',
		'Fullstack Engineer',
		'React Developer',
		'Vue Developer',
		'Remote Developer EST',
		'Frontend Engineer',
		'Product Designer',
		'Figma Expert',
		'Python Developer',
		'Remote Dev Colombia',
		'Senior Designer',
		'Full Stack Developer',
	].join(', '),

	// Default Open Graph image
	ogImage: 'https://res.cloudinary.com/dpifbvbai/image/upload/v1664483318/user.png',

	// Social profiles
	social: {
		twitter: '@jpcasabianca',
		linkedin: 'https://linkedin.com/in/jpcasabianca',
		github: 'https://github.com/jpcasabianca',
		behance: 'https://www.behance.net/jpcasabianca',
		dribbble: 'https://dribbble.com/jpcasabianca',
	},

	// Contact email
	email: 'hola@jpcasabianca.com',

	// Location for structured data
	location: 'Remote (EST timezone)',

	// Professional info for structured data
	professional: {
		name: 'JP Casabianca',
		jobTitle: 'UI/UX Designer & Fullstack Engineer',
		knowsAbout: [
			'React',
			'Vue',
			'Python',
			'UI/UX Design',
			'Fullstack Development',
			'Figma',
			'Frontend Engineering',
			'Product Design',
			'JavaScript',
			'TypeScript',
			'Node.js',
			'Vite',
		],
	},
}

// Page-specific SEO configurations
export const pagesSeo = {
	home: {
		title: '', // Uses default title
		description:
			"UI/UX Designer & Fullstack Engineer available for remote work (EST timezone). I build exceptional digital products using React, Vue, Python, and Figma. Let's create something amazing together.",
		keywords: 'UI/UX Designer, Fullstack Engineer, React Developer, Vue Developer, Remote Developer EST, Figma Expert',
	},

	about: {
		title: 'About Me',
		description:
			"Learn about JP Casabianca - an experienced UI/UX Designer and Fullstack Engineer. Discover my skills, experience, and the companies I've worked with. Available for remote opportunities.",
		keywords:
			'JP Casabianca about, designer background, developer experience, remote availability, professional skills',
	},

	work: {
		title: 'Portfolio',
		description:
			"Explore JP Casabianca's portfolio of UI/UX design and development projects. Case studies showcasing React, Vue, and Figma work for startups and enterprises.",
		keywords: 'design portfolio, development projects, case studies, UI/UX work, React projects, Vue projects',
	},

	creativeProcess: {
		title: 'Creative Process',
		description:
			'Discover my design and development methodology. Human-centered design thinking, prototyping in Figma, and modern frontend development with Vue and React.',
		keywords:
			'design process, development workflow, human-centered design, design thinking, prototyping, Figma workflow',
	},

	resources: {
		title: 'Resources',
		description:
			'Curated collection of design and development tools, apps, and resources I use daily. Recommendations for designers, developers, and digital creators.',
		keywords: 'design tools, development resources, productivity apps, designer resources, developer tools',
	},

	blog: {
		title: 'Blog',
		description:
			'Insights and articles on UI/UX design, frontend development, and building digital products. Tips, tutorials, and thoughts from JP Casabianca.',
		keywords: 'design blog, development articles, UI/UX insights, frontend tips, tech blog',
	},

	notFound: {
		title: 'Page Not Found',
		description: 'The page you are looking for could not be found.',
		keywords: '',
	},
}

// Generate full page title
export const getPageTitle = (pageTitle?: string): string => {
	if (!pageTitle) return siteConfig.defaultTitle
	return `${pageTitle} | ${siteConfig.name}`
}

// Generate canonical URL
export const getCanonicalUrl = (path = ''): string => {
	const cleanPath = path.startsWith('/') ? path : `/${path}`
	return `${siteConfig.baseUrl}${cleanPath}`
}

export type PageSeoKey = keyof typeof pagesSeo
