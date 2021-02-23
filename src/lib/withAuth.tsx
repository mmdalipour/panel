import { ComponentType, ReactNode } from 'react';

// lib
import { getAuthCookie } from './Storage';

// constants
import PAGES from 'constants/pages';

// components
import Redirect from 'components/Redirect';

/**
 * @function withAuth
 * @summary auth hoc, use this with every page you want to protect. will redirect to auth page if user does not exists
 * @param {ComponentType<T>} Component
 */
function withAuth<T>(Component: ComponentType<T>) {
  return function WrappedWithAuth(props: T) {
    const auth = getAuthCookie();

    return !!auth?.accessToken ? <Component {...props} /> : <Redirect to={PAGES.AUTH} />;
  };
}

export default withAuth;
