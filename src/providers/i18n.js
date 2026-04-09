import I18n from '@src/contexts/i18n';
import { useLocale } from '@src/hooks/use-locale';

export const I18nProvider = ({ children, locales }) => {
  const { locale, handleLocaleChange } = useLocale(locales);

  return (
    <I18n.Provider value={{ locale, locales, handleLocaleChange }}>
      {children}
    </I18n.Provider>
  );
};
