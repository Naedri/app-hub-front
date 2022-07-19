/* eslint-disable @typescript-eslint/no-unused-vars */
import { shallow } from 'enzyme';
import * as React from 'react';

import type { UncontrolledInputProps } from './UncontrolledInput';

describe(' uncontrolledinput specs', () => {
  it('should render as expected when passing required properties', () => {
    // Arrange
    const props: UncontrolledInputProps = {
      id: 'testInput-1',
      name: 'testInput',
      label: 'Test',
    };

    //TODO uncomment
    // Act
    // const component = shallow(<UncontrolledInput {...props} />);

    // Assert
    // expect(component).toMatchSnapshot();
  });
});
