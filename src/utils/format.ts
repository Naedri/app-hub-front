import type { AxiosError } from 'axios';

export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * To translate the description of an error
 * @param t from i18n useTranslation
 * @param error
 * @returns
 */
export function describeError(t: (...args: any) => string, error: AxiosError): string {
  return t('errorDescription', {
    description: t(`${error?.code}`, 'unknownDescription'),
    code: error?.code,
    ns: 'error',
  });
}
