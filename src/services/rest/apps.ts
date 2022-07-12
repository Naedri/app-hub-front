import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';

import type { Access } from '../../types/interfaces/access';
import type { Application } from '../../types/interfaces/application';
import type { AccessResponse, AppsResponse } from '../../types/interfaces/rest';
import { apiUrl } from '../../utils/constants';
import Logger from '../../utils/logger';

import { configCredit } from './config';

const logClassName = 'Service-Rest-Apps';

function sortApps(apps: Application[] | undefined): Application[] | undefined {
  return apps?.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
}

async function discoverApps(id: number | undefined = undefined): Promise<AppsResponse> {
  Logger.info(logClassName, `discoverApps.`);
  const config = configCredit;
  try {
    let apiResponse: AxiosRequestConfig<Application[]>;
    if (id) {
      apiResponse = await axios.get(`${apiUrl}/apps/discover/${id}`, config);
      return { apps: [apiResponse.data], error: null };
    }
    apiResponse = await axios.get(`${apiUrl}/apps/discover`, config);
    return { apps: sortApps(apiResponse.data), error: null };
  } catch (e: any) {
    Logger.error(logClassName, e.toString());
    return { apps: undefined, error: e };
  }
}

async function getAccess(token = '', id: number | undefined = undefined): Promise<AccessResponse> {
  Logger.info(logClassName, `getAccess with token : ${token}.`);
  const config = configCredit;
  if (token) {
    config.headers = { Authorization: `Bearer ${token}` };
  }
  try {
    let apiResponse: AxiosRequestConfig<AccessResponse[]>;
    if (id) {
      apiResponse = await axios.get(`${apiUrl}/subs/myAccess/${id}`, config);
      return { access: [apiResponse.data], error: null };
    }
    apiResponse = await axios.get(`${apiUrl}/subs/myAccess`, config);
    return { access: [apiResponse.data], error: null };
  } catch (e: any) {
    Logger.error(logClassName, e.toString());
    return { access: undefined, error: e };
  }
}

async function getApps(token: string): Promise<Application[] | undefined> {
  const accessP = getAccess(token);
  const appsP = discoverApps();
  const resolve = await Promise.all([appsP, accessP]);
  const apps = resolve[0].apps;
  if (!resolve[1].access) {
    return apps;
  }
  if (apps) {
    const access = accessToMap(resolve[1].access);
    Object.keys(access).forEach((appId: string) => {
      apps.find((app) => app.id == appId).url = access[appId];
    });
    return apps;
  }
  return undefined;
}

function accessToMap(access: Access[]): { [key: string]: string } {
  const myHash: { [key: string]: string } = {};

  access.forEach((element) => {
    const appId = element.appId.toString();
    myHash[appId] = element.url;
  });
  return myHash;
}

export { discoverApps, getAccess, getApps };
