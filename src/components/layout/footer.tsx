import type { FC } from 'react'

import { Link } from 'react-router'

import { Logo } from '@/components/application/logo/logo'
import { Button } from '@/components/base/buttons/button'
import footerData from '@/data/footer.json'

export const Footer: FC = () => {
	const currentYear = new Date().getFullYear()

	return (
		<footer>
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
