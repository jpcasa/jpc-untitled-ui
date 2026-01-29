import type { FC, ReactNode } from 'react'

type Alignment = 'left' | 'center' | 'right'

interface PageHeaderProps {
	children: ReactNode
	right?: ReactNode
	align?: Alignment
	withOverlay?: boolean
}

const alignmentClasses: Record<Alignment, string> = {
	left: 'text-left',
	center: 'text-center',
	right: 'text-right',
}

export const PageHeader: FC<PageHeaderProps> = ({ children, right, align = 'left', withOverlay = true }) => {
	return (
		<div className={`bg-brand-900 pt-28 ${withOverlay ? '-mb-24 pb-40' : 'pb-28'}`}>
			<div className='container mx-auto flex items-center justify-between px-4'>
				<div className={`flex-auto ${alignmentClasses[align]}`}>{children}</div>
				{right && <div>{right}</div>}
			</div>
		</div>
	)
}
