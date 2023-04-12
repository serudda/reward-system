import type { ReactElement } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { api } from '~/utils/api';
import { ConnectAccountCard, IconCatalog, RootLayout, SidebarLayout } from '~/components';
import type { NextPageWithLayout } from '../_app';

const Account: NextPageWithLayout = () => {
  const { status, data: sessionData } = useSession({ required: true });

  const { data: providers, isLoading } = api.account.getAllProvidersByUserId.useQuery({
    userId: sessionData?.user.id ?? '',
  });

  const hasGitHubProvider = providers?.some((provider) => provider.provider === 'github');

  const handleGitHubConnectClick = () => signIn('github');

  if (status === 'loading')
    return <div className="flex h-52 items-center justify-center text-xl font-bold text-slate-50">Loading...</div>;

  return (
    <section className="flex w-full flex-grow flex-col first:mt-0 last:mb-0">
      {/* Section Header */}
      <div className="flex w-full flex-col">
        <div className="flex items-center justify-between p-2">
          <p className="text-3xl font-semibold">General Settings</p>
        </div>
        <hr className="my-10 w-full border-t-2 border-slate-800" />
      </div>

      {/* Section Content */}
      <div className="flex flex-col space-y-12">
        <div className="flex flex-col space-y-8">
          <p className="text-xl font-bold">Account Integrations</p>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <ConnectAccountCard
              icon={IconCatalog.gitHub}
              title="GitHub"
              disconnectedText="Connect your GitHub account to your account to enable GitHub integration."
              connectedText="You're connected as serudda"
              isConnected={hasGitHubProvider}
              onConnectClick={handleGitHubConnectClick}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

Account.getLayout = (page: ReactElement) => (
  <RootLayout>
    <SidebarLayout>{page}</SidebarLayout>
  </RootLayout>
);

export default Account;
