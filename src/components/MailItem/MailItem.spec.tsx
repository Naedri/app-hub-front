import { shallow } from 'enzyme';
import * as React from 'react';

import MailItem from './MailItem';

describe(' Mail item specs', () => {
  it('should render as expected when passing required properties', () => {
    // Arrange
    const props = {
      label: 'test label',
      key: '1',
    };

    // Act
    const component = shallow(<MailItem {...props} />);

    // Assert
    expect(component).toMatchSnapshot();
  });
});
