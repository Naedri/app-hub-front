import { shallow } from 'enzyme';
import * as React from 'react';

import Input from './Input';

describe(' input specs', () => {
  it('should render as expected when passing required properties', () => {
    // Arrange
    const props = {
      name: 'test name',
      label: 'test label',
    };

    // Act
    const component = shallow(<Input {...props} />);

    // Assert
    expect(component).toMatchSnapshot();
  });
});
