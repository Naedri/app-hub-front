import type { Role } from '../utils/enums/roles';
import type { User } from '../utils/interfaces/user';

const CREDENTIALS_STORAGE = 'user_ms_users';

export function useUserStorage(): {
  saveUserInStorage: (user: User | undefined) => void;
  cleanStorage: () => void;
  getToken: () => string | undefined;
  getUserEmail: () => string | undefined;
  getUserRole: () => Role | undefined;
} {
  const cleanStorage = (): void => {
    localStorage.removeItem(CREDENTIALS_STORAGE);
  };

  const saveUserInStorage = (user: User | undefined): void => {
    localStorage.setItem(CREDENTIALS_STORAGE, JSON.stringify(user));
  };

  const getUser = () => {
    const rawUser = localStorage.getItem(CREDENTIALS_STORAGE);
    if (rawUser != undefined) {
      return JSON.parse(rawUser) as User;
    }
  };

  const getToken = (): string | undefined => {
    return getUser()?.token;
  };

  const getUserEmail = (): string | undefined => {
    return getUser()?.email;
  };

  const getUserRole = (): Role | undefined => {
    return getUser()?.role;
  };

  return {
    saveUserInStorage,
    cleanStorage,
    getToken,
    getUserEmail,
    getUserRole,
  };
}
