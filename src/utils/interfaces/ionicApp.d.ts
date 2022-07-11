import type { setIsLoggedIn, setUser, loadUserData } from './data/user/user.actions';

interface StateProps {
  darkMode: boolean;
  schedule: Schedule;
}

interface DispatchProps {
  loadConfData: typeof loadConfData;
  loadUserData: typeof loadUserData;
  setIsLoggedIn: typeof setIsLoggedIn;
  setUser: typeof setUser;
}

export interface IonicAppProps extends StateProps, DispatchProps {}
