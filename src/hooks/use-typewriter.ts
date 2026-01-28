import { useEffect, useRef, useState } from 'react'

interface UseTypewriterOptions {
	phrases: string[]
	typeSpeed?: number
	deleteSpeed?: number
	pauseDelay?: number
}

export function useTypewriter({ phrases, typeSpeed = 70, deleteSpeed = 40, pauseDelay = 2000 }: UseTypewriterOptions) {
	const [text, setText] = useState('')
	const phraseIndex = useRef(0)
	const charIndex = useRef(0)
	const isDeleting = useRef(false)

	useEffect(() => {
		const type = () => {
			const current = phrases[phraseIndex.current]

			if (!isDeleting.current) {
				charIndex.current++
				setText(current.slice(0, charIndex.current))

				if (charIndex.current === current.length) {
					isDeleting.current = true
					return pauseDelay
				}
				return typeSpeed
			} else {
				charIndex.current--
				setText(current.slice(0, charIndex.current))

				if (charIndex.current === 0) {
					isDeleting.current = false
					phraseIndex.current = (phraseIndex.current + 1) % phrases.length
				}
				return deleteSpeed
			}
		}

		let timeout: ReturnType<typeof setTimeout>
		const loop = () => {
			const delay = type()
			timeout = setTimeout(loop, delay)
		}

		timeout = setTimeout(loop, typeSpeed)
		return () => clearTimeout(timeout)
	}, [phrases, typeSpeed, deleteSpeed, pauseDelay])

	return text
}
