import type { FC } from 'react'

import { Code01, GitBranch01, Palette, Zap } from '@untitledui/icons'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import { Logo } from '@/components/application/logo/logo'
import { Button } from '@/components/base/buttons/button'
import footerData from '@/data/footer.json'
import { useTheme } from '@/providers/theme-provider'

const techStack = [
	{ icon: Zap, label: 'React 19 + Vite 7', description: 'Modern React with fast builds' },
	{ icon: Code01, label: 'TypeScript', description: 'Type-safe development' },
	{ icon: Palette, label: 'Tailwind CSS 4', description: 'Utility-first styling' },
	{ icon: GitBranch01, label: 'CI/CD', description: 'GitHub Actions + Vitest' },
]

// Map menu titles to translation keys
const menuTitleKeys: Record<string, string> = {
	'Main Menu': 'footer.menus.mainMenu',
	Social: 'footer.menus.social',
	More: 'footer.menus.more',
}

// Map menu item names to translation keys (only for translatable items)
const menuItemKeys: Record<string, string> = {
	'About Me': 'footer.links.aboutMe',
	Work: 'footer.links.work',
	Process: 'footer.links.process',
	Resources: 'footer.links.resources',
	Gallery: 'footer.links.gallery',
	Blog: 'footer.links.blog',
	'Download CV': 'footer.links.downloadCv',
	'View Source Code': 'footer.links.viewSourceCode',
	'Email Me': 'footer.links.emailMe',
}

export const Footer: FC = () => {
	const { t } = useTranslation()
	const currentYear = new Date().getFullYear()
	const { theme } = useTheme()

	return (
		<footer>
			{/* Tech Stack Section */}
			<div className='border-t border-secondary bg-brand-950 py-16'>
				<div className='container mx-auto px-4'>
					<div className='mb-8 text-center'>
						<p className='mb-2 text-sm font-medium text-brand-400'>{t('footer.techStack.subtitle')}</p>
						<h3 className='text-xl font-semibold text-white'>{t('footer.techStack.title')}</h3>
					</div>
					<div className='mx-auto grid max-w-4xl grid-cols-2 gap-6 md:grid-cols-4'>
						{techStack.map((tech, index) => (
							<div key={index} className='text-center'>
								<div className='mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-brand-500/20'>
									<tech.icon className='size-6 text-brand-300' aria-hidden='true' />
								</div>
								<p className='font-medium text-white'>{tech.label}</p>
								<p className='text-sm text-brand-300'>{tech.description}</p>
							</div>
						))}
					</div>
					<div className='mt-8 text-center'>
						<Button
							href='https://github.com/jpcasa/jpc-untitled-ui'
							color='secondary'
							size='sm'
							className='bg-white/10 text-white ring-white/20 hover:bg-white/20'
						>
							{t('footer.techStack.viewSource')}
						</Button>
					</div>
				</div>
			</div>

			{/* CTA Section */}
			<div className='border-y border-secondary bg-secondary py-12'>
				<div className='container mx-auto px-4'>
					<div className='flex flex-col items-center gap-6 text-center md:flex-row md:text-left'>
						<div className='flex-1'>
							<p className='mb-2 text-xl font-semibold text-primary'>{t('footer.cta.title')}</p>
							<span className='text-secondary'>{t('footer.cta.description')}</span>
						</div>
						<div>
							<Button href='mailto:hola@jpcasabianca.com' color='primary' size='md'>
								{t('footer.cta.contact')}
							</Button>
						</div>
					</div>
				</div>
			</div>

			{/* Main Footer */}
			<div className='bg-primary py-12'>
				<div className='container mx-auto px-4'>
					<div className='flex flex-col gap-8 lg:flex-row'>
						{/* Logo and Description */}
						<div className='text-center lg:w-64 lg:shrink-0 lg:pr-16 lg:text-left'>
							<Link to='/' className='mb-4 inline-block'>
								<Logo theme={theme === 'dark' ? 'dark' : 'light'} />
							</Link>
							<p className='mt-4 text-sm text-secondary'>{t('footer.description')}</p>
						</div>

						{/* Menus */}
						<div className='grid flex-1 grid-cols-3 gap-8 lg:ml-16'>
							{footerData.menus.map((menu, index) => (
								<div key={index}>
									<p className='mb-4 text-center text-sm text-secondary lg:text-left'>
										{menuTitleKeys[menu.title] ? t(menuTitleKeys[menu.title]) : menu.title}
									</p>
									<ul className='space-y-2'>
										{menu.items.map((item, itemIndex) => (
											<li key={itemIndex} className='text-center lg:text-left'>
												{item.local ? (
													<Link
														to={item.link}
														className='text-sm text-primary transition-colors hover:text-brand-600 hover:underline'
													>
														{menuItemKeys[item.name] ? t(menuItemKeys[item.name]) : item.name}
													</Link>
												) : (
													<a
														href={item.link}
														target='_blank'
														rel='noopener noreferrer'
														className='text-sm text-primary transition-colors hover:text-brand-600 hover:underline'
													>
														{menuItemKeys[item.name] ? t(menuItemKeys[item.name]) : item.name}
													</a>
												)}
											</li>
										))}
									</ul>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* Copyright */}
			<div className='border-t border-secondary bg-primary py-4'>
				<div className='container mx-auto px-4 text-center'>
					<p className='text-sm text-secondary'>
						&copy; {currentYear} JP Casabianca. {t('footer.copyright')}
					</p>
				</div>
			</div>
		</footer>
	)
}
