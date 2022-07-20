import { shallow } from 'enzyme';
import * as React from 'react';

import type { UserButtonProps } from './UserButton';
import UserButton from './UserButton';

describe(' User button specs', () => {
  it('should render as expected when passing required properties', () => {
    // Arrange
    const props: UserButtonProps = {
      connected: false,
    };

    // Act
    const component = shallow(<UserButton {...props} />);

    // Assert
    expect(component).toMatchSnapshot();
  });
});
