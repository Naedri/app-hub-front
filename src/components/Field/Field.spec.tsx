import { shallow } from 'enzyme';
import * as React from 'react';

import Field from './Field';

describe(' field specs', () => {
  it('should render as expected when passing required properties', () => {
    // Arrange
    const props = {
      children: undefined,
    };

    // Act
    const component = shallow(<Field {...props} />);

    // Assert
    expect(component).toMatchSnapshot();
  });
});
