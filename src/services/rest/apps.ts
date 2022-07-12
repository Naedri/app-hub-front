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

async function discoverApps(token = '', id: number | undefined = undefined): Promise<AppsResponse> {
  Logger.info(logClassName, `discoverApps with token : ${token}.`);
  const config = configCredit;
  if (token) {
    config.headers = { Authorization: `Bearer ${token}` };
  }
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
  const appsP = discoverApps(token);
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

function getLocalApps(): Application[] | undefined {
  return sortApps(apps);
}

export { discoverApps, getAccess, getApps, getLocalApps };

const apps: Application[] = [
  {
    id: 9,
    name: 'DuckDuckGo',
    landingPage: 'https://duckduckgo.com/about',
    description: {
      en: 'To make you healthier',
      no: 'Claudine the cat',
    },
  },
  {
    id: 8,
    name: 'Bing',
    landingPage: 'https://en.wikipedia.org/wiki/Microsoft_Bing',
    description: {
      en: 'To make you stronger',
      no: 'Claudine the cat',
    },
    url: 'www.bing.com?appToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMxLCJyb2xlIjoiQ0xJRU5UIiwiYXBwSWQiOjgsInN1YlRva2VuVXVpZCI6IjNmODg4YjU0LWU3ZDMtNGE3MC05ZDFmLWVlMzljYzU3NGQ0MiIsImlhdCI6MTY1NzEyMzE5MCwiZXhwIjoxNjU3NzI3OTkwfQ.KUIRyeB-HoH0mvEk4dUo5pCVCfvXfl-sw8HvHVyrwWo',
  },
  {
    id: 7,
    name: 'Google',
    landingPage: 'https://about.google/',
    description: {
      en: 'To make you better',
      no: 'Claudine the cat',
    },
    url: 'www.google.com?appToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMxLCJyb2xlIjoiQ0xJRU5UIiwiYXBwSWQiOjcsInN1YlRva2VuVXVpZCI6Ijc4ZWE4ZThkLTdhZjctNGE1MC05MTllLTQ5NGJlNGUwZTJlMyIsImlhdCI6MTY1NzEyMzE4OSwiZXhwIjoxNjU3NzI3OTg5fQ.OnXSpsLIU0Z7foIB98Q-lOvizg2sdwup6BTJSxez1Sg',
  },
  {
    id: 11,
    name: 'Brave',
    description: {
      en: 'To make you braver',
    },
  },
  {
    id: 13,
    name: 'Explorer',
  },
];
