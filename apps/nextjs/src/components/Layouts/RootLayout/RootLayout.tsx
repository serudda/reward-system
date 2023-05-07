import Head from 'next/head';
import { Navbar } from '~/components/Navbar/Navbar';

export interface RootLayoutProps {
  children: React.ReactNode;
}

export const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <>
      <Head>
        <title>Reward System</title>
        <meta name="description" content="Reward System" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative mx-auto min-h-screen max-w-screen-xl px-6 pb-20 sm:px-8">
        <Navbar />

        {/* Main Content */}
        {children}
      </div>
    </>
  );
};
