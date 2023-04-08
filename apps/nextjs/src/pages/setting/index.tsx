import { type NextPage } from 'next';
import Head from 'next/head';
import { Navbar } from '~/components/Navbar/Navbar';

const Setting: NextPage = () => {
  return (
    <>
      <Head>
        <title>Reward System - Setting </title>
        <meta name="description" content="Reward System - Setting" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative mx-auto min-h-screen max-w-screen-xl px-6 pb-20 sm:px-8">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <div className="pt-20">Setting</div>
      </div>
    </>
  );
};

export default Setting;
