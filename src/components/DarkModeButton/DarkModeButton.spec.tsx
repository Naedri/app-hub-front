import { shallow } from 'enzyme';
import * as React from 'react';

import DarkModeButton from './DarkModeButton';

describe(' darkmodebutton specs', () => {
  it('should render as expected when passing required properties', () => {
    // Act
    const component = shallow(<DarkModeButton />);

    // Assert
    expect(component).toMatchSnapshot();
  });
});
