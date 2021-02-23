import { ReactNode } from 'react';

import { StylesProvider as Provider, jssPreset } from '@material-ui/core/styles';
import { create } from 'jss';
import rtl from 'jss-rtl';

// configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

export type StylesProviderProps = {
  children: ReactNode;
};

/**
 * @provider StylesProvider
 * @summary support for both rtl and ltr
 */
function StylesProvider(props: StylesProviderProps) {
  return <Provider jss={jss}>{props.children}</Provider>;
}

export { StylesProvider };
