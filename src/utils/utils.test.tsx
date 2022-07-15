import type { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';

import { describeError } from './format';

const errorNetwork = {
  message: 'Network Error',
  name: 'AxiosError',
  config: {
    transitional: {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false,
    },
    timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    maxBodyLength: -1,

    headers: {
      Accept: 'application/json, text/plain, */*',
      'Access-Control-Allow-Origin': '*',
    },
    withCredentials: true,
    method: 'get',
    url: 'http://localhost:3100/apps/discover',
  },
  code: 'ERR_NETWORK',
  status: undefined,
};

test('utils - format - describeError', () => {
  const { t, i18n } = useTranslation('home');

  const expected = 'The following network error happened: network error (ERR_NETWORK)';
  const observed = describeError(t, errorNetwork as unknown as AxiosError);
  expect(observed).toBe(expected);
});
