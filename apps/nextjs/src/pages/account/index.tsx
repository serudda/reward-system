import type { ReactElement } from 'react';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { signIn, useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { api } from '~/utils/api';
import { ConnectAccountCard, IconCatalog, RootLayout, SidebarLayout } from '~/components';
import type { NextPageWithLayout } from '../_app';

type AccountProps = {};

const Account: NextPageWithLayout = (_props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { t } = useTranslation(['common', 'nextjs']);

  const { status, data: sessionData } = useSession({ required: true });

  const { data: providers, isLoading } = api.account.getAllProvidersByUserId.useQuery({
    userId: sessionData?.user.id ?? '',
  });

  const githubProvider = providers?.find((provider) => provider.provider === 'github');

  const handleGitHubConnectClick = () => signIn('github');

  if (status === 'loading')
    return (
      <div className="flex h-52 items-center justify-center text-xl font-bold text-slate-50">
        {t('common:loading')}...
      </div>
    );

  const DISCONNECT_TEXT = t(
    'nextjs:account.sections.general.subsections.integration.connectAccountCard.description.default',
  );
  const CONNECT_TEXT = t(
    'nextjs:account.sections.general.subsections.integration.connectAccountCard.description.connected',
    { username: githubProvider?.providerUsername },
  );

  return (
    <section className="flex w-full flex-grow flex-col first:mt-0 last:mb-0">
      {/* Section Header */}
      <div className="flex w-full flex-col">
        <div className="flex items-center justify-between p-2">
          <p className="text-3xl font-semibold">{t('nextjs:account.sections.general.title')}</p>
        </div>
        <hr className="my-10 w-full border-t-2 border-slate-800" />
      </div>

      {/* Section Content */}
      <div className="flex flex-col space-y-12">
        {/* Profile Information */}
        <div className="flex flex-col space-y-8">
          <p className="text-xl font-bold">{t('nextjs:account.sections.general.subsections.profile.title')}</p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex w-full flex-col">
              <div className="flex items-center justify-between">
                <div className="flex space-x-1">
                  <label className="mb-2 block text-sm font-semibold leading-[18px] text-slate-500">
                    {t('common:inputs.email.label')}
                  </label>
                </div>
              </div>
              <div className="relative flex w-full flex-col items-center space-y-2">
                <input
                  name="email"
                  placeholder="email"
                  className="relative w-full min-w-0 cursor-not-allowed rounded-md border border-slate-700 bg-slate-800/40 px-3 py-2 text-base leading-6 text-slate-400 focus:outline-none"
                  value={sessionData?.user.email ?? ''}
                  readOnly
                />
                <p className="text-xs text-slate-500">
                  {t('nextjs:account.sections.general.subsections.profile.form.email.helperText')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Account Integrations */}
        <div className="flex flex-col space-y-8">
          <p className="text-xl font-bold">{t('nextjs:account.sections.general.subsections.integration.title')}</p>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <ConnectAccountCard
              icon={IconCatalog.gitHub}
              title="GitHub"
              disconnectedText={DISCONNECT_TEXT}
              connectedText={CONNECT_TEXT}
              isConnected={Boolean(githubProvider)}
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

export const getServerSideProps: GetServerSideProps<AccountProps> = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common', 'nextjs'])),
  },
});

export default Account;
