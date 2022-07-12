import axios from 'axios';

import type { UserResponse } from '../../types/interfaces/rest';
import { apiUrl } from '../../utils/constants';
import Logger from '../../utils/logger';

import { configCredit } from './config';

const logClassName = 'Service-Rest-Auth';

async function login({ email, password }: { email: string; password: string }): Promise<UserResponse> {
  try {
    Logger.info(logClassName, `Login with email: ${email}, password: ${password}.`);
    const apiResponse = await axios.post(`${apiUrl}/auth/login`, { email, password }, configCredit);
    return { user: apiResponse.data, error: null };
  } catch (e: any) {
    Logger.error(logClassName, e.toString());
    return { user: null, error: e };
  }
}

async function logout(): Promise<{ success: boolean; error: Error | null }> {
  try {
    Logger.info(logClassName, `Logout.`);
    await axios.post(`${apiUrl}/auth/logout`, {}, configCredit);
    return { success: true, error: null };
  } catch (e: any) {
    Logger.error(logClassName, e.toString());
    return { success: false, error: e as Error };
  }
}

async function register({ email, password }: { email: string; password: string }): Promise<UserResponse> {
  try {
    Logger.info(logClassName, `Register with email: ${email}, password: ${password}.`);
    const apiResponse = await axios.post(
      `${apiUrl}/auth/register`,
      {
        email,
        password,
      },
      configCredit
    );
    return { user: apiResponse.data, error: null };
  } catch (e: any) {
    Logger.error(logClassName, e.toString());
    return { user: null, error: e };
  }
}

async function getUserInfo(token = ''): Promise<UserResponse> {
  Logger.info(logClassName, `getUserInfo with token : ${token}.`);
  const config: any = configCredit;
  if (token) {
    config.headers = { Authorization: `Bearer ${token}` };
  }
  try {
    const apiResponse = await axios.get(`${apiUrl}/auth/me`, config);
    return { user: apiResponse.data, error: null };
  } catch (e: any) {
    Logger.error(logClassName, e.toString());
    return { user: null, error: e };
  }
}

export { login, logout, register, getUserInfo };
