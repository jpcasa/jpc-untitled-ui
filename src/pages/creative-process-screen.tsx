import type { FC } from 'react'

import { Heart, LayersThree01, Lightbulb02, RefreshCw01, Target01, Users01 } from '@untitledui/icons'

import { SectionHeader } from '@/components/about'
import { Button } from '@/components/base/buttons/button'
import { Footer } from '@/components/layout/footer'
import { PageHeader } from '@/components/layout/page-header'
import { BreadcrumbJsonLd, Seo } from '@/components/seo'
import { pagesSeo } from '@/config/seo-config'
import appsData from '@/data/apps.json'
import processData from '@/data/creative-process.json'

const ICONS: Record<string, FC<{ className?: string }>> = {
	heart: Heart,
	target: Target01,
	lightbulb: Lightbulb02,
	layers: LayersThree01,
	users: Users01,
	refresh: RefreshCw01,
}

export const CreativeProcessScreen: FC = () => {
	return (
		<>
			<Seo
				title={pagesSeo.creativeProcess.title}
				description={pagesSeo.creativeProcess.description}
				keywords={pagesSeo.creativeProcess.keywords}
			/>
			<BreadcrumbJsonLd
				items={[
					{ name: 'Home', url: '/' },
					{ name: 'Creative Process', url: '/creative-process' },
				]}
			/>

			<div className='bg-gray-100'>
				<PageHeader align='center'>
					<div className='mx-auto max-w-2xl'>
						<p className='mb-3 font-medium text-brand-400'>{processData.header.subtitle}</p>
						<h1 className='mb-6 text-4xl font-semibold text-white md:text-5xl'>{processData.header.title}</h1>
						<p className='text-gray-300'>{processData.header.description}</p>
					</div>
				</PageHeader>

				{/* Main Image Section */}
				<section className='container mx-auto px-4 py-12'>
					<div className='mx-auto max-w-4xl'>
						<img
							src='/img/process-main.png'
							alt='Creative Process - JP Casabianca'
							className='w-full rounded-lg border border-gray-200 shadow-lg'
						/>
					</div>
				</section>

				{/* Design Section */}
				<section className='bg-cover bg-top pb-24' style={{ backgroundImage: "url('/img/design-bg.png')" }}>
					<div className='container mx-auto px-4'>
						<SectionHeader
							title={processData.designSection.title}
							subtitle={processData.designSection.subtitle}
							description={processData.designSection.description}
							align='center'
						/>

						{/* Design Process Steps */}
						<div className='mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
							{processData.designSteps.map((step, index) => {
								const IconComponent = ICONS[step.icon]
								return (
									<div key={index} className='text-center sm:text-left'>
										<div className='mb-4 inline-flex size-12 items-center justify-center rounded-full bg-brand-100 text-brand-700'>
											{IconComponent && <IconComponent className='size-6' />}
										</div>
										<h3 className='mb-2 text-lg font-semibold text-gray-900'>{step.title}</h3>
										<p className='text-sm text-gray-500'>{step.description}</p>
									</div>
								)
							})}
						</div>

						{/* CTA */}
						<div className='mt-16 text-center'>
							<Button href='/about' color='primary' size='lg'>
								Learn More About Me
							</Button>
						</div>
					</div>
				</section>

				{/* Code Section */}
				<section className='bg-gray-100 py-24'>
					<div className='container mx-auto px-4'>
						<div className='mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-2'>
							<div>
								<p className='mb-2 text-sm font-semibold text-brand-600'>{processData.codeSection.subtitle}</p>
								<h2 className='mb-4 text-2xl font-semibold text-gray-900 md:text-3xl'>
									{processData.codeSection.title}
								</h2>
								<p className='text-gray-600'>{processData.codeSection.description}</p>
							</div>
							<div>
								<img
									src='/img/code-process.png'
									alt='Code Process - JP Casabianca'
									className='w-full rounded-lg shadow-lg'
								/>
							</div>
						</div>
					</div>
				</section>

				{/* Usual Apps Section */}
				<section className='bg-white py-16'>
					<div className='container mx-auto px-4'>
						<SectionHeader
							title={processData.appsSection.title}
							subtitle={processData.appsSection.subtitle}
							description={processData.appsSection.description}
						/>

						<div className='mx-auto grid max-w-4xl grid-cols-6 gap-4 md:grid-cols-9'>
							{appsData.apps.map((app, index) => (
								<div key={index} className='flex items-center justify-center'>
									<img
										src={app.icon}
										alt={app.name}
										className='size-12 rounded-xl shadow-sm transition-transform hover:scale-110 md:size-16'
									/>
								</div>
							))}
						</div>

						<div className='mt-12 text-center'>
							<Button href='/work' color='secondary' size='lg'>
								See My Work
							</Button>
						</div>
					</div>
				</section>
			</div>

			<Footer />
		</>
	)
}
