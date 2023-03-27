import { type NextPage } from 'next';
import Head from 'next/head';

import { ItemsGrid } from '~/components/ItemsGrid/ItemsGrid';
import { Logo, LogoType } from '~/components/Logo/Logo';

const Store: NextPage = () => {
  return (
    <>
      <Head>
        <title>Reward System - Store </title>
        <meta name="description" content="Reward System - Store" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative mx-auto min-h-screen max-w-screen-xl px-6 pb-20 sm:px-8">
        {/* Navbar */}
        <div className="flex flex-row items-center gap-6 border-b border-slate-800 p-4">
          {/* Logo */}
          <div className="flex flex-row items-center gap-4 text-white">
            <Logo type={LogoType.symbol} />
            <a className="text-lg font-semibold transition hover:opacity-80" href="/">
              Reward System <span className="ml-2 text-sm text-slate-500">v0.1.0</span>
            </a>
          </div>

          {/* Space between Logo and Nav Options */}
          <div className="flex-grow"></div>

          {/* Nav Options */}
          <nav className="flex items-center space-x-8">
            <a
              className="hidden transform text-sm font-medium text-slate-300 hover:text-white sm:block"
              href="#pricing"
            >
              Pricing
            </a>
            <a
              className="hidden transform whitespace-nowrap text-sm font-medium text-slate-300 hover:text-white sm:block"
              href="/signup"
            >
              Sign up
            </a>
            <a
              className="bg-primary-200/20 text-primary-50 hover:bg-primary-200/30 flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-semibold transition"
              href="/login"
            >
              <span className="mr-1">Sign in</span>
              <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                <path
                  d="M9.75 4.75 13.25 8m0 0-3.5 3.25M13.25 8H2.75"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </a>
          </nav>

          <div className="flex items-center border-l-2 border-slate-700 pl-6">
            <a
              className="hidden transform text-sm font-medium text-slate-300 hover:text-white sm:block"
              href="https://github.com/serudda/reward-system"
              target="_blank"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                  fill="currentColor"
                ></path>
              </svg>
            </a>
          </div>
        </div>

        {/* Main Content */}
        <div className="pt-20"></div>
        <ItemsGrid />
      </div>
    </>
  );
};

export default Store;