import { useContext, useState, createContext, SetStateAction, ReactNode, Dispatch } from 'react';

import { ThemePalette, Direction } from 'themes';

export type Language = 'fa' | 'en';

export type Settings = {
  theme: ThemePalette;
  dir: Direction;
  lang: Language;
};
type ProviderProps = {
  children: ReactNode;
};

const defaultValue: Settings = {
  dir: 'rtl',
  lang: 'en',
  theme: 'defaultTheme',
};

// initialize setting context
const SettingsContextValue = createContext<Settings>(defaultValue);
const SettingsContextSetState = createContext<Dispatch<SetStateAction<Settings>>>(() => null);

/**
 * @provider SettingsProvider
 * @summary setting provider use this at top of the react tree to get setting data on every level
 * @param {ReactNode} children
 */
function SettingsProvider({ children }: ProviderProps) {
  const [setting, setSettings] = useState<Settings>(defaultValue);
  return (
    <SettingsContextValue.Provider value={setting}>
      <SettingsContextSetState.Provider value={setSettings}>{children}</SettingsContextSetState.Provider>
    </SettingsContextValue.Provider>
  );
}

/**
 * @function useSettingsState
 * @summary returns setting state and setting set state just like out trusty useState
 * @returns {UseSettingsStateType} tuple of setting and setSettings
 */
export type UseSettingsStateType = [Settings, Dispatch<SetStateAction<Settings>>];
function useSettingsState() {
  const setting = useContext(SettingsContextValue);
  const setSettings = useContext(SettingsContextSetState);
  const state: UseSettingsStateType = [setting, setSettings];
  return state;
}

/**
 * @function useSettingsValue
 * @summary returns setting state
 * @returns {Settings} setting
 */
function useSettingsValue(): Settings {
  const setting = useContext(SettingsContextValue);
  return setting;
}

/**
 * @function useSettingsSetState
 * @summary returns setting set state
 * @returns {Dispatch<SetStateAction<Settings>>} setSettings
 */
function useSettingsSetState(): Dispatch<SetStateAction<Settings>> | null {
  const setSettings = useContext(SettingsContextSetState);
  return setSettings;
}

export { SettingsProvider, useSettingsState, useSettingsValue, useSettingsSetState };
