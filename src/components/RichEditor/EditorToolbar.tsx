// @ts-nocheck
import { ReactNode } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { colors, Theme } from '@material-ui/core';

// components
import Button, { ButtonProps } from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import { fade } from '@material-ui/core/styles/colorManipulator';

// icons
import CodeIcon from '@material-ui/icons/Code';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatUnderlined from '@material-ui/icons/FormatUnderlined';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';

// constants
import { SPACING_LEAST } from 'constants/spacing';

const useStyles1 = makeStyles((theme: Theme) => ({
  root: {},
  inner: {
    padding: theme.spacing(SPACING_LEAST),
    display: 'flex',
    alignItems: 'center',
  },
}));

const useStyles2 = makeStyles((theme: Theme) => ({
  button: {
    padding: 0,
    width: 32,
    height: 32,
    minWidth: 32,
    color: colors.blueGrey[600],
    '& + &': {
      marginLeft: theme.spacing(1),
    },
  },
  activeButton: {
    backgroundColor: fade(theme.palette.primary.main, 0.1),
    color: theme.palette.primary.main,
  },
}));

const BLOCK_TYPES = [
  {
    blockType: 'header-one',
    tooltip: 'Heading 1',
    text: 'H1',
  },
  {
    blockType: 'header-two',
    tooltip: 'Heading 2',
    text: 'H2',
  },
  {
    blockType: 'header-three',
    tooltip: 'Heading 3',
    text: 'H3',
  },
  {
    blockType: 'header-four',
    tooltip: 'Heading 4',
    text: 'H4',
  },
  {
    blockType: 'header-five',
    tooltip: 'Heading 5',
    text: 'H5',
  },
  {
    blockType: 'header-six',
    tooltip: 'Heading 6',
    text: 'H6',
  },
  {
    blockType: 'blockquote',
    tooltip: 'Blockquote',
    icon: FormatQuoteIcon,
  },
  {
    blockType: 'unordered-list-item',
    tooltip: 'Unordered list',
    icon: FormatListBulletedIcon,
  },
  {
    blockType: 'ordered-list-item',
    tooltip: 'Ordered list',
    icon: FormatListNumberedIcon,
  },
  {
    blockType: 'code-block',
    tooltip: 'Code Block',
    icon: CodeIcon,
  },
  {
    blockType: 'left',
    tooltip: 'Align left',
    icon: FormatAlignLeftIcon,
  },
  {
    blockType: 'center',
    tooltip: 'Align center',
    icon: FormatAlignCenterIcon,
  },
  {
    blockType: 'right',
    tooltip: 'Align right',
    icon: FormatAlignRightIcon,
  },
  {
    blockType: 'justify',
    tooltip: 'Justify',
    icon: FormatAlignJustifyIcon,
  },
];

const INLINE_STYLES = [
  {
    inlineStyle: 'BOLD',
    tooltip: 'Bold',
    icon: FormatBoldIcon,
  },
  {
    inlineStyle: 'ITALIC',
    tooltip: 'Italic',
    icon: FormatItalicIcon,
  },
  {
    inlineStyle: 'UNDERLINE',
    tooltip: 'Underline',
    icon: FormatUnderlined,
  },
  {
    inlineStyle: 'CODE',
    tooltip: 'Monospace',
    icon: CodeIcon,
  },
];

export type ButtonBaseProps = {
  active: boolean;
  tooltip: string;
  children: ReactNode;
  onClick?: () => any;
  rest: ButtonProps;
};

function ButtonBase({ active, tooltip, children, ...rest }: ButtonBaseProps) {
  const classes = useStyles2();

  return (
    <Tooltip title={tooltip}>
      <Button
        {...rest}
        className={clsx(classes.button, {
          [classes.activeButton]: active,
        })}
      >
        {children}
      </Button>
    </Tooltip>
  );
}

function BlockTypeButtons({ editorState, onToggle }: any) {
  const selection = editorState.getSelection();
  const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();
  const blockData = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getData();

  const handleClick = (event: any, value: any) => {
    event.preventDefault();
    onToggle('blockType', value);
  };

  return (
    <>
      {BLOCK_TYPES.map((button) => {
        let active = false;

        if (['left', 'center', 'right', 'justify'].includes(button.blockType)) {
          active = blockData.get('text-align') === button.blockType;
        } else {
          active = button.blockType === blockType;
        }

        return (
          <ButtonBase
            active={active}
            key={button.blockType}
            onClick={(event: any) => handleClick(event, button.blockType)}
            tooltip={button.tooltip}
          >
            {button.icon ? <button.icon /> : button.text}
          </ButtonBase>
        );
      })}
    </>
  );
}

const InlineStyleButtons = (props: any) => {
  const { editorState, onToggle } = props;

  const handleClick = (event: any, inlineStyle: string): void => {
    event.preventDefault();
    onToggle('inlineStyle', inlineStyle);
  };

  const currentStyle = editorState.getCurrentInlineStyle();

  return (
    <>
      {INLINE_STYLES.map((button: any) => (
        <ButtonBase
          active={currentStyle.has(button.inlineStyle)}
          key={button.inlineStyle}
          onClick={(event: any) => handleClick(event, button.inlineStyle)}
          tooltip={button.tooltip}
        >
          {button.icon ? <button.icon /> : button.text}
        </ButtonBase>
      ))}
    </>
  );
};

export type EditorToolbarProps = {
  editorState: any;
  onToggle: () => void;
  className: string;
  rest: any;
};

function EditorToolbar({ editorState, onToggle, className, ...rest }: EditorToolbarProps) {
  const classes = useStyles1();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div className={classes.inner}>
        <BlockTypeButtons editorState={editorState} onToggle={onToggle} />
        <InlineStyleButtons editorState={editorState} onToggle={onToggle} />
      </div>
    </div>
  );
}

export default EditorToolbar;
