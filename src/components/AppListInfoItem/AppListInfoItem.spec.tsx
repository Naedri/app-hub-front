import { shallow } from 'enzyme';
import * as React from 'react';

import AppListInfoItem from './AppListInfoItem';

describe(' applistinfoitem specs', () => {
  it('should render as expected when passing required properties', () => {
    // Arrange
    const props = {
      textTitle: 'test name',
    };

    // Act
    const component = shallow(<AppListInfoItem {...props} />);

    // Assert
    expect(component).toMatchSnapshot();
  });
});
