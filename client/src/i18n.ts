// Dependencies
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
// Translation files
import translationEN from './locales/en/translation.json';
import translationFR from './locales/fr/translation.json';

export const resources = {
    en: {
        translation: translationEN,
    },
    fr: {
        translation: translationFR,
    },
} as const;

// Display french language initially
i18n.use(initReactI18next).init({
    lng: 'fr',
    resources,
});

export default i18n;
