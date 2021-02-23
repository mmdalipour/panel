import createPalette from '@material-ui/core/styles/createPalette';

const palette = createPalette({
  type: 'light',
  primary: {
    main: '#0058FF',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#57B8FF',
    contrastText: '#FFFFFF',
  },
  divider: '#E6E9F4',
  text: {
    primary: '#233044',
    secondary: '#9198A2',
    disabled: '#D7DBEC',
  },
  error: {
    main: '#F0142F',
  },
  warning: {
    main: '#FFC700',
  },
  success: {
    main: '#21D59B',
  },
  background: {
    default: '#F7F9FC',
    paper: '#FFFFFF',
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
    background: '#FFF',
    color: '#233044',
  },
});

export default palette;
