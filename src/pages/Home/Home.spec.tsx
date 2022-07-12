import { shallow } from 'enzyme';
import * as React from 'react';

import { Role } from '../../types/enums/roles';

import type { HomeProps } from './Home';
import Home from './Home';

describe(' home specs', () => {
  it('should render as expected when passing required properties', () => {
    // Arrange
    const user: HomeProps = {
      role: Role.CLIENT,
      token: 'testToken',
    };

    // Act
    const component = shallow(<Home {...user} />);

    // Assert
    expect(component).toMatchSnapshot();
  });
});
