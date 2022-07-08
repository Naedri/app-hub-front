import type { AxiosRequestConfig } from 'axios';

export const configCredit: AxiosRequestConfig = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
};
