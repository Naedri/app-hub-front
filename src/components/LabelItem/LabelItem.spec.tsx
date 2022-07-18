import { shallow } from 'enzyme';
import * as React from 'react';

import LabelItem from './LabelItem';

describe(' Label item specs', () => {
  it('should render as expected when passing required properties', () => {
    // Arrange
    const props = {
      text: 'label text',
    };

    // Act
    const component = shallow(<LabelItem {...props} />);

    // Assert
    expect(component).toMatchSnapshot();
  });
});
