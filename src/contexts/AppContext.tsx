import type { Reducer } from 'react';
import React, { useEffect, createContext, useReducer } from 'react';

import { get, set } from '../services/storage';
import type { AppContextAction, AppContextState } from '../utils/interfaces/context.app';
import { AppAction } from '../utils/interfaces/context.app';
import Logger from '../utils/logger';

const initialState: AppContextState = {
  user: undefined,
  isConnected: false,
};

const persistedState = { user: get('user') };

const reducer: Reducer<AppContextState, AppContextAction> = (state: AppContextState, action: AppContextAction) => {
  switch (action.type) {
    case AppAction.setUser: {
      return { ...state, user: action.user };
    }
    case AppAction.setConnected: {
      return { ...state, isConnected: action.isConnected };
    }
    default: {
      return state;
    }
  }
};

const reducerWithLogger = (state: AppContextState, action: AppContextAction) => {
  Logger.reducer(state.toString(), action.toString(), reducer(state, action).toString());
  return reducer(state, action);
};

const AppContext = createContext<AppContextState>(initialState);

const AppContextProvider: React.FC = (props) => {
  const fullInitialState = {
    ...initialState,
    ...persistedState,
  };
  const [state, dispatch] = useReducer(reducerWithLogger, fullInitialState);

  useEffect(() => {
    // Persist any state we want to
    set('user', JSON.stringify({ user: state.user }));
  }, [state]);

  const value = { state, dispatch };

  return <AppContext.Provider value={value.state}>{props.children}</AppContext.Provider>;
};

const AppContextConsumer = AppContext.Consumer;

export { AppContext, AppContextProvider, AppContextConsumer };
