import type { Reducer } from 'react';
import React, { createContext, useReducer } from 'react';

import type { AppContextAction, AppContextState } from '../utils/interfaces/context.app';
import { AppAction } from '../utils/interfaces/context.app';
import Logger from '../utils/logger';

const initialState: AppContextState = {
  user: undefined,
  isConnected: false,
};

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
  };
  const [state, dispatch] = useReducer(reducerWithLogger, fullInitialState);
  const value = { state, dispatch };

  return <AppContext.Provider value={value.state}>{props.children}</AppContext.Provider>;
};

const AppContextConsumer = AppContext.Consumer;

export { AppContext, AppContextProvider, AppContextConsumer };
