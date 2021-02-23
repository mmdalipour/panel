import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';

/**
 * @icon DownArrow
 * @summary down arrow icon from 'Simple Small' icon group wrapped with material svg icon
 * @param {SvgIconProps}
 */
function DownArrow(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M12.16,16.11a1,1,0,0,1-.71-.3l-6-6a1,1,0,0,1,0-1.41,1,1,0,0,1,1.42,0l5.29,5.29L17.45,8.4a1,1,0,0,1,1.42,0,1,1,0,0,1,0,1.41l-6,6A1,1,0,0,1,12.16,16.11Z" />
    </SvgIcon>
  );
}

export default DownArrow;
