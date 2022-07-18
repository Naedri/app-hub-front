import { shallow } from 'enzyme';
import { t } from 'i18next';
import * as React from 'react';

import Menu from './Menu';

describe(' Menu specs', () => {
  it('should render as expected when passing required properties', () => {
    // Arrange
    // Arrange
    const props = {
      t: t,
      contentId: 'main-content',
    };
    // Act
    const component = shallow(<Menu {...props} />);

    // Assert
    expect(component).toMatchSnapshot();
  });
});
