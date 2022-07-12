import axios from 'axios';
import jwt from 'jwt-decode';

import { Role } from '../../types/enums/roles';
import type { AuthResponse, UserResponse, UserToken } from '../../types/interfaces/rest';
import type { User } from '../../types/interfaces/user';
import { apiUrl } from '../../utils/constants';
import Logger from '../../utils/logger';

import { configCredit } from './config';

const logClassName = 'Service-Rest-Auth';

async function login({ email, password }: { email: string; password: string }): Promise<AuthResponse> {
  try {
    Logger.info(logClassName, `Login with email: ${email}, password: ${password}.`);
    const apiResponse = await axios.post(`${apiUrl}/auth/login`, { email, password }, configCredit);
    return { accessToken: apiResponse?.data?.accessToken, error: null };
  } catch (e: any) {
    Logger.error(logClassName, e.toString());
    return { accessToken: null, error: e };
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

function parseUserToken(content: string): User {
  Logger.info(logClassName, `parseUserToken with token : ${content}.`);
  const decodedContent = jwt(content) as UserToken;
  const user: User = {
    id: decodedContent.sub,
    role: Role[decodedContent.role as keyof typeof Role],
    token: content,
  };
  return user;
}

export { login, logout, register, getUserInfo, parseUserToken };
