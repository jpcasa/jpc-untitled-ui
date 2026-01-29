import type { FC } from 'react'
import { useMemo, useState } from 'react'

import { useTranslation } from 'react-i18next'

import { Select } from '@/components/base/select/select'
import { Footer } from '@/components/layout/footer'
import { PageHeader } from '@/components/layout/page-header'
import { ResourceCard } from '@/components/resources'
import { BreadcrumbJsonLd, Seo } from '@/components/seo'
import { pagesSeo } from '@/config/seo-config'
import resourcesData from '@/data/resources.json'

type FilterValue = 'all' | 'design' | 'engineering' | 'productivity' | 'marketing'

export const ResourcesScreen: FC = () => {
	const { t } = useTranslation()
	const [activeFilter, setActiveFilter] = useState<FilterValue>(resourcesData.defaultFilter as FilterValue)

	const filteredResources = useMemo(() => {
		if (activeFilter === 'all') {
			return resourcesData.resources
		}
		return resourcesData.resources.filter((resource) => resource.category === activeFilter)
	}, [activeFilter])

	const filterLabels: Record<FilterValue, string> = {
		all: t('resources.filters.all'),
		design: t('resources.filters.design'),
		engineering: t('resources.filters.engineering'),
		productivity: t('resources.filters.productivity'),
		marketing: t('resources.filters.marketing'),
	}

	const selectItems = resourcesData.filters.map((filter) => ({
		id: filter.value,
		label: filterLabels[filter.value as FilterValue],
	}))

	return (
		<>
			<Seo
				title={pagesSeo.resources.title}
				description={pagesSeo.resources.description}
				keywords={pagesSeo.resources.keywords}
			/>
			<BreadcrumbJsonLd
				items={[
					{ name: 'Home', url: '/' },
					{ name: t('nav.resources'), url: '/resources' },
				]}
			/>

			<div className='mb-24'>
				<PageHeader align='center'>
					<div className='mx-auto max-w-2xl'>
						<p className='mb-3 font-medium text-brand-400'>{t('resources.subtitle')}</p>
						<h1 className='mb-6 text-4xl font-semibold text-white md:text-5xl'>{t('resources.title')}</h1>
						<p className='text-gray-300'>{t('resources.description')}</p>
					</div>
				</PageHeader>

				{/* Content Section */}
				<section className='container mx-auto px-4 py-12'>
					<div className='md:flex'>
						{/* Filters Sidebar */}
						<div className='mb-8 md:mr-8 md:mb-0 md:w-64 md:shrink-0'>
							{/* Mobile Select */}
							<div className='md:hidden'>
								<Select
									selectedKey={activeFilter}
									onSelectionChange={(key) => setActiveFilter(key as FilterValue)}
									items={selectItems}
									placeholder='Select category'
								>
									{(item) => (
										<Select.Item id={item.id} key={item.id}>
											{item.label}
										</Select.Item>
									)}
								</Select>
							</div>

							{/* Desktop Filter Menu */}
							<div className='hidden md:block'>
								<div className='overflow-hidden rounded-lg border border-secondary bg-primary'>
									{resourcesData.filters.map((filter) => (
										<button
											key={filter.value}
											onClick={() => setActiveFilter(filter.value as FilterValue)}
											className={`w-full cursor-pointer border border-transparent px-4 py-3 text-left text-sm transition-colors first:rounded-t-lg last:rounded-b-lg ${
												activeFilter === filter.value
													? 'border-brand-500 bg-brand-100 text-brand-600'
													: 'text-secondary hover:text-brand-600'
											}`}
										>
											{filterLabels[filter.value as FilterValue]}
										</button>
									))}
								</div>
							</div>
						</div>

						{/* Resources Grid */}
						<div className='flex-1'>
							<div className='grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4'>
								{filteredResources.map((resource, index) => (
									<ResourceCard
										key={index}
										name={resource.name}
										icon={resource.icon}
										url={resource.url}
										description={resource.description}
										horizontal={resource.horizontal}
									/>
								))}
							</div>
						</div>
					</div>
				</section>
			</div>

			<Footer />
		</>
	)
}
