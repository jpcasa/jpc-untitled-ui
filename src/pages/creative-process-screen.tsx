import { type FC, useState } from 'react'

import { Code01, Heart, LayersThree01, Lightbulb02, RefreshCw01, Target01, Users01, Zap } from '@untitledui/icons'
import { useTranslation } from 'react-i18next'

import { SectionHeader } from '@/components/about'
import { Tabs } from '@/components/application/tabs/tabs'
import { Badge } from '@/components/base/badges/badges'
import { Button } from '@/components/base/buttons/button'
import { ApproachCard, MetricCard, ProcessStepCard } from '@/components/creative-process'
import { Footer } from '@/components/layout/footer'
import { PageHeader } from '@/components/layout/page-header'
import { BreadcrumbJsonLd, Seo } from '@/components/seo'
import { pagesSeo } from '@/config/seo-config'
import appsData from '@/data/apps.json'

const ICONS: Record<string, FC<{ className?: string }>> = {
	heart: Heart,
	target: Target01,
	lightbulb: Lightbulb02,
	layers: LayersThree01,
	users: Users01,
	refresh: RefreshCw01,
}

const DESIGN_STEPS = [
	{ icon: 'heart', key: 'empathize', number: '01' },
	{ icon: 'target', key: 'define', number: '02' },
	{ icon: 'lightbulb', key: 'ideate', number: '03' },
	{ icon: 'layers', key: 'prototype', number: '04' },
	{ icon: 'users', key: 'test', number: '05' },
	{ icon: 'refresh', key: 'iterate', number: '06' },
] as const

const APPROACH_ITEMS = [
	{ key: 'designCode', icon: Code01 },
	{ key: 'userCentered', icon: Users01 },
	{ key: 'iterative', icon: RefreshCw01 },
] as const

const METRICS = ['handoff', 'teams', 'mvp', 'satisfaction'] as const

const TECH_BADGES = ['React', 'Vue 3', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Python'] as const

const APP_CATEGORIES = ['design', 'code', 'productivity'] as const

export const CreativeProcessScreen: FC = () => {
	const { t } = useTranslation()
	const [activeTab, setActiveTab] = useState<string>('design')

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
					{ name: t('nav.creativeProcess'), url: '/creative-process' },
				]}
			/>

			<div className='bg-secondary'>
				{/* Enhanced Hero Section */}
				<PageHeader align='center'>
					<div className='mx-auto max-w-2xl'>
						<p className='mb-3 font-medium text-brand-400'>{t('creativeProcess.subtitle')}</p>
						<h1 className='mb-6 text-4xl font-semibold text-white md:text-5xl'>{t('creativeProcess.title')}</h1>
						<p className='mb-8 text-gray-300'>{t('creativeProcess.description')}</p>

						{/* Metrics Badges */}
						<div className='flex flex-wrap items-center justify-center gap-3'>
							<Badge type='pill-color' color='brand' size='lg'>
								{t('creativeProcess.metrics.projects')}
							</Badge>
							<Badge type='pill-color' color='brand' size='lg'>
								{t('creativeProcess.metrics.experience')}
							</Badge>
							<Badge type='pill-color' color='brand' size='lg'>
								{t('creativeProcess.metrics.approach')}
							</Badge>
						</div>
					</div>
				</PageHeader>

				{/* Main Image Section */}
				<section className='container mx-auto px-4 py-12'>
					<div className='mx-auto max-w-4xl'>
						<img
							src='/img/process-main.png'
							alt='Creative Process - JP Casabianca'
							className='w-full rounded-lg border border-secondary shadow-lg'
						/>
					</div>
				</section>

				{/* Design Section */}
				<section className='bg-cover bg-top pb-24' style={{ backgroundImage: "url('/img/design-bg.png')" }}>
					<div className='container mx-auto px-4'>
						<SectionHeader
							title={t('creativeProcess.designSection.title')}
							subtitle={t('creativeProcess.designSection.subtitle')}
							description={t('creativeProcess.designSection.description')}
							align='center'
						/>

						{/* Design Process Steps with ProcessStepCard */}
						<div className='mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
							{DESIGN_STEPS.map((step) => {
								const IconComponent = ICONS[step.icon]
								return (
									<ProcessStepCard
										key={step.key}
										stepNumber={step.number}
										icon={IconComponent}
										title={t(`creativeProcess.designSteps.${step.key}.title`)}
										description={t(`creativeProcess.designSteps.${step.key}.description`)}
										deliverable={t(`creativeProcess.designSteps.${step.key}.deliverable`)}
									/>
								)
							})}
						</div>

						{/* CTA */}
						<div className='mt-16 text-center'>
							<Button href='/about' color='primary' size='lg'>
								{t('common.learnMore')}
							</Button>
						</div>
					</div>
				</section>

				{/* My Approach Section */}
				<section className='bg-primary py-24'>
					<div className='container mx-auto px-4'>
						<SectionHeader
							title={t('creativeProcess.approach.title')}
							subtitle={t('creativeProcess.approach.subtitle')}
							description={t('creativeProcess.approach.description')}
							align='center'
						/>

						<div className='mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3'>
							{APPROACH_ITEMS.map((item) => (
								<ApproachCard
									key={item.key}
									icon={item.icon}
									title={t(`creativeProcess.approach.${item.key}.title`)}
									description={t(`creativeProcess.approach.${item.key}.description`)}
								/>
							))}
						</div>
					</div>
				</section>

				{/* Code Section - Enhanced */}
				<section className='bg-secondary py-24'>
					<div className='container mx-auto px-4'>
						<div className='mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-2'>
							<div>
								<p className='mb-2 text-sm font-semibold text-brand-600'>{t('creativeProcess.codeSection.subtitle')}</p>
								<h2 className='mb-4 text-2xl font-semibold text-primary md:text-3xl'>
									{t('creativeProcess.codeSection.title')}
								</h2>
								<p className='mb-6 text-secondary'>{t('creativeProcess.codeSection.description')}</p>

								{/* Tech Stack Badges */}
								<div className='mb-6 flex flex-wrap gap-2'>
									{TECH_BADGES.map((tech) => (
										<Badge key={tech} type='modern' color='gray' size='md'>
											{tech}
										</Badge>
									))}
								</div>

								{/* Development Principles */}
								<div className='rounded-lg border border-secondary bg-primary p-4'>
									<h3 className='mb-3 text-sm font-semibold text-primary'>
										{t('creativeProcess.codeSection.principles.title')}
									</h3>
									<ul className='space-y-2'>
										<li className='flex items-center gap-2 text-sm text-secondary'>
											<Zap className='size-4 text-brand-500' />
											{t('creativeProcess.codeSection.principles.items.typescript')}
										</li>
										<li className='flex items-center gap-2 text-sm text-secondary'>
											<Zap className='size-4 text-brand-500' />
											{t('creativeProcess.codeSection.principles.items.testing')}
										</li>
										<li className='flex items-center gap-2 text-sm text-secondary'>
											<Zap className='size-4 text-brand-500' />
											{t('creativeProcess.codeSection.principles.items.performance')}
										</li>
										<li className='flex items-center gap-2 text-sm text-secondary'>
											<Zap className='size-4 text-brand-500' />
											{t('creativeProcess.codeSection.principles.items.accessibility')}
										</li>
									</ul>
								</div>
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

				{/* Results & Impact Section */}
				<section className='bg-primary py-24'>
					<div className='container mx-auto px-4'>
						<SectionHeader
							title={t('creativeProcess.results.title')}
							subtitle={t('creativeProcess.results.subtitle')}
							description={t('creativeProcess.results.description')}
							align='center'
						/>

						<div className='mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-8 md:grid-cols-4'>
							{METRICS.map((metric) => (
								<MetricCard
									key={metric}
									value={t(`creativeProcess.results.metrics.${metric}.value`)}
									label={t(`creativeProcess.results.metrics.${metric}.label`)}
								/>
							))}
						</div>
					</div>
				</section>

				{/* Apps Section - Tabbed */}
				<section className='bg-secondary py-24'>
					<div className='container mx-auto px-4'>
						<SectionHeader
							title={t('creativeProcess.appsSection.title')}
							subtitle={t('creativeProcess.appsSection.subtitle')}
							description={t('creativeProcess.appsSection.description')}
							align='center'
						/>

						<div className='mx-auto mt-8 max-w-4xl'>
							{/* Tabs */}
							<Tabs selectedKey={activeTab} onSelectionChange={(key) => setActiveTab(key as string)}>
								<div className='mb-8 flex justify-center'>
									<Tabs.List
										type='button-border'
										size='md'
										items={APP_CATEGORIES.map((cat) => ({
											id: cat,
											label: t(`creativeProcess.appsSection.tabs.${cat}`),
										}))}
									>
										{(item) => <Tabs.Item key={item.id} id={item.id} label={item.label} />}
									</Tabs.List>
								</div>

								{APP_CATEGORIES.map((category) => (
									<Tabs.Panel key={category} id={category}>
										<div className='grid grid-cols-4 gap-4 sm:grid-cols-6 md:grid-cols-8'>
											{appsData.apps
												.filter((app) => app.category === category)
												.map((app, index) => (
													<div key={index} className='group flex flex-col items-center justify-center' title={app.name}>
														<img
															src={app.icon}
															alt={app.name}
															className='size-12 rounded-xl shadow-sm transition-transform group-hover:scale-110 md:size-14'
														/>
														<span className='mt-2 text-xs text-secondary opacity-0 transition-opacity group-hover:opacity-100'>
															{app.name}
														</span>
													</div>
												))}
										</div>
									</Tabs.Panel>
								))}
							</Tabs>
						</div>
					</div>
				</section>

				{/* CTA Section */}
				<section className='bg-gradient-to-r from-brand-600 to-brand-500 py-16'>
					<div className='container mx-auto px-4'>
						<div className='mx-auto max-w-2xl text-center'>
							<h2 className='mb-4 text-2xl font-semibold text-white md:text-3xl'>{t('creativeProcess.cta.title')}</h2>
							<p className='mb-8 text-brand-100'>{t('creativeProcess.cta.description')}</p>
							<div className='flex flex-col justify-center gap-4 sm:flex-row'>
								<Button href='/work' color='secondary' size='lg' className='bg-white text-brand-700 hover:bg-brand-50'>
									{t('creativeProcess.cta.viewWork')}
								</Button>
								<Button
									href='mailto:hola@jpcasabianca.com'
									color='secondary'
									size='lg'
									className='border-white/30 bg-transparent text-white hover:bg-white/10'
								>
									{t('creativeProcess.cta.connect')}
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
