import type { FC } from 'react'
import { useMemo, useState } from 'react'

import { Select } from '@/components/base/select/select'
import { Footer } from '@/components/layout/footer'
import { ResourceCard } from '@/components/resources'
import { BreadcrumbJsonLd, Seo } from '@/components/seo'
import { pagesSeo } from '@/config/seo-config'
import resourcesData from '@/data/resources.json'

type FilterValue = 'all' | 'design' | 'engineering' | 'productivity' | 'marketing'

export const ResourcesScreen: FC = () => {
	const [activeFilter, setActiveFilter] = useState<FilterValue>(resourcesData.defaultFilter as FilterValue)

	const filteredResources = useMemo(() => {
		if (activeFilter === 'all') {
			return resourcesData.resources
		}
		return resourcesData.resources.filter((resource) => resource.category === activeFilter)
	}, [activeFilter])

	const selectItems = resourcesData.filters.map((filter) => ({
		id: filter.value,
		label: filter.label,
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
					{ name: 'Resources', url: '/resources' },
				]}
			/>

			<div className='mb-24'>
				{/* Header Section */}
				<section className='bg-gray-900 py-16 pt-32'>
					<div className='container mx-auto px-4 text-center'>
						<div className='mx-auto max-w-2xl'>
							<p className='mb-3 font-medium text-brand-400'>{resourcesData.header.subtitle}</p>
							<h1 className='mb-6 text-4xl font-semibold text-white md:text-5xl'>{resourcesData.header.title}</h1>
							<span className='text-gray-300'>{resourcesData.header.description}</span>
						</div>
					</div>
				</section>

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
								<div className='overflow-hidden rounded-lg border border-gray-200 bg-white'>
									{resourcesData.filters.map((filter) => (
										<button
											key={filter.value}
											onClick={() => setActiveFilter(filter.value as FilterValue)}
											className={`w-full cursor-pointer border border-transparent px-4 py-3 text-left text-sm transition-colors first:rounded-t-lg last:rounded-b-lg ${
												activeFilter === filter.value
													? 'border-brand-500 bg-brand-100 text-brand-600'
													: 'text-gray-500 hover:text-brand-600'
											}`}
										>
											{filter.label}
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
