// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

// react-testing-library renders your components to document.body,
// this adds jest-dom's custom assertions
import '@testing-library/jest-dom';

const queries = {
  small: '(max-width: 599px)',
  medium: '(min-width: 600px) and (max-width: 1023px)',
  large: '(min-width: 1024px)',
  screen: 'only screen',
};

const matchMedia = (match: any) => (query: string) => {
  return {
    matches: query === match || query === queries.screen,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
};

describe('<MediaManager />', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('window.matchMedia', () => {
    test('setup - event listeners and initial state', () => {
      window.matchMedia = jest.fn().mockImplementation(matchMedia(queries['small']));
    });
  });
});
