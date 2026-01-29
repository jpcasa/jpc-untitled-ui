import { type FC, useState } from 'react'

import { ArrowLeft, ArrowRight, Download01, Mail01 } from '@untitledui/icons'
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, XAxis, YAxis } from 'recharts'

import { ExperienceCard, SectionHeader, TestimonialCard } from '@/components/about'
import { Tabs } from '@/components/application/tabs/tabs'
import { Button } from '@/components/base/buttons/button'
import { Footer } from '@/components/layout/footer'
import { BreadcrumbJsonLd, PersonJsonLd, Seo } from '@/components/seo'
import { pagesSeo } from '@/config/seo-config'
import appsData from '@/data/apps.json'
import experienceData from '@/data/experience.json'
import skillsData from '@/data/skills.json'
import testimonialsData from '@/data/testimonials.json'

const CHART_COLORS: Record<string, string> = {
	error: '#f04438',
	success: '#17b26a',
	warning: '#f79009',
	brand: '#7c3aed',
	orange: '#fb6514',
	blue: '#2e90fa',
}

export const AboutScreen: FC = () => {
	const [activeTestimonial, setActiveTestimonial] = useState(0)

	const handlePrevTestimonial = () => {
		setActiveTestimonial((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1))
	}

	const handleNextTestimonial = () => {
		setActiveTestimonial((prev) => (prev === testimonialsData.length - 1 ? 0 : prev + 1))
	}

	return (
		<>
			<Seo title={pagesSeo.about.title} description={pagesSeo.about.description} keywords={pagesSeo.about.keywords} />
			<PersonJsonLd />
			<BreadcrumbJsonLd
				items={[
					{ name: 'Home', url: '/' },
					{ name: 'About', url: '/about' },
				]}
			/>

			<div className='bg-gray-100'>
				{/* Hero Section */}
				<section className='bg-cover pt-16 pb-8' style={{ backgroundImage: "url('/img/about-bg.png')" }}>
					<div className='container mx-auto px-4'>
						<div className='gap-8 pt-12 lg:grid lg:grid-cols-2'>
							<div className='text-center lg:pl-8 lg:text-left'>
								<h1 className="mt-4 font-['DM_Serif_Display',serif] text-3xl text-white md:text-4xl xl:mt-12">
									Hey, I'm JP. An experienced UI/UX Designer and Fullstack Engineer.{' '}
								</h1>

								<p className='mt-6 mb-8 text-gray-300'>
									I can build full prototypes in Figma/Framer designed from scratch. Also, I can code them in Vue3/React
									+ Node/Python, so I really bring value to product teams. I love new challenges, Golf and Gravel
									Cycling!
								</p>

								<Button color='primary' size='md' iconLeading={Mail01}>
									Let's Connect
								</Button>
							</div>

							<div className='mt-12 flex items-end justify-center lg:mt-0'>
								<img src='/img/about-2.webp' alt='JP Casabianca' className='max-w-md rounded-lg md:max-w-lg' />
							</div>
						</div>
					</div>
				</section>

				{/* Skills Section */}
				<section className='container mx-auto px-4 pb-16'>
					<SectionHeader
						title='My Skills'
						description='You can find out what tools, apps, and services I use in my day-to-day work and life. Find design, frontend, backend, and marketing skills.'
						align='center'
					/>

					<Tabs defaultSelectedKey='Design'>
						<div className='flex justify-center pb-8'>
							<Tabs.List
								type='button-gray'
								size='md'
								items={skillsData.categories.map((cat) => ({ id: cat.name, label: cat.name }))}
							/>
						</div>

						{skillsData.categories.map((category) => (
							<Tabs.Panel key={category.name} id={category.name}>
								<div className='mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-sm'>
									<ResponsiveContainer width='100%' height={category.items.length * 50 + 40}>
										<BarChart data={category.items} layout='vertical' margin={{ left: 20, right: 30, bottom: 20 }}>
											<CartesianGrid strokeDasharray='3 3' horizontal={false} stroke='#e5e7eb' />
											<XAxis
												type='number'
												domain={[0, 100]}
												ticks={[0, 25, 50, 75, 100]}
												tick={{ fill: '#6b7280', fontSize: 12 }}
												axisLine={{ stroke: '#e5e7eb' }}
												tickLine={{ stroke: '#e5e7eb' }}
											/>
											<YAxis
												type='category'
												dataKey='name'
												width={100}
												tick={{ fill: '#374151', fontSize: 14 }}
												axisLine={false}
												tickLine={false}
											/>
											<Bar dataKey='level' radius={[0, 6, 6, 0]} barSize={24}>
												{category.items.map((_, index) => (
													<Cell key={index} fill={CHART_COLORS[category.color] || '#6b7280'} />
												))}
											</Bar>
										</BarChart>
									</ResponsiveContainer>
								</div>
							</Tabs.Panel>
						))}
					</Tabs>
				</section>

				{/* Experience Section */}
				<section className='bg-white py-16'>
					<div className='container mx-auto px-4'>
						<div className='flex flex-col gap-8 md:flex-row'>
							<div className='md:w-72 md:shrink-0'>
								<SectionHeader
									title='My Experience'
									subtitle='The companies I have worked with'
									description='You can find out what experiences I have had in my career. I have worked with a lot of companies and startups as a designer, developer, and advisor.'
									align='left'
								/>

								<div className='mt-8'>
									<p className='mb-3 font-medium text-gray-900'>Resume</p>
									<span className='mb-4 block text-sm text-gray-500'>Download a copy of my latest resume in PDF</span>
									<Button color='secondary' size='sm' iconLeading={Download01}>
										Download CV
									</Button>
								</div>
							</div>

							<div className='flex-1'>
								<div className='space-y-8'>
									{experienceData.map((exp, index) => (
										<ExperienceCard
											key={index}
											company={exp.company}
											role={exp.role}
											tech={exp.tech}
											period={exp.period}
											location={exp.location}
											description={exp.description}
											highlights={exp.highlights}
											metrics={exp.metrics}
										/>
									))}
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* My Usual Apps Section */}
				<section className='pt-20 pb-12'>
					<div className='container-sm'>
						<SectionHeader title={appsData.title} subtitle={appsData.subtitle} description={appsData.description} />

						<div className='mb-20 grid grid-cols-4 justify-center gap-6 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9'>
							{appsData.apps.map((app, index) => (
								<div key={index} className='text-center'>
									<img src={app.icon} alt={app.name} className='mx-auto h-12 w-auto' />
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Testimonials Section */}
				<section className='bg-white py-32'>
					<div className='container'>
						<SectionHeader
							title='What People are Saying...'
							subtitle='Some honest testimonials from people I have worked with'
							description='These are some of the testimonials I have received from people I have worked with. I have worked with a lot of companies and startups as a designer, developer, and advisor.'
						/>

						{/* Desktop: Show all testimonials */}
						<div className='mx-auto hidden max-w-6xl grid-cols-3 gap-6 lg:grid'>
							{testimonialsData.map((testimonial, index) => (
								<TestimonialCard
									key={index}
									quote={testimonial.quote}
									name={testimonial.name}
									company={testimonial.company}
									role={testimonial.role}
									rating={testimonial.rating}
									image={testimonial.image}
								/>
							))}
						</div>

						{/* Mobile: Carousel */}
						<div className='lg:hidden'>
							<div className='mx-auto max-w-md'>
								<TestimonialCard
									quote={testimonialsData[activeTestimonial].quote}
									name={testimonialsData[activeTestimonial].name}
									company={testimonialsData[activeTestimonial].company}
									role={testimonialsData[activeTestimonial].role}
									rating={testimonialsData[activeTestimonial].rating}
									image={testimonialsData[activeTestimonial].image}
								/>
							</div>

							<div className='mt-6 flex items-center justify-center gap-4'>
								<Button color='secondary' size='sm' iconLeading={ArrowLeft} onClick={handlePrevTestimonial} />

								<div className='flex gap-2'>
									{testimonialsData.map((_, index) => (
										<button
											key={index}
											type='button'
											onClick={() => setActiveTestimonial(index)}
											className={`size-2 rounded-full transition-colors ${
												index === activeTestimonial ? 'bg-brand-600' : 'bg-gray-300'
											}`}
										/>
									))}
								</div>

								<Button color='secondary' size='sm' iconLeading={ArrowRight} onClick={handleNextTestimonial} />
							</div>
						</div>
					</div>
				</section>
			</div>

			<Footer />
		</>
	)
}
