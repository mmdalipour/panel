import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';

/**
 * @icon RightArrow
 * @summary Right arrow icon from 'Simple Small' icon group wrapped with material svg icon
 * @param {SvgIconProps}
 */
function RightArrow(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M9.4,19.1a1,1,0,0,1-.7-1.71L14,12.1,8.7,6.81a1,1,0,0,1,0-1.42,1,1,0,0,1,1.41,0l6,6a1,1,0,0,1,.29.71,1,1,0,0,1-.29.71l-6,6A1,1,0,0,1,9.4,19.1Z" />
    </SvgIcon>
  );
}

export default RightArrow;
