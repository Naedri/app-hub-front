import type { IApp } from '../utils/interfaces/iapp';

const apps: IApp[] = [
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

export function getApps(): IApp[] {
  return sortApps(apps);
}

export function getApp(id: number): IApp | undefined {
  return apps.find((app) => app.id === id);
}

function sortApps(apps: IApp[]): IApp[] {
  return apps.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
}
