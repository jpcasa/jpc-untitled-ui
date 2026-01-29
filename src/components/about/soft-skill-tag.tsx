import type { FC } from 'react'

import { cx } from '@/utils/cx'

interface SoftSkillTagProps {
	skill: string
	className?: string
}

export const SoftSkillTag: FC<SoftSkillTagProps> = ({ skill, className }) => {
	return (
		<span
			className={cx(
				'inline-flex items-center rounded-full bg-brand-50 px-4 py-2 text-sm font-medium text-brand-700 dark:bg-brand-950 dark:text-brand-300',
				className
			)}
		>
			{skill}
		</span>
	)
}
