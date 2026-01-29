import type { FC } from 'react'

import { useTranslation } from 'react-i18next'

import { Footer } from '@/components/layout/footer'
import { PageHeader } from '@/components/layout/page-header'
import { BreadcrumbJsonLd, Seo } from '@/components/seo'
import { BentoCard } from '@/components/work'
import { pagesSeo } from '@/config/seo-config'
import caseStudiesData from '@/data/case-studies.json'

// Define the bento grid layout pattern
// Each row must sum to 3 columns: large(2) + medium(1) = 3, or medium(1) x 3 = 3
const getBentoSize = (index: number): 'large' | 'medium' | 'small' => {
	// Row 1: large + medium = 3
	// Row 2: medium + medium + medium = 3
	// Row 3: large + medium = 3
	const pattern = ['large', 'medium', 'medium', 'medium', 'medium', 'large', 'medium'] as const
	return pattern[index % pattern.length]
}

export const WorkScreen: FC = () => {
	const { t } = useTranslation()

	return (
		<>
			<Seo title={pagesSeo.work.title} description={pagesSeo.work.description} keywords={pagesSeo.work.keywords} />
			<BreadcrumbJsonLd
				items={[
					{ name: 'Home', url: '/' },
					{ name: t('nav.work'), url: '/work' },
				]}
			/>

			<div className='min-h-screen bg-primary'>
				<PageHeader align='center'>
					<div className='mx-auto max-w-2xl'>
						<p className='mb-3 text-sm font-semibold tracking-wider text-brand-400 uppercase'>{t('work.subtitle')}</p>
						<h1 className='mb-4 text-4xl font-bold text-white md:text-5xl'>{t('work.title')}</h1>
						<p className='text-lg text-gray-300'>{t('work.description')}</p>
					</div>
				</PageHeader>

				{/* Bento Grid */}
				<section className='pb-24'>
					<div className='container mx-auto px-4'>
						<div className='grid gap-4 md:grid-cols-3 md:gap-5'>
							{caseStudiesData.map((caseStudy, index) => (
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
									size={getBentoSize(index)}
								/>
							))}
						</div>
					</div>
				</section>
			</div>

			<Footer />
		</>
	)
}
