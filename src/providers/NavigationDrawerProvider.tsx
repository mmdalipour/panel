import { useContext, useState, createContext, SetStateAction, ReactNode, Dispatch } from 'react';

type ProviderProps = {
  children: ReactNode;
};

// initialize navigationDrawer context
const NavigationDrawerContextValue = createContext<boolean>(false);
const NavigationDrawerContextSetState = createContext<Dispatch<SetStateAction<boolean>>>(() => null);

/**
 * @provider NavigationDrawerProvider
 * @summary navigationDrawer provider use this at top of the react tree to get navigationDrawer data on every level
 * @param {ReactNode} children
 */
function NavigationDrawerProvider({ children }: ProviderProps) {
  const [navigationDrawer, setNavigationDrawer] = useState<boolean>(false);
  return (
    <NavigationDrawerContextValue.Provider value={navigationDrawer}>
      <NavigationDrawerContextSetState.Provider value={setNavigationDrawer}>{children}</NavigationDrawerContextSetState.Provider>
    </NavigationDrawerContextValue.Provider>
  );
}

/**
 * @function useNavigationDrawerState
 * @summary returns navigationDrawer state and navigationDrawer set state just like out trusty useState
 * @returns {[boolean, Dispatch<SetStateAction<boolean>>]} tuple of navigationDrawer and setNavigationDrawer
 */
export type UseNavigationDrawerStateType = [boolean, Dispatch<SetStateAction<boolean>>];
function useNavigationDrawerState() {
  const navigationDrawer = useContext(NavigationDrawerContextValue);
  const setNavigationDrawer = useContext(NavigationDrawerContextSetState);
  const state: UseNavigationDrawerStateType = [navigationDrawer, setNavigationDrawer];
  return state;
}

/**
 * @function useNavigationDrawerValue
 * @summary returns navigationDrawer state as partial
 * @returns {boolean} navigationDrawer
 */
function useNavigationDrawerValue(): boolean {
  const navigationDrawer = useContext(NavigationDrawerContextValue);
  return navigationDrawer;
}

/**
 * @function useNavigationDrawerSetState
 * @summary returns navigationDrawer set state
 * @returns {Dispatch<SetStateAction<boolean>>} setNavigationDrawer
 */
function useNavigationDrawerSetState(): Dispatch<SetStateAction<boolean>> {
  const setNavigationDrawer = useContext(NavigationDrawerContextSetState);
  return setNavigationDrawer;
}

export { NavigationDrawerProvider, useNavigationDrawerState, useNavigationDrawerValue, useNavigationDrawerSetState };
