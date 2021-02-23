import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';

/**
 * @icon Menu
 * @summary menu icon from 'Simple Small' icon group wrapped with material svg icon
 * @param {SvgIconProps}
 */
function Menu(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M 1.5 3 L 1.5 4.5 L 21 4.5 L 21 3 Z M 1.5 10.5 L 1.5 12 L 21 12 L 21 10.5 Z M 1.5 18 L 1.5 19.5 L 21 19.5 L 21 18 Z M 1.5 18 " />
    </SvgIcon>
  );
}

export default Menu;
