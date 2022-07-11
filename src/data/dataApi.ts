import { get, remove, set } from '../services/storage';
import type { User } from '../utils/interfaces/user';

const HAS_LOGGED_IN = 'hasLoggedIn';
const USER = 'user';

export const getUserData = async (): Promise<{
  isLoggedIn: boolean;
  user: User;
}> => {
  const response = await Promise.all([get(HAS_LOGGED_IN), get(USER)]);
  const isLoggedIn = (await response[0].value) === 'true';
  const user = (await response[1].value) || undefined;
  const data = {
    isLoggedIn,
    user,
  };
  return data;
};

export const setIsLoggedInData = async (isLoggedIn: boolean): Promise<void> => {
  await set(HAS_LOGGED_IN, JSON.stringify(isLoggedIn));
};

export const setUserData = async (user?: User): Promise<void> => {
  if (!user) {
    await remove(USER);
  } else {
    await set(USER, user);
  }
};
