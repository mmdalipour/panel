import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';

/**
 * @icon Logo
 * @summary menu icon from 'Simple Small' icon group wrapped with material svg icon
 * @param {SvgIconProps}
 */
function Logo(props: SvgIconProps) {
  return (
    <SvgIcon {...props} style={{ fontSize: 48 }}>
      <path
        fill="#dd2c00"
        d="M 19.5 14 C 19.5 18.199219 16.199219 21.5 12 21.5 C 7.800781 21.5 4.5 18.199219 4.5 14 C 4.5 9.800781 11.25 6.300781 10.5 2.5 C 12 2.5 19.5 7.898438 19.5 14 Z M 19.5 14 "
      />
      <path
        fill="#ff5722"
        d="M 16.5 16 C 16.5 12.199219 12 8.5 12 8.5 C 12 11.550781 7.5 12.949219 7.5 16 C 7.5 18.5 9.5 20.5 12 20.5 C 14.5 20.5 16.5 18.5 16.5 16 Z M 16.5 16 "
      />
      <path
        fill="#ffc107"
        d="M 9.5 17.699219 C 9.5 16 12 15 12 13.5 C 12 13.5 14.5 15.398438 14.5 17.699219 C 14.5 18.949219 13.398438 20 12 20 C 10.601562 20 9.5 18.949219 9.5 17.699219 Z M 9.5 17.699219 "
      />
    </SvgIcon>
  );
}

export default Logo;
