import { shallow } from 'enzyme';
import * as React from 'react';

import AppListNoItem from './AppListNoItem';

describe(' applistnoitem specs', () => {
  it('should render as expected when passing required properties', () => {
    // Arrange
    const props = {
      title: 'test name',
    };

    // Act
    const component = shallow(<AppListNoItem {...props} />);

    // Assert
    expect(component).toMatchSnapshot();
  });
});
