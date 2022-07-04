import { shallow } from 'enzyme';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import ChangeLanguage from './ChangeLanguage';

describe(' changelanguage specs', () => {
  const { t, i18n } = useTranslation(['auth']);

  it('should render as expected when passing required properties', () => {
    // Arrange
    const props = {
      i18n: i18n,
    };

    // Act
    const component = shallow(<ChangeLanguage {...props} />);

    // Assert
    expect(component).toMatchSnapshot();
  });
});
