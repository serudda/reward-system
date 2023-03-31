import '../styles/globals.css';
import type { AppType } from 'next/app';
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

import { api } from '~/utils/api';
import { ToastProvider } from '~/common';
import { ToastContainer, ToastPlacement } from '~/components';

const MyApp: AppType<{ session: Session | null }> = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <SessionProvider session={session}>
      <ToastProvider>
        <ToastContainer placement={ToastPlacement.top} />
        <Component {...pageProps} />
      </ToastProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
