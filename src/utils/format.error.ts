import type { AxiosError } from 'axios';

import type { ErrorClient, ErrorFromServer } from '../types/interfaces/error';

import { capitalizeFirstLetter } from './format.case';

/**
 * ERROR
 */

const codeMap = {
  ERR_FR_TOO_MANY_REDIRECTS: 601,
  ERR_BAD_OPTION_VALUE: 602,
  ERR_BAD_OPTION: 603,
  ERR_NETWORK: 604,
  ERR_DEPRECATED: 605,
  ERR_BAD_RESPONSE: 606,
  ERR_BAD_REQUEST: 607,
  ERR_CANCELED: 608,
  ECONNABORTED: 609,
  ETIMEDOUT: 610,
};
const keys = Object.keys(codeMap);

/**
 * To translate the description of an error received from a server
 * @param t from i18n useTranslation
 * @param error
 * @returns
 */
export function describeServerError(t: (...args: any) => string, error: ErrorFromServer): string {
  return t('errorServerDescription', {
    description: t(`${error?.code}`, 'unknownDescription'),
    code: error?.code,
    ns: 'error',
  });
}

/**
 * To translate the description of an error raised by the client
 * @param t from i18n useTranslation
 * @param error
 * @returns
 */
export function describeClientError(t: (...args: any) => string, error: ErrorClient): string {
  return t('errorClientDescription', {
    description: t(`client${capitalizeFirstLetter(error.key)}`, 'unknownDescription'),
    ns: 'error',
  });
}

export function formatError(error: AxiosError): ErrorFromServer {
  let code: number | undefined;
  if (error?.code && keys.includes(error?.code)) {
    //https://stackoverflow.com/a/69198602
    code = codeMap[error?.code as keyof typeof codeMap];
  } else {
    if (error?.code != undefined) {
      code = error?.code as unknown as number;
    } else {
      code = undefined;
    }
  }
  return {
    code: code,
    message: error.message,
    config: {
      withCredentials: error.config.withCredentials,
    },
  };
}
