import type { GetServerSideProps, NextPage } from 'next';
import { signIn } from 'next-auth/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';
import { Button, ButtonVariant, IconCatalog, Logo, LogoColor, LogoType } from '~/components';

type SigninProps = {};

const Signin: NextPage = () => {
  const { t } = useTranslation(['nextjs']);
  return (
    <div className="mx-auto mt-16 max-w-sm">
      <div className="relative flex flex-col items-center justify-center rounded-lg bg-slate-800 p-10">
        <Logo type={LogoType.symbol} color={LogoColor.light} width="30px" height="30px" className="mb-10" />
        <Button
          onClick={() => signIn('discord', { callbackUrl: '/store' })}
          variant={ButtonVariant.discord}
          startIcon={IconCatalog.discord}
          iconIsSolid
        >
          {t('nextjs:component.button.logInWithDiscord')}
        </Button>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<SigninProps> = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['nextjs'])),
  },
});

export default Signin;
