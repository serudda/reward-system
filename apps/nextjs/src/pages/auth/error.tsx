import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Button, ButtonSize, ButtonVariant, IconCatalog, Logo, LogoColor, LogoType } from '~/components';
import { AuthError } from '../../common';

type ErrorProps = {};

const Error: NextPage = (_props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { error } = router.query;
  const { data: session } = useSession();
  const { t } = useTranslation('common');

  const handleGoBackClick = () => router.back();

  return (
    <div className="mx-auto mt-16 max-w-sm">
      <div className="relative flex flex-col items-center justify-center rounded-lg bg-slate-800 p-10">
        <Logo type={LogoType.symbol} color={LogoColor.light} width="30px" height="30px" className="mb-10" />
        <p className="mb-6 text-center text-xl font-semibold">{AuthError(error as string)}</p>

        <span className="text-primary-500 mb-10 text-xl">{session?.user.email}</span>

        <Button
          startIcon={IconCatalog.arrowLongLeft}
          size={ButtonSize.sm}
          variant={ButtonVariant.destructive}
          onClick={handleGoBackClick}
        >
          {t('actions.back')}
        </Button>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<ErrorProps> = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common'])),
  },
});

export default Error;
