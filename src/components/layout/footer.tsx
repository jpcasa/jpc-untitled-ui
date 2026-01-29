import type { FC } from 'react'

import { Code01, GitBranch01, Palette, Zap } from '@untitledui/icons'
import { Link } from 'react-router'

import { Logo } from '@/components/application/logo/logo'
import { Button } from '@/components/base/buttons/button'
import footerData from '@/data/footer.json'

const techStack = [
	{ icon: Zap, label: 'React 19 + Vite 7', description: 'Modern React with fast builds' },
	{ icon: Code01, label: 'TypeScript', description: 'Type-safe development' },
	{ icon: Palette, label: 'Tailwind CSS 4', description: 'Utility-first styling' },
	{ icon: GitBranch01, label: 'CI/CD', description: 'GitHub Actions + Vitest' },
]

export const Footer: FC = () => {
	const currentYear = new Date().getFullYear()

	return (
		<footer>
			{/* Tech Stack Section */}
			<div className='border-t border-gray-200 bg-brand-950 py-16'>
				<div className='container mx-auto px-4'>
					<div className='mb-8 text-center'>
						<p className='mb-2 text-sm font-medium text-brand-400'>Built with modern technologies</p>
						<h3 className='text-xl font-semibold text-white'>This Portfolio's Tech Stack</h3>
					</div>
					<div className='mx-auto grid max-w-4xl grid-cols-2 gap-6 md:grid-cols-4'>
						{techStack.map((tech, index) => (
							<div key={index} className='text-center'>
								<div className='mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-brand-500/20'>
									<tech.icon className='size-6 text-brand-400' aria-hidden='true' />
								</div>
								<p className='font-medium text-white'>{tech.label}</p>
								<p className='text-sm text-gray-400'>{tech.description}</p>
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
							View Source Code
						</Button>
					</div>
				</div>
			</div>

			{/* CTA Section */}
			<div className='border-y border-gray-200 bg-gray-100 py-12'>
				<div className='container mx-auto px-4'>
					<div className='flex flex-col items-center gap-6 text-center md:flex-row md:text-left'>
						<div className='flex-1'>
							<p className='mb-2 text-xl font-semibold text-gray-900'>{footerData.cta.title}</p>
							<span className='text-gray-500'>{footerData.cta.description}</span>
						</div>
						<div>
							<Button href='mailto:hola@jpcasabianca.com' color='primary' size='md'>
								Contact Me
							</Button>
						</div>
					</div>
				</div>
			</div>

			{/* Main Footer */}
			<div className='py-12'>
				<div className='container mx-auto px-4'>
					<div className='flex flex-col gap-8 lg:flex-row'>
						{/* Logo and Description */}
						<div className='text-center lg:w-64 lg:shrink-0 lg:pr-16 lg:text-left'>
							<Link to='/' className='mb-4 inline-block'>
								<Logo theme='light' />
							</Link>
							<p className='mt-4 text-sm text-gray-500'>{footerData.description}</p>
						</div>

						{/* Menus */}
						<div className='grid flex-1 grid-cols-3 gap-8 lg:ml-16'>
							{footerData.menus.map((menu, index) => (
								<div key={index}>
									<p className='mb-4 text-center text-sm text-gray-500 lg:text-left'>{menu.title}</p>
									<ul className='space-y-2'>
										{menu.items.map((item, itemIndex) => (
											<li key={itemIndex} className='text-center lg:text-left'>
												{item.local ? (
													<Link
														to={item.link}
														className='text-sm text-gray-900 transition-colors hover:text-brand-600 hover:underline'
													>
														{item.name}
													</Link>
												) : (
													<a
														href={item.link}
														target='_blank'
														rel='noopener noreferrer'
														className='text-sm text-gray-900 transition-colors hover:text-brand-600 hover:underline'
													>
														{item.name}
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
			<div className='border-t border-gray-200 py-4'>
				<div className='container mx-auto px-4 text-center'>
					<p className='text-sm text-gray-500'>&copy; {currentYear} JP Casabianca. All rights reserved.</p>
				</div>
			</div>
		</footer>
	)
}
