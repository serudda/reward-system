import type { NextPage } from 'next';
import { signIn } from 'next-auth/react';
import i18n from '@acme/i18n';
import { Button, ButtonVariant, IconCatalog, Logo, LogoColor, LogoType } from '~/components';

const Signin: NextPage = () => {
  const { t } = i18n;
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
          {t('app.nextjs.component.button.logInWithDiscord')}
        </Button>
      </div>
    </div>
  );
};

export default Signin;
