import { shallow } from 'enzyme';
import * as React from 'react';

import Page404 from './Page404';

describe(' page404 specs', () => {
  it('should render as expected when passing required properties', () => {
    // Act
    const component = shallow(<Page404 />);

    // Assert
    expect(component).toMatchSnapshot();
  });
});
