import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';

/**
 * @icon Calendar
 * @param {SvgIconProps}
 */
function Calendar(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M19,3H17V2a1,1,0,0,0-2,0V3H9V2A1,1,0,0,0,7,2V3H5A3,3,0,0,0,2,6V20a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V6A3,3,0,0,0,19,3ZM4,6A1,1,0,0,1,5,5H7V6A1,1,0,0,0,9,6V5h6V6a1,1,0,0,0,2,0V5h2a1,1,0,0,1,1,1V9H4ZM20,20a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V11H20Z" />
    </SvgIcon>
  );
}

export default Calendar;
