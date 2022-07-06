import { shallow } from 'enzyme';
import * as React from 'react';

import AppListItem from './AppListItem';

describe(' applistitem specs', () => {
  it('should render as expected when passing required properties', () => {
    // Arrange
    const props = {
      id: 9,
      name: 'DuckDuckGo',
      landingPage: 'https://duckduckgo.com/about',
      description: {
        en: 'To make you healthier',
        no: 'Claudine the cat',
      },
    };

    // Act
    const component = shallow(<AppListItem app={props} />);

    // Assert
    expect(component).toMatchSnapshot();
  });
});
