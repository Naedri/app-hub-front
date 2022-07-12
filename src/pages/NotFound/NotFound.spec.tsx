import { shallow } from 'enzyme';
import * as React from 'react';

import NotFound from './NotFound';

describe(' notFound specs', () => {
  it('should render as expected when passing required properties', () => {
    // Act
    const component = shallow(<NotFound />);

    // Assert
    expect(component).toMatchSnapshot();
  });
});
