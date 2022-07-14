/**
 *
 * @source https://gist.github.com/tattali/e56383dbca18322af7a4f3204bd6eddc
 * @source https://gist.github.com/jhonatasmatos/bd01a16054d6b4a7feaa362f3d1a9318
 * @source https://stackoverflow.com/a/54667477
 */

import type { Dispatch, SetStateAction, PropsWithChildren } from 'react';
import React, { createContext, useState } from 'react';

import { Role } from '../types/enums/roles';
import type { User } from '../types/interfaces/user';
import Logger from '../utils/logger';

const className = 'User-context';

//interface
export interface UserContextState {
  user?: User;
}
export interface UserContextProps {
  stateUser: UserContextState;
  dispatchUser: React.Dispatch<React.SetStateAction<UserContextState>>;
}

// default value
const defaultState: UserContextState = {
  user: {
    id: 0,
    role: Role.CLIENT,
  },
};
const defaultDispatch: Dispatch<SetStateAction<UserContextState>> = () => defaultState;
const defaultContext: UserContextProps = {
  stateUser: defaultState,
  dispatchUser: defaultDispatch,
};

// context and associated provider
export const UserContext = createContext(defaultContext);

export const UserContextProvider: React.FC = (props: PropsWithChildren<unknown>) => {
  const [stateUser, dispatchUser] = useState(defaultState);
  const value: UserContextProps = { stateUser, dispatchUser };
  Logger.info(className, `Current state : ${JSON.stringify(stateUser)}`);

  return <UserContext.Provider value={value}>{props.children}</UserContext.Provider>;
};
