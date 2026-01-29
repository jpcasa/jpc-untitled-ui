import type { FC } from 'react'
import { useRef, useState } from 'react'

import { ChevronDown } from '@untitledui/icons'
import { useTranslation } from 'react-i18next'

import { type LanguageCode, languages } from '@/locales'
import { cx } from '@/utils/cx'

interface LanguageSelectorProps {
	className?: string
	isDarkMode?: boolean
}

export const LanguageSelector: FC<LanguageSelectorProps> = ({ className, isDarkMode }) => {
	const { i18n } = useTranslation()
	const [isOpen, setIsOpen] = useState(false)
	const dropdownRef = useRef<HTMLDivElement>(null)

	const currentLanguage = languages.find((lang) => lang.code === i18n.language) || languages[0]

	const handleLanguageChange = (code: LanguageCode) => {
		i18n.changeLanguage(code)
		setIsOpen(false)
	}

	const handleBlur = (e: React.FocusEvent) => {
		if (!dropdownRef.current?.contains(e.relatedTarget)) {
			setIsOpen(false)
		}
	}

	return (
		<div ref={dropdownRef} className={cx('relative', className)} onBlur={handleBlur}>
			<button
				type='button'
				onClick={() => setIsOpen(!isOpen)}
				className={cx(
					'flex cursor-pointer items-center gap-1 rounded-md px-2 py-1.5 text-sm font-medium transition-colors hover:bg-brand-50 hover:text-brand-600',
					isDarkMode ? 'text-white' : 'text-primary'
				)}
				aria-expanded={isOpen}
				aria-haspopup='listbox'
			>
				{currentLanguage.shortName}
				<ChevronDown className={cx('size-4 transition-transform', isOpen && 'rotate-180')} aria-hidden='true' />
			</button>

			{isOpen && (
				<div
					className='absolute top-full right-0 z-50 mt-1 min-w-[140px] overflow-hidden rounded-lg border border-secondary bg-primary py-1 shadow-lg'
					role='listbox'
					aria-label='Select language'
				>
					{languages.map((lang) => (
						<button
							key={lang.code}
							type='button'
							role='option'
							aria-selected={lang.code === currentLanguage.code}
							onClick={() => handleLanguageChange(lang.code)}
							className={cx(
								'flex w-full cursor-pointer items-center justify-between px-3 py-2 text-sm transition-colors hover:bg-secondary',
								lang.code === currentLanguage.code ? 'bg-brand-50 text-brand-700' : 'text-primary'
							)}
						>
							<span>{lang.name}</span>
							<span className='text-xs text-secondary'>{lang.shortName}</span>
						</button>
					))}
				</div>
			)}
		</div>
	)
}
