import { shallow } from 'enzyme';
import * as React from 'react';

import Form from './Form';

describe(' form specs', () => {
  it('should render as expected when passing required properties', () => {
    // Arrange
    const props = {
      children: undefined,
    };

    // Act
    const component = shallow(<Form {...props} />);

    // Assert
    expect(component).toMatchSnapshot();
  });
});
