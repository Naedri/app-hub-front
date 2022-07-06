import { shallow } from 'enzyme';
import * as React from 'react';

import Home from './Home';

describe(' home specs', () => {
  it('should render as expected when passing required properties', () => {
    // Act
    const component = shallow(<Home />);

    // Assert
    expect(component).toMatchSnapshot();
  });
});
