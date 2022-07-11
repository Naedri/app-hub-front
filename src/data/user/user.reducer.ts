import type { UserActions } from './user.actions';
import type { UserState } from './user.state';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function userReducer(state: UserState, action: UserActions) {
  switch (action.type) {
    case 'set-user-loading':
      return { ...state, loading: action.isLoading };
    case 'set-user-data':
      return { ...state, ...action.data };
    case 'set-dark-mode':
      return { ...state, darkMode: action.darkMode };
    case 'set-user':
      return { ...state, user: action.user };
    case 'set-is-logged-in':
      return { ...state, isLoggedIn: action.loggedIn };
  }
}
