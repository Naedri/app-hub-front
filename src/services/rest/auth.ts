import axios from 'axios';

import { apiUrl } from '../../utils/constants';
import type { UserResponse } from '../../utils/interfaces/rest';

const withCredConfig = { withCredentials: true };

async function login({ email, password }: { email: string; password: string }): Promise<UserResponse> {
  try {
    const apiResponse = await axios.post(`${apiUrl}/auth/login`, { email, password }, withCredConfig);
    return { user: apiResponse.data, error: null };
  } catch (e) {
    console.log(e);
    return { user: null, error: e };
  }
}

async function logout(): Promise<{ success: boolean; error: Error | null }> {
  try {
    await axios.post(`${apiUrl}/auth/logout`, {}, withCredConfig);
    return { success: true, error: null };
  } catch (e) {
    return { success: false, error: e as Error };
  }
}

async function register({ email, password }: { email: string; password: string }): Promise<UserResponse> {
  try {
    const apiResponse = await axios.post(
      `${apiUrl}/auth/register`,
      {
        email,
        password,
      },
      withCredConfig
    );
    return { user: apiResponse.data, error: null };
  } catch (e) {
    return { user: null, error: e };
  }
}

async function getUserInfo(token = null): Promise<UserResponse> {
  const config: any = withCredConfig;
  if (token) {
    config.headers = { Cookie: `token=${token}` };
  }
  try {
    const apiResponse = await axios.get(`${apiUrl}/auth/me`, config);
    return { user: apiResponse.data, error: null };
  } catch (e) {
    return { user: null, error: e };
  }
}

export { login, logout, register, getUserInfo };
