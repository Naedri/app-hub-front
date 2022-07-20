import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';

import type { Access } from '../../types/interfaces/access';
import type { Application, PrivateApplication, PublicApplication } from '../../types/interfaces/application';
import type {
  PrivateAppResponse,
  AccessResponse,
  PublicAppResponse,
  AppResponse,
  AccessUrlResponse,
} from '../../types/interfaces/rest';
import { apiUrl } from '../../utils/constants';
import Logger from '../../utils/logger';

import { configCredit } from './config';

const logClassName = 'Service-Rest-Apps';

async function getPublicApps(id = 0): Promise<PublicAppResponse> {
  Logger.info(logClassName, `getPublicApps with id: ${id}.`);
  const config = configCredit;
  try {
    let apiResponse: AxiosRequestConfig<Application[]>;
    if (id) {
      apiResponse = await axios.get(`${apiUrl}/apps/discover/${id}`, config);
      return { apps: [apiResponse.data as unknown as PublicApplication], error: null };
    }
    apiResponse = await axios.get(`${apiUrl}/apps/discover`, config);
    return { apps: apiResponse.data as unknown as PublicApplication[], error: null };
  } catch (e: any) {
    Logger.error(logClassName, e.toString());
    return { apps: undefined, error: e };
  }
}

async function getPrivateApps(token = '', id = 0): Promise<PrivateAppResponse> {
  const accessResponse = await getPrivateAccess(token, id);
  if (accessResponse?.access != undefined) {
    const accesses = accessResponse.access;
    const apps: PrivateApplication[] = [];
    accesses.forEach((access) => {
      apps.push(access.application);
    });
    return { apps: apps, error: null };
  } else {
    return { apps: undefined, error: accessResponse.error };
  }
}

async function getPrivateAccess(token = '', id = 0): Promise<AccessResponse> {
  if (token) Logger.info(logClassName, `getPrivateAccess with token: ${token} and id: ${id}.`);
  const config = configCredit;
  if (token) {
    config.headers = { Authorization: `Bearer ${token}` };
  }
  try {
    let apiResponse: AxiosRequestConfig<Access[]>;
    if (id) {
      apiResponse = await axios.get(`${apiUrl}/subs/myaccess/${id}`, config);
      return { access: [apiResponse.data as unknown as Access], error: null };
    }
    apiResponse = await axios.get(`${apiUrl}/subs/myaccess`, config);
    return { access: apiResponse.data as unknown as Access[], error: null };
  } catch (e: any) {
    Logger.error(logClassName, e.toString());
    return { access: undefined, error: e };
  }
}

async function getApps(token = ''): Promise<AppResponse> {
  if (token) Logger.info(logClassName, `getApps with token : ${token}.`);
  const result: AppResponse = {
    apps: [],
    error: undefined,
  };

  let privateApp: PrivateApplication[] | undefined;
  let privateAppP: Promise<PrivateAppResponse>;

  let publicApp: PublicApplication[] | undefined;
  const publicAppP = getPublicApps();

  if (token) {
    privateAppP = getPrivateApps(token);
    const resolve = await Promise.all([privateAppP, publicAppP]);
    privateApp = resolve[0]?.apps;
    publicApp = resolve[1]?.apps;
    result.error = resolve[0]?.error;
  } else {
    privateApp = [];
    const resolve = await Promise.resolve(publicAppP);
    publicApp = resolve?.apps;
    result.error = resolve?.error;
  }

  if (privateApp == undefined) {
    Logger.warn(logClassName, `getApps with undefined privateApp.`);
    privateApp = [];
  }
  if (publicApp == undefined) {
    Logger.warn(logClassName, `getApps with undefined publicApp.`);
    publicApp = [];
  }

  result.apps = sort(removeDuplicate(privateApp, publicApp));
  return result;
}

/**
 * Sorting by the name
 * @param apps
 * @returns
 */
function sort(apps: Application[]): Application[] {
  return apps?.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
}

function removeDuplicate(privateApp: PrivateApplication[], publicApp: PublicApplication[]): Application[] {
  const uniquePr = [...new Set<Application>(privateApp)];
  const mapPr = new Map<number, Application>(uniquePr.map((obj) => [obj.id, obj]));

  const uniquePu = [...new Set<Application>(publicApp)];
  const uniquePuF = uniquePu.filter((value) => !mapPr.has(value.id));

  return [...uniquePr, ...uniquePuF];
}

async function getAccess(token: string, app: Application): Promise<AccessUrlResponse> {
  Logger.info(logClassName, `getAccess with token : ${token} and for app: ${JSON.stringify(app)}.`);
  const config = configCredit;
  config.headers = { Authorization: `Bearer ${token}` };
  try {
    const apiResponse = await axios.get(`${apiUrl}/subs/myaccess/url/${app.id}`, config);
    return { accessUrl: apiResponse.data?.accessUrlTokenized as unknown as string, error: null };
  } catch (e: any) {
    Logger.error(logClassName, e.toString());
    return { accessUrl: undefined, error: e };
  }
}

export { getApps, getAccess };
