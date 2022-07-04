import { shallow } from 'enzyme';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import Header from './Header';

describe(' header specs', () => {
  it('should render as expected when passing required properties', () => {
    const { t, i18n } = useTranslation(['auth']);

    // Arrange
    const props = {
      pageTitle: 'Test title',
      i18n: i18n,
      t: t,
    };

    // Act
    const component = shallow(<Header {...props} />);

    // Assert
    expect(component).toMatchSnapshot();
  });
});
