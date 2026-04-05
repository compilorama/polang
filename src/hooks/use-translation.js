import { useContext } from 'react';
import i18nContext from '@src/contexts/i18n';

export const useTranslation = translations => {
  const { locale } = useContext(i18nContext);
  const translate = key => translations[locale][key];
  return { t: translate };
};
