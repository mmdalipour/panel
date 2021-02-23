import { fade } from '@material-ui/core/styles';

import createPalette from '@material-ui/core/styles/createPalette';

const palette = createPalette({
  type: 'dark',
  primary: {
    main: '#80acff',
    contrastText: '#fff',
  },
  secondary: {
    main: '#9ad4ff',
  },
  divider: fade('#E6E9F4', 0.1),
  text: {
    primary: '#E6E9F4',
    secondary: '#9198A2',
    disabled: '#D7DBEC',
  },
  error: {
    main: '#f67282',
  },
  warning: {
    main: '#DFC57B',
  },
  success: {
    main: '#7ae6c3',
  },
  background: {
    default: '#1B2635',
    paper: '#233044',
  },
  sideBar: {
    background: '#233044',
    color: '#FFF',
    footer: {
      background: '#1B2635',
      color: '#FFF',
    },
    actions: {
      selected: '#1B2635',
    },
  },

  appBar: {
    background: '#233044',
    color: '#FFF',
  },
});

export default palette;
