import type { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';

import type { ErrorFromServer } from '../types/interfaces/error';

import { describeServerError, formatError } from './format.error';

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

test('utils - format - formatError', () => {
  const error = errorNetwork;
  const expected = {
    status: error.status,
    code: 601,
    message: error.message,
    config: {
      withCredentials: error.config.withCredentials,
    },
  };
  const observed = formatError(error as unknown as AxiosError);
  expect(observed).toBe(expected);
});

test('utils - format - describeServerError', () => {
  const { t } = useTranslation('home');

  const error = errorNetwork;
  const expected = 'The following network error happened: network error (ERR_NETWORK)';
  const observed = describeServerError(t, error as unknown as ErrorFromServer);
  expect(observed).toBe(expected);
});
