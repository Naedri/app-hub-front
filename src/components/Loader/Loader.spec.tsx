import { shallow } from 'enzyme';
import * as React from 'react';

import Loader from './Loader';

describe(' loader specs', () => {
  it('should render as expected when passing required properties', () => {
    // Arrange
    const props = {
      text: 'test text',
    };

    // Act
    const component = shallow(<Loader {...props} />);

    // Assert
    expect(component).toMatchSnapshot();
  });
});
