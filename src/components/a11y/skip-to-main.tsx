import type { FC } from 'react'

/**
 * Skip to main content link for keyboard navigation accessibility.
 * Hidden by default, becomes visible when focused via keyboard.
 */
export const SkipToMain: FC = () => {
	return (
		<a
			href='#main-content'
			className='skip-to-main rounded-md font-medium focus:ring-2 focus:ring-brand-400 focus:outline-none'
		>
			Skip to main content
		</a>
	)
}
