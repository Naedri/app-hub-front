import type { i18n } from 'i18next';

import { getAccess } from '../services/rest/apps';
import type { Application, PrivateApplication } from '../types/interfaces/application';

import Logger from './logger';

/**
 * Application
 */
export const getDescription = (app: Application, i18n: i18n): React.ReactNode => {
  // if (!app?.description) return t('noDescription');
  if (!app?.description) return undefined;
  return app.description[i18n.language] ? app.description[i18n.language] : app.description['en'];
};

export async function getAccessUrl(token: string, app: Application): Promise<string | undefined> {
  try {
    const appP: PrivateApplication = app as unknown as PrivateApplication;
    if (appP?.baseURL) {
      Logger.info(`AppItem-${app.id}`, appP?.baseURL);
      return (await getAccess(token, app))?.accessUrl;
    } else {
      Logger.error(`AppItem-${app.id}`, 'missing baseURL attribute');
      Logger.warn(`AppItem-${app.id}`, JSON.stringify(appP));
    }
  } catch (error) {
    Logger.error(`AppItem-${app.id}`, 'impossible conversion from Application to PrivateApplication');
    Logger.warn(`AppItem-${app.id}`, JSON.stringify(app));
  }
}
