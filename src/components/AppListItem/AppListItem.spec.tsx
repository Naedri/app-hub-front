import { shallow } from 'enzyme';
import * as React from 'react';

import AppListItem from './AppListItem';

describe(' applistitem specs', () => {
  it('should render as expected when passing required properties', () => {
    // Arrange
    const app = {
      id: 9,
      name: 'DuckDuckGo',
      landingPage: 'https://duckduckgo.com/about',
      description: {
        en: 'To make you healthier',
        no: 'Claudine the cat',
      },
      isPublic: false,
    };

    // Act
    const component = shallow(<AppListItem app={app} />);

    // Assert
    expect(component).toMatchSnapshot();
  });
});
