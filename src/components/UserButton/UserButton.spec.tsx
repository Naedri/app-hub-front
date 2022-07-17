import { shallow } from 'enzyme';
import * as React from 'react';

import UserButton from './UserButton';

describe(' User button specs', () => {
  it('should render as expected when passing required properties', () => {
    // Arrange
    const props = {
      disabled: false,
      logged: false,
      textLogin: 'Logout',
      textLogout: 'Login',
    };

    // Act
    const component = shallow(<UserButton {...props} />);

    // Assert
    expect(component).toMatchSnapshot();
  });
});
