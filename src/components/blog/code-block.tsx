import type { FC } from 'react'
import { useEffect, useState } from 'react'

import { type BundledLanguage, codeToHtml } from 'shiki'

interface CodeBlockProps {
	code: string
	language: string
	filename?: string
	highlightLines?: number[]
}

function escapeHtml(text: string): string {
	return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export const CodeBlock: FC<CodeBlockProps> = ({ code, language, filename, highlightLines = [] }) => {
	const [html, setHtml] = useState<string>('')
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const highlight = async () => {
			try {
				const highlighted = await codeToHtml(code, {
					lang: language as BundledLanguage,
					themes: {
						light: 'github-light',
						dark: 'github-dark',
					},
					defaultColor: false,
				})
				setHtml(highlighted)
			} catch {
				// Fallback for unsupported languages
				setHtml(`<pre><code>${escapeHtml(code)}</code></pre>`)
			} finally {
				setIsLoading(false)
			}
		}
		highlight()
	}, [code, language, highlightLines])

	if (isLoading) {
		return (
			<div className='my-8 animate-pulse rounded-xl bg-secondary p-4'>
				<div className='h-32 rounded bg-tertiary' />
			</div>
		)
	}

	return (
		<figure className='my-8 overflow-hidden rounded-xl border border-secondary'>
			{filename && (
				<div className='flex items-center gap-2 border-b border-secondary bg-tertiary px-4 py-2'>
					<div className='flex gap-1.5'>
						<span className='size-3 rounded-full bg-error-400' />
						<span className='size-3 rounded-full bg-warning-400' />
						<span className='size-3 rounded-full bg-success-400' />
					</div>
					<span className='ml-2 font-mono text-sm text-secondary'>{filename}</span>
				</div>
			)}
			<div
				className='overflow-x-auto bg-secondary p-4 text-sm [&_pre]:!m-0 [&_pre]:!bg-transparent [&_pre]:!p-0'
				dangerouslySetInnerHTML={{ __html: html }}
			/>
		</figure>
	)
}
