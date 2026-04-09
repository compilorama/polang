import { useContext } from 'react';
import i18nContext from '@src/contexts/i18n';

export const LocaleSelect = props => {
  const { locale, locales, handleLocaleChange } = useContext(i18nContext);
  const handleChange = ({ target: { value } }) => handleLocaleChange(value);

  return (
    <select
      name="locale"
      {...props}
      value={locale.code}
      onChange={handleChange}
    >
      {locales?.map(({ code, name }) => (
        <option key={code} value={code}>{name}</option>
      ))}
    </select>
  );
};
