import { upperCase } from 'lodash';

/**
 * @function getAppName
 * @returns application name
 */
export function getAppName() {
  return upperCase(process.env.REACT_APP_NAME);
}
