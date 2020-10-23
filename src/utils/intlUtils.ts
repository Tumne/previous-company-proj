import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import messages from '../messages';
import { storageManager } from 'utils/storageUtils';

export const localeStorage = storageManager.createOrFetchStorage('locale');

export const isMatchingLocale = locale => localeStorage.get() === locale;
export const isEnCA = () => isMatchingLocale('en-CA');
export const isEnUS = () => isMatchingLocale('en-US');
export const isFrCA = () => isMatchingLocale('fr-CA');

/**
 * This bootSequence is what gets called before the app is rendered. It will try to see if we need to load the `Intl`
 * polyfill, load it if need be, load the extra necessary locale data for the lang to work, add the locale to storage
 * (handled inside `loadLocaleData`), and finally resolve a Promise with the locale code.
 */
export const bootSequence = (locale = 'en-CA') => {
  // TODO: loadIntlPolyfill()
  // TODO: loadLocaleData()

  return new Promise(resolve => {
    let currentLocale = localeStorage.get();

    if (!currentLocale) {
      currentLocale = locale;
      localeStorage.set(currentLocale);
    }

    i18next.use(initReactI18next).init({
      resources: messages,
      lng: currentLocale,
    });
    resolve(currentLocale);
  });
};
