export interface AppContextState {
  user: User;
  isConnected: boolean;
}

export enum AppAction {
  setUser = 'setUser',
  setConnected = 'setConnected',
}

export interface AppContextAction extends AppContextState {
  type: AppAction;
}
