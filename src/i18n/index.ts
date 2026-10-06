import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { en } from './locales/en';
import { ru } from './locales/ru';
import { az } from './locales/az';
import { SupportedLanguage, LanguageOption, TranslationSchema } from './types';

export const LANGUAGE_STORAGE_KEY = 'app_language';

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
  { code: 'az', name: 'Azerbaijani', nativeName: 'Azərbaycan dili', flag: '🇦🇿' },
];

export const resources = {
  en: { translation: en },
  ru: { translation: ru },
  az: { translation: az },
} as const;

// In-memory fallback for test environments or SSR where AsyncStorage native bridge is not available
const inMemoryStorage: Record<string, string> = {};

async function getStoredItem(key: string): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(key);
  } catch {
    return inMemoryStorage[key] || null;
  }
}

async function setStoredItem(key: string, value: string): Promise<void> {
  try {
    await AsyncStorage.setItem(key, value);
  } catch {
    inMemoryStorage[key] = value;
  }
}

// Initialize i18n with default language synchronously so the app can render immediately
i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // React Native handles XSS escaping
  },
  react: {
    useSuspense: false,
  },
});

/**
 * Loads the saved language preference from storage.
 * Falls back to 'en' if not set or invalid.
 */
export async function loadSavedLanguage(): Promise<SupportedLanguage> {
  try {
    const saved = await getStoredItem(LANGUAGE_STORAGE_KEY);
    if (saved && (saved === 'en' || saved === 'ru' || saved === 'az')) {
      return saved as SupportedLanguage;
    }
  } catch (error) {
    console.warn('[i18n] Failed to read saved language:', error);
  }
  return 'en';
}

/**
 * Changes the active language, updates storage, and causes reactive UI re-render.
 */
export async function changeLanguage(lang: SupportedLanguage): Promise<void> {
  try {
    await setStoredItem(LANGUAGE_STORAGE_KEY, lang);
    await i18n.changeLanguage(lang);
  } catch (error) {
    console.error('[i18n] Failed to save/switch language:', error);
    await i18n.changeLanguage(lang);
  }
}

/**
 * Initialize language from storage on app launch.
 */
export async function initI18n(): Promise<void> {
  const lang = await loadSavedLanguage();
  if (lang !== i18n.language) {
    await i18n.changeLanguage(lang);
  }
}

export * from './types';
export default i18n;
