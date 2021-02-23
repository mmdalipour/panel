import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';

/**
 * @icon ShutDown
 * @summary shut down icon from 'Simple Small' icon group wrapped with material svg icon
 * @param {SvgIconProps}
 */
function ShutDown(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M 10.5 1.5 L 10.5 10.5 L 12 10.5 L 12 1.5 Z M 9 1.769531 C 4.707031 2.792969 1.5 6.652344 1.5 11.25 C 1.5 16.628906 5.871094 21 11.25 21 C 16.628906 21 21 16.628906 21 11.25 C 21 6.652344 17.792969 2.792969 13.5 1.769531 L 13.5 3.324219 C 16.957031 4.308594 19.5 7.480469 19.5 11.25 C 19.5 15.800781 15.796875 19.5 11.25 19.5 C 6.703125 19.5 3 15.796875 3 11.25 C 3 7.480469 5.542969 4.300781 9 3.316406 Z M 9 1.769531 " />
    </SvgIcon>
  );
}

export default ShutDown;
