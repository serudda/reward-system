import { type NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Avatar, AvatarSize, Icon, IconCatalog, Navbar } from '~/components';

const Setting: NextPage = () => {
  const { data: sessionData } = useSession();

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
        <div className="pt-20">
          {/* Sidebar */}
          <div className=" flex w-60 flex-col items-start space-y-4">
            <aside className="h-max w-full md:sticky md:top-4 md:w-auto md:min-w-[200px]">
              {/* Sidebar Header */}
              <div className="mb-6 flex w-full items-center space-x-3 truncate border-b border-slate-800 p-4">
                <Avatar imgUrl={sessionData?.user.thumbnail} size={AvatarSize.base} />
                <div className="flex flex-col items-start">
                  <p className="mb-1 font-semibold">{sessionData?.user.name}</p>
                  <p className="text-xs font-medium text-slate-500">Personal Account</p>
                </div>
              </div>

              {/* Sidebar Menu */}
              <div className="mb-6">
                <Link
                  className="group relative mx-1 mb-2 flex items-center space-x-4 rounded py-2 text-slate-400 md:px-3 md:hover:bg-slate-800"
                  href="/account"
                >
                  <Icon
                    className="text-primary-300 h-6 w-6 group-hover:text-slate-200"
                    icon={IconCatalog.adjustmentsHorizontal}
                  />
                  <p className="text-base group-hover:text-slate-200">General</p>
                </Link>
              </div>
            </aside>
          </div>
          {/* Section */}
        </div>
      </div>
    </>
  );
};

export default Setting;
