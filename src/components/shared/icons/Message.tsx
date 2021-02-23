import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';

/**
 * @icon Message
 * @summary down arrow icon from 'Simple Small' icon group wrapped with material svg icon
 * @param {SvgIconProps}
 */
function Message(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M 3.75 3 C 2.511719 3 1.5 4.011719 1.5 5.25 L 1.5 17.25 C 1.5 18.488281 2.511719 19.5 3.75 19.5 L 20.25 19.5 C 21.488281 19.5 22.5 18.488281 22.5 17.25 L 22.5 5.25 C 22.5 4.011719 21.488281 3 20.25 3 Z M 3.75 4.5 L 20.25 4.5 C 20.300781 4.5 20.34375 4.519531 20.390625 4.527344 L 12 10.335938 L 3.609375 4.527344 C 3.65625 4.519531 3.699219 4.5 3.75 4.5 Z M 3 5.929688 L 12 12.164062 L 21 5.929688 L 21 17.25 C 21 17.671875 20.671875 18 20.25 18 L 3.75 18 C 3.328125 18 3 17.671875 3 17.25 Z M 3 5.929688 " />
    </SvgIcon>
  );
}

export default Message;
