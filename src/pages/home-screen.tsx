import type { FC } from 'react'

import { Button } from '@/components/base/buttons/button'
import { PersonJsonLd, Seo, WebsiteJsonLd } from '@/components/seo'
import { pagesSeo } from '@/config/seo-config'
import profileData from '@/data/profile.json'
import { useTypewriter } from '@/hooks/use-typewriter'

export const HomeScreen: FC = () => {
	const typedText = useTypewriter({
		phrases: profileData.typingPhrases,
		typeSpeed: 70,
	})

	return (
		<>
			<Seo title={pagesSeo.home.title} description={pagesSeo.home.description} keywords={pagesSeo.home.keywords} />
			<WebsiteJsonLd />
			<PersonJsonLd />

			<div className='grid max-w-full gap-8 md:fixed md:inset-0 md:grid-cols-2 md:px-0'>
				{/* Info Section */}
				<div className='mb-8 w-full pt-32 text-center lg:mx-auto lg:flex lg:max-w-md lg:items-center lg:pt-0 lg:text-left'>
					<div>
						<h1 className="font-['DM_Serif_Display',serif] text-4xl text-brand-800">
							Hey, I'm JP. An experienced UI/UX Designer and Engineer.{' '}
							<span className='text-brand-600 underline'>{typedText}</span>
						</h1>

						<p className='my-8 text-slate-500'>
							I can build full prototypes in Figma/Framer designed from scratch. Also, I can code them in Vue3/React +
							Node/Python, so I really bring value to product teams. I love new challenges, gravel cycling and Golf!
						</p>

						<Button href='/about' size='md' color='primary'>
							Learn More About Me
						</Button>
					</div>
				</div>

				{/* Image Section */}
				<div className='flex items-center justify-center bg-gray-200 py-12'>
					<img
						src='/img/home.webp'
						alt='JP Casabianca - UI/UX Designer and Fullstack Engineer'
						className='w-5/6 xl:w-3/4'
					/>
				</div>
			</div>
		</>
	)
}
