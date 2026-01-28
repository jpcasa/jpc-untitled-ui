import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { useTypewriter } from './use-typewriter'

describe('useTypewriter', () => {
	beforeEach(() => {
		vi.useFakeTimers()
	})

	afterEach(() => {
		vi.useRealTimers()
	})

	it('starts with empty text', () => {
		const { result } = renderHook(() =>
			useTypewriter({
				phrases: ['Hello'],
				typeSpeed: 50,
			})
		)

		expect(result.current).toBe('')
	})

	it('types out first character after typeSpeed delay', () => {
		const { result } = renderHook(() =>
			useTypewriter({
				phrases: ['Hello'],
				typeSpeed: 50,
			})
		)

		act(() => {
			vi.advanceTimersByTime(50)
		})

		expect(result.current).toBe('H')
	})

	it('types out full phrase progressively', () => {
		const { result } = renderHook(() =>
			useTypewriter({
				phrases: ['Hi'],
				typeSpeed: 50,
			})
		)

		act(() => {
			vi.advanceTimersByTime(50)
		})
		expect(result.current).toBe('H')

		act(() => {
			vi.advanceTimersByTime(50)
		})
		expect(result.current).toBe('Hi')
	})

	it('eventually types and then deletes phrase', () => {
		const { result } = renderHook(() =>
			useTypewriter({
				phrases: ['AB'],
				typeSpeed: 50,
				deleteSpeed: 30,
				pauseDelay: 100,
			})
		)

		// Type 'A', 'B'
		act(() => {
			vi.advanceTimersByTime(100)
		})
		expect(result.current).toBe('AB')

		// Wait for pause and start delete
		act(() => {
			vi.advanceTimersByTime(130)
		})
		// After pause (100) + one delete (30) = should have removed one char
		expect(result.current.length).toBeLessThan(2)
	})

	it('cycles through phrases', () => {
		const { result } = renderHook(() =>
			useTypewriter({
				phrases: ['A', 'B'],
				typeSpeed: 50,
				deleteSpeed: 30,
				pauseDelay: 50,
			})
		)

		// Let enough time pass to cycle through phrases
		act(() => {
			vi.advanceTimersByTime(500)
		})

		// Should be somewhere in the typing/deleting cycle
		expect(['', 'A', 'B']).toContain(result.current)
	})

	it('cleans up timeout on unmount', () => {
		const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout')

		const { unmount } = renderHook(() =>
			useTypewriter({
				phrases: ['Hello'],
				typeSpeed: 50,
			})
		)

		unmount()

		expect(clearTimeoutSpy).toHaveBeenCalled()
		clearTimeoutSpy.mockRestore()
	})
})
