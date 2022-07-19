import { shallow } from 'enzyme';
import * as React from 'react';

import ItemAlert from './ItemAlert';

describe(' Item alert specs', () => {
  it('should render as expected when passing required properties', () => {
    // Arrange
    const props = {
      title: 'test name',
    };

    // Act
    const component = shallow(<ItemAlert {...props} />);

    // Assert
    expect(component).toMatchSnapshot();
  });
});
