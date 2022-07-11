import type { User } from '../../utils/interfaces/user';

export interface UserState {
  isLoggedIn: boolean;
  user?: User;
  darkMode: boolean;
  loading: boolean;
}
