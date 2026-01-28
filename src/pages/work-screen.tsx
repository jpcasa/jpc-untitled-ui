import type { FC } from 'react'

import { SectionHeader } from '@/components/about'
import { Footer } from '@/components/layout/footer'
import { BreadcrumbJsonLd, Seo } from '@/components/seo'
import { CaseStudyCard } from '@/components/work'
import { pagesSeo } from '@/config/seo-config'
import caseStudiesData from '@/data/case-studies.json'

export const WorkScreen: FC = () => {
	return (
		<>
			<Seo title={pagesSeo.work.title} description={pagesSeo.work.description} keywords={pagesSeo.work.keywords} />
			<BreadcrumbJsonLd
				items={[
					{ name: 'Home', url: '/' },
					{ name: 'Portfolio', url: '/work' },
				]}
			/>

			<div className='min-h-screen bg-gray-100'>
				{/* Header */}
				<section className='bg-gray-900 py-16 pt-32'>
					<div className='container mx-auto px-4'>
						<SectionHeader
							title='My Work'
							subtitle='Case Studies'
							description='A collection of projects I have worked on over the years. From ecommerce platforms to automation tools, I have had the opportunity to work on a variety of projects.'
							align='center'
							className='[&_h2]:text-white [&_p]:text-gray-400 [&>p:first-child]:text-brand-400'
						/>
					</div>
				</section>

				{/* Case Studies */}
				<section className='py-16'>
					<div className='container mx-auto px-4'>
						<div className='space-y-12'>
							{caseStudiesData.map((caseStudy) => (
								<CaseStudyCard
									key={caseStudy.id}
									slug={caseStudy.slug}
									title={caseStudy.title}
									subtitle={caseStudy.subtitle}
									summary={caseStudy.summary}
									image={caseStudy.image}
									logo={caseStudy.logo}
									bgColor={caseStudy.bgColor}
									titleColor={caseStudy.titleColor}
									subtitleColor={caseStudy.subtitleColor}
									summaryColor={caseStudy.summaryColor}
									benefitColor={caseStudy.benefitColor}
									benefits={caseStudy.benefits}
									tags={caseStudy.tags}
									link={caseStudy.link}
									outcomes={caseStudy.outcomes}
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
