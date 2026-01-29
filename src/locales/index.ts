import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import en from './en.json'
import es from './es.json'
import fr from './fr.json'
import pt from './pt.json'

export const languages = [
	{ code: 'en', name: 'English', shortName: 'En' },
	{ code: 'es', name: 'Español', shortName: 'Es' },
	{ code: 'fr', name: 'Français', shortName: 'Fr' },
	{ code: 'pt', name: 'Português', shortName: 'Pt' },
] as const

export type LanguageCode = (typeof languages)[number]['code']

const resources = {
	en: { translation: en },
	es: { translation: es },
	fr: { translation: fr },
	pt: { translation: pt },
}

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources,
		fallbackLng: 'en',
		debug: import.meta.env.DEV,
		interpolation: {
			escapeValue: false,
		},
		detection: {
			order: ['localStorage', 'navigator'],
			caches: ['localStorage'],
			lookupLocalStorage: 'ui-language',
		},
	})

export default i18n
