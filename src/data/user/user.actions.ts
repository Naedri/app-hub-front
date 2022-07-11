/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import type { ActionType } from '../../utils/interfaces/context.type';
import type { User } from '../../utils/interfaces/user';
import { getUserData, setIsLoggedInData, setUserData } from '../dataApi';

import type { UserState } from './user.state';

export const loadUserData =
  () =>
  async (dispatch: React.Dispatch<any>): Promise<void> => {
    dispatch(setLoading(true));
    const data = await getUserData();
    dispatch(setData(data));
    dispatch(setLoading(false));
  };

export const setLoading = (isLoading: boolean) =>
  ({
    type: 'set-user-loading',
    isLoading,
  } as const);

export const setData = (data: Partial<UserState>) =>
  ({
    type: 'set-user-data',
    data,
  } as const);

export const logoutUser =
  () =>
  async (dispatch: React.Dispatch<any>): Promise<void> => {
    await setIsLoggedInData(false);
    dispatch(setUser());
  };

export const setIsLoggedIn = (loggedIn: boolean) => async (_dispatch: React.Dispatch<any>) => {
  await setIsLoggedInData(loggedIn);
  return {
    type: 'set-is-logged-in',
    loggedIn,
  } as const;
};

export const setUser = (user?: User) => async (_dispatch: React.Dispatch<any>) => {
  await setUserData(user);
  return {
    type: 'set-user',
    user: user,
  } as const;
};

export const setDarkMode = (darkMode: boolean) =>
  ({
    type: 'set-dark-mode',
    darkMode,
  } as const);

export type UserActions =
  | ActionType<typeof setLoading>
  | ActionType<typeof setData>
  | ActionType<typeof setIsLoggedIn>
  | ActionType<typeof setUser>
  | ActionType<typeof setDarkMode>;
