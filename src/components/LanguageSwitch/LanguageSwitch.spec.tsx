import { shallow } from 'enzyme';
import * as React from 'react';

import { Language } from '../../utils/enums/languages';

import LanguageSwitch from './LanguageSwitch';

describe(' languageswitch specs', () => {
  it('should render as expected when passing required properties', () => {
    // Arrange
    const props = {
      langs: [Language.en, Language.no],
    };

    // Act
    const component = shallow(<LanguageSwitch {...props} />);

    // Assert
    expect(component).toMatchSnapshot();
  });
});
