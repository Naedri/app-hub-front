import type { Page } from '../types/enums/pages';

import { uncapitalizeFirstLetter } from './format.case';

/**
 * I18
 */

export function mapPageToTitle(page: Page): string {
  return `${uncapitalizeFirstLetter(page)}PageTitle`;
}
