import type { ReactElement } from 'react';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { api } from '~/utils/api';
import { ItemsGrid, RootLayout } from '~/components';
import type { NextPageWithLayout } from '../_app';

type StoreProps = {};

const Store: NextPageWithLayout = (_props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: stores, isLoading, isError } = api.store.getAllWithItems.useQuery();

  const renderStores = () => {
    if (isLoading)
      return <div className="flex h-52 items-center justify-center text-xl font-bold text-slate-50">Loading...</div>;
    if (isError) return <div>Error</div>;

    return stores.map((store) => (
      <ItemsGrid key={store.id} storeName={store.name} storeImageUrl={store.image} items={store.items} />
    ));
  };

  return (
    <>
      <Head>
        <title>Reward System - Store </title>
        <meta name="description" content="Reward System - Store" />
      </Head>
      <div className="pt-20">{renderStores()}</div>
    </>
  );
};

Store.getLayout = (page: ReactElement) => <RootLayout>{page}</RootLayout>;

export const getServerSideProps: GetServerSideProps<StoreProps> = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['nextjs'])),
  },
});

export default Store;
