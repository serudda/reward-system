import { type NextPage } from 'next';
import Head from 'next/head';

import { api } from '~/utils/api';
import { ItemsGrid } from '~/components/ItemsGrid/ItemsGrid';
import { Navbar } from '~/components/Navbar/Navbar';

const Store: NextPage = () => {
  const { data: stores, isLoading, isError } = api.store.getAllWithItems.useQuery();

  const renderStores = () => {
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error</div>;

    return stores.map((store) => (
      <ItemsGrid key={store.id} storeName={store.name} storeImageUrl={store.imageUrl as string} items={store.items} />
    ));
  };

  return (
    <>
      <Head>
        <title>Reward System - Store </title>
        <meta name="description" content="Reward System - Store" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative mx-auto min-h-screen max-w-screen-xl px-6 pb-20 sm:px-8">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <div className="pt-20">{renderStores()}</div>
      </div>
    </>
  );
};

export default Store;
