import { shallow } from 'enzyme';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { Language } from '../../utils/enums/languages';

import LanguageSwitch from './LanguageSwitch';

describe(' languageswitch specs', () => {
  const { t, i18n } = useTranslation(['auth']);

  it('should render as expected when passing required properties', () => {
    // Arrange
    const props = {
      i18n: i18n,
      headerTitle: t('languageModify'),
    };

    // Act
    const component = shallow(<LanguageSwitch {...props} />);

    // Assert
    expect(component).toMatchSnapshot();
  });
});
