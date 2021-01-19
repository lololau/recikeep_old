import i18n from 'i18next';
import translationEN from './locales/en/translation.json';
import translationFR from './locales/fr/translation.json';
import { initReactI18next } from 'react-i18next';

export const resources = {
    en: {
        translation: translationEN
    },
    fr: {
        translation: translationFR
    }
} as const;

i18n.use(initReactI18next)
    .init({
        lng: 'fr',
        resources,
    });

export default i18n;