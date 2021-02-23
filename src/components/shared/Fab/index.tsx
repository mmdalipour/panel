import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

// constants
import { SPACING } from 'constants/spacing';

// components
import FabCore, { FabProps as FabCoreProps } from '@material-ui/core/Fab';
import Box from '@material-ui/core/Box';

export type FabProps = {
  to: string;
  children: ReactNode;
} & FabCoreProps;
/**
 * @component Fab
 * @summary shared Fab
 */
function Fab({ to, children, ...rest }: FabProps) {
  return (
    <Box position="fixed" bottom={5} right={5} padding={SPACING}>
      <Link to={to}>
        <FabCore color="primary" {...rest}>
          {children}
        </FabCore>
      </Link>
    </Box>
  );
}

export default Fab;
