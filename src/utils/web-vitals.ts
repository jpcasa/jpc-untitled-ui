/**
 * Web Vitals monitoring utility
 * Tracks Core Web Vitals metrics for performance monitoring
 */

export interface WebVitalMetric {
	name: 'CLS' | 'FCP' | 'LCP' | 'TTFB' | 'INP'
	value: number
	rating: 'good' | 'needs-improvement' | 'poor'
	delta: number
	id: string
}

type MetricHandler = (metric: WebVitalMetric) => void

// Thresholds based on Google's Core Web Vitals
const thresholds = {
	CLS: { good: 0.1, poor: 0.25 },
	FCP: { good: 1800, poor: 3000 },
	LCP: { good: 2500, poor: 4000 },
	TTFB: { good: 800, poor: 1800 },
	INP: { good: 200, poor: 500 },
}

function getRating(name: keyof typeof thresholds, value: number): WebVitalMetric['rating'] {
	if (value <= thresholds[name].good) return 'good'
	if (value <= thresholds[name].poor) return 'needs-improvement'
	return 'poor'
}

function generateId(): string {
	return `v${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

/**
 * Observe Cumulative Layout Shift (CLS)
 */
function observeCLS(onMetric: MetricHandler): void {
	if (!('PerformanceObserver' in window)) return

	let clsValue = 0
	let clsEntries: PerformanceEntry[] = []

	const observer = new PerformanceObserver((list) => {
		for (const entry of list.getEntries()) {
			// Only count layout shifts without recent user input
			if (!(entry as PerformanceEntry & { hadRecentInput: boolean }).hadRecentInput) {
				clsValue += (entry as PerformanceEntry & { value: number }).value
				clsEntries.push(entry)
			}
		}
	})

	observer.observe({ type: 'layout-shift', buffered: true })

	// Report on page hide
	document.addEventListener(
		'visibilitychange',
		() => {
			if (document.visibilityState === 'hidden' && clsEntries.length > 0) {
				onMetric({
					name: 'CLS',
					value: clsValue,
					rating: getRating('CLS', clsValue),
					delta: clsValue,
					id: generateId(),
				})
			}
		},
		{ once: true }
	)
}

/**
 * Observe First Contentful Paint (FCP)
 */
function observeFCP(onMetric: MetricHandler): void {
	if (!('PerformanceObserver' in window)) return

	const observer = new PerformanceObserver((list) => {
		for (const entry of list.getEntries()) {
			if (entry.name === 'first-contentful-paint') {
				const value = entry.startTime
				onMetric({
					name: 'FCP',
					value,
					rating: getRating('FCP', value),
					delta: value,
					id: generateId(),
				})
				observer.disconnect()
			}
		}
	})

	observer.observe({ type: 'paint', buffered: true })
}

/**
 * Observe Largest Contentful Paint (LCP)
 */
function observeLCP(onMetric: MetricHandler): void {
	if (!('PerformanceObserver' in window)) return

	let lcpValue = 0

	const observer = new PerformanceObserver((list) => {
		const entries = list.getEntries()
		const lastEntry = entries[entries.length - 1]
		if (lastEntry) {
			lcpValue = lastEntry.startTime
		}
	})

	observer.observe({ type: 'largest-contentful-paint', buffered: true })

	// Report on page hide or when user interacts
	const reportLCP = () => {
		if (lcpValue > 0) {
			onMetric({
				name: 'LCP',
				value: lcpValue,
				rating: getRating('LCP', lcpValue),
				delta: lcpValue,
				id: generateId(),
			})
			observer.disconnect()
		}
	}

	document.addEventListener('visibilitychange', reportLCP, { once: true })
	document.addEventListener('keydown', reportLCP, { once: true })
	document.addEventListener('click', reportLCP, { once: true })
}

/**
 * Observe Time to First Byte (TTFB)
 */
function observeTTFB(onMetric: MetricHandler): void {
	if (!('PerformanceObserver' in window)) return

	const observer = new PerformanceObserver((list) => {
		for (const entry of list.getEntries()) {
			const navEntry = entry as PerformanceNavigationTiming
			const value = navEntry.responseStart - navEntry.requestStart
			if (value > 0) {
				onMetric({
					name: 'TTFB',
					value,
					rating: getRating('TTFB', value),
					delta: value,
					id: generateId(),
				})
			}
		}
	})

	observer.observe({ type: 'navigation', buffered: true })
}

/**
 * Observe Interaction to Next Paint (INP)
 */
function observeINP(onMetric: MetricHandler): void {
	if (!('PerformanceObserver' in window)) return

	let maxINP = 0

	const observer = new PerformanceObserver((list) => {
		for (const entry of list.getEntries()) {
			const duration = (entry as PerformanceEntry & { duration: number }).duration
			if (duration > maxINP) {
				maxINP = duration
			}
		}
	})

	try {
		observer.observe({ type: 'event', buffered: true })
	} catch {
		// event type not supported in all browsers
		return
	}

	// Report on page hide
	document.addEventListener(
		'visibilitychange',
		() => {
			if (document.visibilityState === 'hidden' && maxINP > 0) {
				onMetric({
					name: 'INP',
					value: maxINP,
					rating: getRating('INP', maxINP),
					delta: maxINP,
					id: generateId(),
				})
			}
		},
		{ once: true }
	)
}

/**
 * Initialize Web Vitals monitoring
 * @param onMetric Callback function called when a metric is recorded
 */
export function initWebVitals(onMetric?: MetricHandler): void {
	const handler: MetricHandler =
		onMetric ||
		((metric) => {
			// Default: log to console in development
			if (import.meta.env.DEV) {
				const color =
					metric.rating === 'good' ? '#0cce6b' : metric.rating === 'needs-improvement' ? '#ffa400' : '#ff4e42'
				console.log(
					`%c[Web Vitals] ${metric.name}: ${metric.value.toFixed(2)} (${metric.rating})`,
					`color: ${color}; font-weight: bold;`
				)
			}
		})

	observeCLS(handler)
	observeFCP(handler)
	observeLCP(handler)
	observeTTFB(handler)
	observeINP(handler)
}
