import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';

/**
 * @icon Bell
 * @param {SvgIconProps}
 */
function Bell(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M20.93,18h-18a1,1,0,0,1-.55-1.83S4.93,14.27,4.93,8a7,7,0,0,1,14,0c0,6.27,2.54,8.16,2.57,8.18a1,1,0,0,1,.38,1.12A1,1,0,0,1,20.93,18ZM5.07,16H18.79a15.05,15.05,0,0,1-1.86-8,5,5,0,0,0-10,0A15.05,15.05,0,0,1,5.07,16Z" />
      <path d="M11.92,23a2.89,2.89,0,0,1-1.49-.41A2.85,2.85,0,0,1,9.34,21.5a1,1,0,0,1,1.72-1,1,1,0,0,0,.37.36,1,1,0,0,0,1.37-.36,1,1,0,1,1,1.72,1A3,3,0,0,1,11.92,23Z" />
    </SvgIcon>
  );
}

export default Bell;
