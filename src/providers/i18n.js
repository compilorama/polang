import I18n from '@src/contexts/i18n';

export const I18nProvider = ({ children, initialLocale }) => {
  const value = {
    locale: initialLocale
  };

  return (
    <I18n.Provider value={value}>
      {children}
    </I18n.Provider>
  );
};
