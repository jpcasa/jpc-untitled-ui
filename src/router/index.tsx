import { Suspense, lazy } from 'react'

import { Route, Routes } from 'react-router'

import { PageSkeleton } from '@/components/shared'

// Lazy load page components for code splitting
const HomeScreen = lazy(() => import('@/pages/home-screen').then((m) => ({ default: m.HomeScreen })))
const AboutScreen = lazy(() => import('@/pages/about-screen').then((m) => ({ default: m.AboutScreen })))
const WorkScreen = lazy(() => import('@/pages/work-screen').then((m) => ({ default: m.WorkScreen })))
const CreativeProcessScreen = lazy(() =>
	import('@/pages/creative-process-screen').then((m) => ({ default: m.CreativeProcessScreen }))
)
const ResourcesScreen = lazy(() => import('@/pages/resources-screen').then((m) => ({ default: m.ResourcesScreen })))
const BlogScreen = lazy(() => import('@/pages/blog-screen').then((m) => ({ default: m.BlogScreen })))
const BlogPostScreen = lazy(() => import('@/pages/blog-post-screen').then((m) => ({ default: m.BlogPostScreen })))
const NotFound = lazy(() => import('@/pages/not-found').then((m) => ({ default: m.NotFound })))

// Wrapper component for lazy loaded pages
const LazyPage = ({ children }: { children: React.ReactNode }) => (
	<Suspense fallback={<PageSkeleton />}>{children}</Suspense>
)

export const routes = [
	{
		path: '/',
		element: (
			<LazyPage>
				<HomeScreen />
			</LazyPage>
		),
		invisibleTopBar: true,
	},
	{
		path: '/about',
		label: 'About Me',
		element: (
			<LazyPage>
				<AboutScreen />
			</LazyPage>
		),
		darkTopBar: true,
	},
	{
		path: '/work',
		label: 'Work',
		element: (
			<LazyPage>
				<WorkScreen />
			</LazyPage>
		),
	},
	{
		path: '/creative-process',
		label: 'Creative Process',
		element: (
			<LazyPage>
				<CreativeProcessScreen />
			</LazyPage>
		),
		darkTopBar: true,
	},
	{
		path: '/resources',
		label: 'Resources',
		element: (
			<LazyPage>
				<ResourcesScreen />
			</LazyPage>
		),
		darkTopBar: true,
	},
	{
		path: '/blog',
		label: 'Blog',
		element: (
			<LazyPage>
				<BlogScreen />
			</LazyPage>
		),
		darkTopBar: true,
	},
	{
		path: '/blog/:id',
		element: (
			<LazyPage>
				<BlogPostScreen />
			</LazyPage>
		),
	},
	{
		label: 'Gallery',
		action: () => {
			window.open('https://dribbble.com/jpcasabiancai', '_blank')
		},
	},
	{
		label: 'Play',
		action: () => {
			window.open('https://www.instagram.com/jpcasabiancai/', '_blank')
		},
	},
	{
		path: '*',
		element: (
			<LazyPage>
				<NotFound />
			</LazyPage>
		),
	},
]

export const AppRoutes = () => {
	return (
		<Routes>
			{routes.map((route) => (
				<Route key={route.path} path={route.path} element={route.element} />
			))}
		</Routes>
	)
}
