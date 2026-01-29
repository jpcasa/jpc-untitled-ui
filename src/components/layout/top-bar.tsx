import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { Menu01, Moon01, Sun, XClose } from '@untitledui/icons'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'

import { Logo } from '@/components/application/logo/logo'
import { Button } from '@/components/base/buttons/button'
import { AvailabilityStatus, LanguageSelector } from '@/components/shared'
import profileData from '@/data/profile.json'
import { useTheme } from '@/providers/theme-provider'
import { routes } from '@/router'
import { cx } from '@/utils/cx'

const SCROLL_THRESHOLD = 500

export const TopBar = () => {
	const { t } = useTranslation()
	const location = useLocation()
	const { theme, toggleTheme } = useTheme()
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
	const [isScrolled, setIsScrolled] = useState(false)
	const currentPath = useMemo(() => location.pathname, [location])
	const currentRoute = useMemo(() => routes.find((route) => route.path === currentPath), [currentPath])
	const mobileMenuRef = useRef<HTMLDivElement>(null)
	const menuButtonRef = useRef<HTMLButtonElement>(null)

	// Track scroll position to switch header style after threshold
	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > SCROLL_THRESHOLD)
		}

		// Check initial scroll position
		handleScroll()

		window.addEventListener('scroll', handleScroll, { passive: true })
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	// Close mobile menu on route change
	useEffect(() => {
		setMobileMenuOpen(false)
	}, [currentPath])

	// Prevent body scroll when mobile menu is open
	useEffect(() => {
		if (mobileMenuOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = ''
		}
		return () => {
			document.body.style.overflow = ''
		}
	}, [mobileMenuOpen])

	// Focus trap for mobile menu
	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (!mobileMenuOpen) return

			if (e.key === 'Escape') {
				setMobileMenuOpen(false)
				menuButtonRef.current?.focus()
				return
			}

			if (e.key === 'Tab' && mobileMenuRef.current) {
				const focusableElements = mobileMenuRef.current.querySelectorAll<HTMLElement>(
					'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
				)
				const firstElement = focusableElements[0]
				const lastElement = focusableElements[focusableElements.length - 1]

				if (e.shiftKey && document.activeElement === firstElement) {
					e.preventDefault()
					lastElement?.focus()
				} else if (!e.shiftKey && document.activeElement === lastElement) {
					e.preventDefault()
					firstElement?.focus()
				}
			}
		},
		[mobileMenuOpen]
	)

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown)
		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [handleKeyDown])

	// Focus first element when menu opens
	useEffect(() => {
		if (mobileMenuOpen && mobileMenuRef.current) {
			const firstFocusable = mobileMenuRef.current.querySelector<HTMLElement>(
				'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
			)
			firstFocusable?.focus()
		}
	}, [mobileMenuOpen])

	// Override dark/invisible modes when scrolled past threshold
	const isDarkMode = !isScrolled && currentRoute?.darkTopBar
	const isInvisibleMode = !isScrolled && currentRoute?.invisibleTopBar

	return (
		<>
			<div
				className={cx(
					'fixed inset-x-0 top-0 z-20 flex h-14 w-screen items-center transition-colors duration-300',
					isInvisibleMode ? 'bg-none!' : isDarkMode ? 'bg-none' : 'border-b border-secondary bg-primary'
				)}
			>
				<div className='container flex h-full items-center justify-between'>
					<div className='flex items-center gap-4'>
						<Link to='/'>
							<Logo theme={isDarkMode ? 'dark' : 'light'} />
						</Link>

						{/* Desktop Navigation */}
						<nav aria-label='Main navigation' className='hidden items-center gap-[2px] text-sm font-medium md:flex'>
							{routes
								.filter((route) => route.label)
								.map((route, i) => (
									<div key={i}>
										{route.path ? (
											<Link
												to={route.path}
												aria-current={route.path === currentPath ? 'page' : undefined}
												className={cx(
													'rounded-md px-2 py-1.5 transition-colors hover:bg-brand-50 hover:text-brand-600',
													isDarkMode ? 'text-white' : 'text-primary',
													route.path === currentPath && 'bg-brand-50 text-brand-700'
												)}
											>
												{route.label}
											</Link>
										) : (
											<button
												type='button'
												onClick={route.action}
												className={cx(
													'cursor-pointer rounded-md px-2 py-1.5 hover:bg-brand-50 hover:text-brand-700',
													isDarkMode ? 'text-white' : 'text-primary'
												)}
											>
												{route.label}
											</button>
										)}
									</div>
								))}
							<LanguageSelector isDarkMode={isDarkMode} />
						</nav>
					</div>

					{/* Desktop Buttons */}
					<div className='hidden items-center gap-1 md:flex'>
						<AvailabilityStatus
							isAvailable={profileData.availability.isAvailable}
							status={profileData.availability.status}
							className='hidden lg:flex'
						/>
						<Button
							size='xs'
							color='tertiary'
							onClick={toggleTheme}
							aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
						>
							{theme === 'light' ? (
								<Moon01 className='size-4' aria-hidden='true' />
							) : (
								<Sun className='size-4' aria-hidden='true' />
							)}
						</Button>
						<Button href='/JP-CV.pdf' download='JP-Casabianca-CV.pdf' size='xs' color='secondary'>
							{t('nav.cv')}
						</Button>
						<Button href={`mailto:${profileData.contact.email}`} size='xs'>
							{t('nav.letsConnect')}
						</Button>
					</div>

					{/* Mobile Menu Button */}
					<Button
						ref={menuButtonRef}
						color='secondary'
						size='xs'
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
						aria-expanded={mobileMenuOpen}
						aria-controls='mobile-menu'
						className='md:hidden'
					>
						{mobileMenuOpen ? (
							<XClose className='size-6' aria-hidden='true' />
						) : (
							<Menu01 className='size-6' aria-hidden='true' />
						)}
					</Button>
				</div>
			</div>

			{/* Mobile Menu Overlay */}
			<div
				className={cx(
					'fixed inset-0 z-10 bg-black/50 transition-opacity md:hidden',
					mobileMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
				)}
				onClick={() => setMobileMenuOpen(false)}
			/>

			{/* Mobile Menu Panel */}
			<div
				ref={mobileMenuRef}
				id='mobile-menu'
				role='dialog'
				aria-modal='true'
				aria-label='Mobile navigation menu'
				className={cx(
					'fixed inset-y-0 right-0 z-20 w-full max-w-xs bg-primary shadow-xl transition-transform duration-300 md:hidden',
					mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
				)}
			>
				<div className='flex h-14 items-center justify-end px-4'>
					<Button
						color='tertiary'
						size='xs'
						onClick={() => {
							setMobileMenuOpen(false)
							menuButtonRef.current?.focus()
						}}
						aria-label='Close menu'
					>
						<XClose className='size-6' aria-hidden='true' />
					</Button>
				</div>

				<nav aria-label='Mobile navigation' className='flex flex-col gap-1 px-4'>
					{routes
						.filter((route) => route.label)
						.map((route, i) => (
							<div key={i}>
								{route.path ? (
									<Link
										to={route.path}
										onClick={() => setMobileMenuOpen(false)}
										aria-current={route.path === currentPath ? 'page' : undefined}
										className={cx(
											'block rounded-md px-3 py-2.5 text-base font-medium transition-colors',
											route.path === currentPath ? 'bg-brand-50 text-brand-700' : 'text-primary hover:bg-secondary'
										)}
									>
										{route.label}
									</Link>
								) : (
									<button
										type='button'
										onClick={() => {
											route.action?.()
											setMobileMenuOpen(false)
										}}
										className='block w-full cursor-pointer rounded-md px-3 py-2.5 text-left text-base font-medium text-primary hover:bg-secondary'
									>
										{route.label}
									</button>
								)}
							</div>
						))}
				</nav>

				<div className='mt-4 px-4'>
					<AvailabilityStatus
						isAvailable={profileData.availability.isAvailable}
						status={profileData.availability.status}
						className='mb-4 justify-center'
					/>
					<LanguageSelector className='mb-4 justify-center' />
				</div>

				<div className='flex flex-col gap-2 px-4'>
					<Button
						size='md'
						color='tertiary'
						onClick={toggleTheme}
						aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
						className='w-full'
					>
						{theme === 'light' ? (
							<>
								<Moon01 className='size-5' aria-hidden='true' />
								<span>{t('nav.darkMode')}</span>
							</>
						) : (
							<>
								<Sun className='size-5' aria-hidden='true' />
								<span>{t('nav.lightMode')}</span>
							</>
						)}
					</Button>
					<Button href='/JP-CV.pdf' download='JP-Casabianca-CV.pdf' size='md' color='secondary' className='w-full'>
						{t('nav.cv')}
					</Button>
					<Button href={`mailto:${profileData.contact.email}`} size='md' className='w-full'>
						{t('nav.letsConnect')}
					</Button>
				</div>
			</div>
		</>
	)
}
