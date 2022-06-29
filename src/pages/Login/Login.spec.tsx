import { shallow } from 'enzyme';
import * as React from 'react';

import Login from './Login';

describe(' login specs', () => {
  it('should render as expected when passing required properties', () => {
    // Act
    const component = shallow(<Login />);

    // Assert
    expect(component).toMatchSnapshot();
  });
});
