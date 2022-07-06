import { shallow } from 'enzyme';
import * as React from 'react';

import HelpButton from './HelpButton';

describe(' helpbutton specs', () => {
  it('should render as expected when passing required properties', () => {
    // Act
    const component = shallow(<HelpButton />);

    // Assert
    expect(component).toMatchSnapshot();
  });
});
