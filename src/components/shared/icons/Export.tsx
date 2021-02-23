import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';

/**
 * @icon Export
 * @summary down arrow icon from 'Simple Small' icon group wrapped with material svg icon
 * @param {SvgIconProps}
 */
function Export(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M 3.75 1.5 C 2.515625 1.5 1.5 2.515625 1.5 3.75 L 1.5 18.75 C 1.5 19.984375 2.515625 21 3.75 21 L 18.75 21 C 19.984375 21 21 19.984375 21 18.75 L 21 16.5 L 19.5 16.5 L 19.5 18.75 C 19.5 19.171875 19.171875 19.5 18.75 19.5 L 3.75 19.5 C 3.328125 19.5 3 19.171875 3 18.75 L 3 3.75 C 3 3.328125 3.328125 3 3.75 3 L 18.75 3 C 19.171875 3 19.5 3.328125 19.5 3.75 L 19.5 6 L 21 6 L 21 3.75 C 21 2.515625 19.984375 1.5 18.75 1.5 Z M 16.09375 6.03125 L 15.03125 7.09375 L 18.441406 10.5 L 7.5 10.5 L 7.5 12 L 18.441406 12 L 15.03125 15.40625 L 16.09375 16.46875 L 21.308594 11.25 Z M 16.09375 6.03125 " />
    </SvgIcon>
  );
}

export default Export;
