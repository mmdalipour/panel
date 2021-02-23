import { useContext, useState, createContext, SetStateAction, ReactNode, Dispatch, useEffect } from 'react';

export type user = {};
type ContextProps = user;
type ProviderProps = {
  children: ReactNode;
  user?: user;
};

const defualtValue: user = {};

// initialize user context
const UserContextValue = createContext<ContextProps>(defualtValue);
const UserContextSetState = createContext<Dispatch<SetStateAction<ContextProps>>>(() => null);

/**
 * @provider UserProvider
 * @summary user provider use this at top of the react tree to get user data on every level
 * @param {ReactNode} children
 */
function UserProvider({ children, user = defualtValue }: ProviderProps) {
  const [_user, setUser] = useState<ContextProps>(user);

  useEffect(() => {
    setUser(user);
  }, [user]);

  return (
    <UserContextValue.Provider value={_user}>
      <UserContextSetState.Provider value={setUser}>{children}</UserContextSetState.Provider>
    </UserContextValue.Provider>
  );
}

/**
 * @function useUserState
 * @summary returns user state and user set state just like out trusty useState
 * @returns {UserUsersStateType} tuple of user and setUser
 */
export type UseUserStateType = [Partial<user>, Dispatch<SetStateAction<user>>];
function useUserState() {
  const user = useContext(UserContextValue);
  const setUser = useContext(UserContextSetState);
  const state: UseUserStateType = [user, setUser];
  return state;
}

/**
 * @function useUserValue
 * @summary returns user state as partial
 * @returns {Partial<user>} user
 */
function useUserValue(): Partial<user> {
  const user = useContext(UserContextValue);
  return user;
}

/**
 * @function useUserSetState
 * @summary returns user set state
 * @returns {SetStateAction<user>} setUser
 */
function useUserSetState(): Dispatch<SetStateAction<user>> {
  const setUser = useContext(UserContextSetState);
  return setUser;
}

export { UserProvider, useUserState, useUserValue, useUserSetState };
