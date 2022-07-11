import React, { useEffect, createContext, useReducer } from 'react';

import type { AppState } from '../data/app.state';
import { reducers, initialState } from '../data/app.state';
import { get, set } from '../services/storage';
import type { AppContextAction } from '../utils/interfaces/context.app';
import Logger from '../utils/logger';

export interface AppContextState {
  state: AppState;
  dispatch: React.Dispatch<any>;
}

export const AppContext = createContext<AppContextState>({
  state: initialState,
  dispatch: () => undefined,
});

const persistedState = { user: get('user') };

const reducerWithLogger = (state: AppContextState, action: AppContextAction) => {
  Logger.reducer(state.toString(), action.toString(), reducers(state, action).toString());
  return reducers(state, action);
};

export const AppContextProvider: React.FC = (props) => {
  const fullInitialState = {
    ...initialState,
    ...persistedState,
  };
  const [store, dispatch] = useReducer(reducerWithLogger, fullInitialState);

  useEffect(() => {
    // Persist any state we want to
    set('user', JSON.stringify({ user: store.user }));
  }, [store]);

  return (
    <AppContext.Provider
      value={{
        state: store,
        dispatch,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
