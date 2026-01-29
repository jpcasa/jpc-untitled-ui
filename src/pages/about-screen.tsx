import { type FC, useState } from 'react'

import { ArrowLeft, ArrowRight, Calendar, Download01, Mail01, Package, ShoppingBag01, Users01 } from '@untitledui/icons'
import { useTranslation } from 'react-i18next'
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, XAxis, YAxis } from 'recharts'

import {
	CertificationCard,
	EducationCard,
	ExperienceCard,
	HighlightCard,
	LanguageBadge,
	SectionHeader,
	SoftSkillTag,
	TestimonialCard,
} from '@/components/about'
import { Tabs } from '@/components/application/tabs/tabs'
import { Badge } from '@/components/base/badges/badges'
import { Button } from '@/components/base/buttons/button'
import { Footer } from '@/components/layout/footer'
import { BreadcrumbJsonLd, PersonJsonLd, Seo } from '@/components/seo'
import { BentoCard } from '@/components/work'
import { pagesSeo } from '@/config/seo-config'
import appsData from '@/data/apps.json'
import caseStudiesData from '@/data/case-studies.json'
import certificationsData from '@/data/certifications.json'
import educationData from '@/data/education.json'
import experienceData from '@/data/experience.json'
import highlightsData from '@/data/highlights.json'
import profileData from '@/data/profile.json'
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

const HIGHLIGHT_ICONS: Record<string, FC<{ className?: string }>> = {
	calendar: Calendar,
	package: Package,
	download: ShoppingBag01,
	users: Users01,
}

export const AboutScreen: FC = () => {
	const { t } = useTranslation()
	const [activeTestimonial, setActiveTestimonial] = useState(0)

	const handlePrevTestimonial = () => {
		setActiveTestimonial((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1))
	}

	const handleNextTestimonial = () => {
		setActiveTestimonial((prev) => (prev === testimonialsData.length - 1 ? 0 : prev + 1))
	}

	// Get featured case studies
	const featuredCaseStudies = highlightsData.featuredCaseStudyIds
		.map((id) => caseStudiesData.find((cs) => cs.id === id))
		.filter(Boolean)

	return (
		<>
			<Seo title={pagesSeo.about.title} description={pagesSeo.about.description} keywords={pagesSeo.about.keywords} />
			<PersonJsonLd />
			<BreadcrumbJsonLd
				items={[
					{ name: t('nav.about'), url: '/' },
					{ name: t('about.title'), url: '/about' },
				]}
			/>

			<div className='bg-secondary'>
				{/* Hero Section - Enhanced */}
				<section className='bg-cover pt-16 pb-8' style={{ backgroundImage: "url('/img/about-bg.png')" }}>
					<div className='container mx-auto px-4'>
						<div className='gap-8 pt-12 lg:grid lg:grid-cols-2'>
							<div className='text-center lg:pl-8 lg:text-left'>
								{/* Availability Badge */}
								{profileData.availability.isAvailable && (
									<div className='flex flex-wrap justify-center gap-2 lg:justify-start'>
										<Badge type='pill-color' color='success' size='md' className='mb-4'>
											{t('common.openToWork')}
										</Badge>
										<Badge type='pill-color' color='brand' size='md'>
											10+ {t('about.highlights.metrics.experience')}
										</Badge>
									</div>
								)}

								<h1 className="mt-4 font-['DM_Serif_Display',serif] text-3xl text-white md:text-4xl xl:mt-6">
									{t('about.heroTitle')}
								</h1>

								<p className='mt-6 mb-6 text-gray-300'>{t('about.heroDescription')}</p>

								<Button href='mailto:hola@jpcasabianca.com' color='primary' size='md' iconLeading={Mail01}>
									{t('nav.letsConnect')}
								</Button>
							</div>

							<div className='mt-12 flex items-end justify-center lg:mt-0'>
								<img
									src='/img/about-2.webp'
									alt='JP Casabianca'
									className='w-full max-w-xs rounded-lg sm:max-w-sm md:max-w-md lg:max-w-lg'
								/>
							</div>
						</div>
					</div>
				</section>

				{/* Highlights/Impact Section - NEW */}
				<section className='bg-primary py-16'>
					<div className='container mx-auto px-4'>
						<SectionHeader
							title={t('about.highlights.title')}
							subtitle={t('about.highlights.subtitle')}
							description={t('about.highlights.description')}
							align='center'
						/>

						<div className='mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-8 md:grid-cols-4'>
							{highlightsData.metrics.map((metric) => {
								const IconComponent = HIGHLIGHT_ICONS[metric.icon]
								return (
									<HighlightCard
										key={metric.id}
										value={metric.value}
										label={t(`about.highlights.metrics.${metric.id}`)}
										icon={IconComponent}
									/>
								)
							})}
						</div>
					</div>
				</section>

				{/* Featured Work Section - NEW */}
				<section className='bg-secondary py-16'>
					<div className='container mx-auto px-4'>
						<SectionHeader
							title={t('about.featuredWork.title')}
							subtitle={t('about.featuredWork.subtitle')}
							description={t('about.featuredWork.description')}
							align='center'
						/>

						<div className='mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-2'>
							{featuredCaseStudies.map((caseStudy, index) =>
								caseStudy ? (
									<BentoCard
										key={caseStudy.id}
										title={caseStudy.title}
										subtitle={caseStudy.subtitle}
										summary={caseStudy.summary}
										image={caseStudy.image}
										logo={caseStudy.logo}
										bgColor={caseStudy.bgColor}
										tags={caseStudy.tags}
										link={caseStudy.link}
										outcomes={caseStudy.outcomes}
										size={index === 0 ? 'large' : 'medium'}
									/>
								) : null
							)}
						</div>

						<div className='mt-12 text-center'>
							<Button href='/work' color='secondary' size='lg'>
								{t('about.featuredWork.viewAll')}
							</Button>
						</div>
					</div>
				</section>

				{/* Skills Section */}
				<section className='container mx-auto px-4 py-16'>
					<SectionHeader title={t('about.skills.title')} description={t('about.skills.description')} align='center' />

					<Tabs defaultSelectedKey='Design'>
						<div className='-mx-4 flex justify-center overflow-x-auto px-4 pb-8'>
							<Tabs.List
								type='button-gray'
								size='md'
								items={skillsData.categories.map((cat) => ({ id: cat.name, label: cat.name }))}
							/>
						</div>

						{skillsData.categories.map((category) => (
							<Tabs.Panel key={category.name} id={category.name}>
								<div className='mx-auto max-w-4xl rounded-2xl bg-primary p-4 shadow-sm sm:p-6 md:p-8'>
									<ResponsiveContainer width='100%' height={category.items.length * 50 + 40}>
										<BarChart data={category.items} layout='vertical' margin={{ left: 0, right: 20, bottom: 20 }}>
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
												width={80}
												tick={{ fill: '#374151', fontSize: 12 }}
												axisLine={false}
												tickLine={false}
											/>
											<Bar dataKey='level' radius={[0, 6, 6, 0]} barSize={20}>
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
				<section className='bg-primary py-16'>
					<div className='container mx-auto px-4'>
						<div className='flex flex-col gap-8 md:flex-row'>
							<div className='md:w-72 md:shrink-0'>
								<SectionHeader
									title={t('about.experience.title')}
									subtitle={t('about.experience.subtitle')}
									description={t('about.experience.description')}
									align='left'
								/>

								<div className='mt-8'>
									<p className='mb-3 font-medium text-primary'>{t('about.experience.resume')}</p>
									<span className='mb-4 block text-sm text-secondary'>{t('about.experience.resumeDescription')}</span>
									<Button color='secondary' size='sm' iconLeading={Download01}>
										{t('about.experience.downloadCv')}
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

				{/* Education & Certifications Section - NEW */}
				<section className='bg-secondary py-16'>
					<div className='container mx-auto px-4'>
						<SectionHeader
							title={t('about.education.title')}
							subtitle={t('about.education.subtitle')}
							description={t('about.education.description')}
							align='center'
						/>

						<div className='mx-auto mt-12 grid max-w-3xl gap-6 md:grid-cols-2'>
							{/* Education */}
							{educationData.map((edu, index) => (
								<EducationCard
									key={index}
									institution={edu.institution}
									degree={edu.degree}
									period={edu.period}
									gpa={edu.gpa}
								/>
							))}

							{/* Certifications */}
							{certificationsData.map((cert) => (
								<CertificationCard
									key={cert.id}
									name={cert.name}
									issuer={cert.issuer}
									date={cert.date}
									icon={cert.icon}
								/>
							))}
						</div>
					</div>
				</section>

				{/* Languages & Soft Skills Section - NEW */}
				<section className='bg-primary py-16'>
					<div className='container mx-auto px-4'>
						<div className='mx-auto max-w-4xl'>
							{/* Languages */}
							<div className='mb-16'>
								<SectionHeader
									title={t('about.languages.title')}
									subtitle={t('about.languages.subtitle')}
									description={t('about.languages.description')}
									align='center'
								/>

								<div className='mt-8 flex flex-wrap justify-center gap-8'>
									{profileData.languages.map((lang, index) => (
										<LanguageBadge
											key={index}
											language={lang.language}
											level={t(`about.languages.levels.${lang.level.toLowerCase()}`)}
										/>
									))}
								</div>
							</div>

							{/* Soft Skills */}
							<div>
								<SectionHeader
									title={t('about.softSkills.title')}
									subtitle={t('about.softSkills.subtitle')}
									description={t('about.softSkills.description')}
									align='center'
								/>

								<div className='mt-8 flex flex-wrap justify-center gap-3'>
									{profileData.softSkills.map((skill, index) => (
										<SoftSkillTag key={index} skill={skill} />
									))}
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Testimonials Section */}
				<section className='bg-secondary py-32'>
					<div className='container'>
						<SectionHeader
							title={t('about.testimonials.title')}
							subtitle={t('about.testimonials.subtitle')}
							description={t('about.testimonials.description')}
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
												index === activeTestimonial ? 'bg-brand-600' : 'bg-tertiary'
											}`}
										/>
									))}
								</div>

								<Button color='secondary' size='sm' iconLeading={ArrowRight} onClick={handleNextTestimonial} />
							</div>
						</div>
					</div>
				</section>

				{/* My Usual Apps Section */}
				<section className='bg-primary pt-20 pb-12'>
					<div className='container-sm'>
						<SectionHeader
							title={t('about.apps.title')}
							subtitle={t('about.apps.subtitle')}
							description={t('about.apps.description')}
						/>

						<div className='mb-20 grid grid-cols-4 justify-center gap-6 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9'>
							{appsData.apps.map((app, index) => (
								<div key={index} className='group text-center'>
									<img
										src={app.icon}
										alt={app.name}
										className='mx-auto h-12 w-auto transition-transform group-hover:scale-110'
									/>
									<span className='mt-2 block text-xs text-secondary opacity-0 transition-opacity group-hover:opacity-100'>
										{app.name}
									</span>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* CTA Section - NEW */}
				<section className='bg-gradient-to-r from-brand-600 to-brand-500 py-16'>
					<div className='container mx-auto px-4'>
						<div className='mx-auto max-w-2xl text-center'>
							<h2 className='mb-4 text-2xl font-semibold text-white md:text-3xl'>{t('about.cta.title')}</h2>
							<p className='mb-8 text-brand-100'>{t('about.cta.description')}</p>
							<div className='flex flex-col justify-center gap-4 sm:flex-row'>
								<Button href='/work' color='secondary' size='lg' className='bg-white text-brand-700 hover:bg-brand-50'>
									{t('about.cta.viewWork')}
								</Button>
								<Button
									color='secondary'
									size='lg'
									iconLeading={Download01}
									className='border-white/30 bg-transparent text-white hover:bg-white/10'
								>
									{t('about.cta.downloadCv')}
								</Button>
								<Button
									href='mailto:hola@jpcasabianca.com'
									color='secondary'
									size='lg'
									className='border-white/30 bg-transparent text-white hover:bg-white/10'
								>
									{t('about.cta.connect')}
								</Button>
							</div>
						</div>
					</div>
				</section>
			</div>

			<Footer />
		</>
	)
}
