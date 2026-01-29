import type { FC, ImgHTMLAttributes } from 'react'
import { useState } from 'react'

import { cx } from '@/utils/cx'

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
	/** Show a blur placeholder while loading */
	showPlaceholder?: boolean
	/** Custom placeholder color (tailwind bg class) */
	placeholderClass?: string
	/** Aspect ratio for placeholder (e.g., "16/9", "4/3", "1/1") */
	aspectRatio?: string
}

export const OptimizedImage: FC<OptimizedImageProps> = ({
	src,
	alt,
	className,
	showPlaceholder = true,
	placeholderClass = 'bg-tertiary',
	aspectRatio,
	onLoad,
	...props
}) => {
	const [isLoaded, setIsLoaded] = useState(false)
	const [hasError, setHasError] = useState(false)

	const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
		setIsLoaded(true)
		onLoad?.(e)
	}

	const handleError = () => {
		setHasError(true)
		setIsLoaded(true)
	}

	return (
		<div
			className={cx('relative overflow-hidden', aspectRatio && `aspect-[${aspectRatio}]`)}
			style={aspectRatio ? { aspectRatio } : undefined}
		>
			{/* Placeholder */}
			{showPlaceholder && !isLoaded && (
				<div className={cx('absolute inset-0 animate-pulse', placeholderClass)} aria-hidden='true' />
			)}

			{/* Error state */}
			{hasError && (
				<div className='absolute inset-0 flex items-center justify-center bg-secondary'>
					<svg className='size-8 text-tertiary' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={1.5}
							d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
						/>
					</svg>
				</div>
			)}

			{/* Actual image */}
			{!hasError && (
				<img
					src={src}
					alt={alt}
					loading='lazy'
					decoding='async'
					onLoad={handleLoad}
					onError={handleError}
					className={cx(
						'transition-opacity duration-300',
						showPlaceholder && !isLoaded ? 'opacity-0' : 'opacity-100',
						className
					)}
					{...props}
				/>
			)}
		</div>
	)
}
