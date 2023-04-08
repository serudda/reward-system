import Link from 'next/link';
import cn from 'classnames';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Button, ButtonSize, ButtonVariant, Icon, IconCatalog, Logo, LogoType } from '~/components';

export interface NavbarProps {
  /**
   * Specify an optional className to be added to the component
   */
  className?: string;
}

/**
 * The Navbar is the main navigation component
 */
export const Navbar = ({ className }: NavbarProps) => {
  const classes = {
    navbar: cn(className, 'flex flex-row items-center gap-6 border-b border-slate-800 p-4'),
  };

  const { data: sessionData } = useSession();

  const handleLogInClick = () => void signIn();
  const handleLogOutClick = () => void signOut();

  const renderLogInButton = () => {
    // User is logged in
    if (sessionData)
      return (
        <Button variant={ButtonVariant.tertiary} size={ButtonSize.sm} onClick={handleLogOutClick}>
          Log Out
        </Button>
      );

    // User is not logged in
    return (
      <Button
        variant={ButtonVariant.primary}
        size={ButtonSize.sm}
        onClick={handleLogInClick}
        endIcon={IconCatalog.arrowLongRight}
      >
        Log In
      </Button>
    );
  };

  /* Render JSX */
  return (
    <div className={classes.navbar}>
      {/* Logo */}
      <div className="flex flex-row items-center gap-4 text-white">
        <Logo type={LogoType.symbol} />
        <a className="text-lg font-semibold transition hover:opacity-80" href="/">
          Reward System
        </a>
      </div>

      {/* Space between Logo and Nav Options */}
      <div className="flex-grow"></div>

      {/* Nav Options */}
      <nav className="flex items-center space-x-8">
        <a className="hidden transform text-sm font-medium text-slate-300 hover:text-white" href="#pricing">
          Pricing
        </a>
        <a
          className="hidden transform whitespace-nowrap text-sm font-medium text-slate-300 hover:text-white"
          href="/signup"
        >
          Sign up
        </a>

        {renderLogInButton()}
      </nav>

      <div className="flex items-center border-l-2 border-slate-700 pl-6">
        <Link
          className="hidden transform text-sm font-medium text-slate-300 hover:text-white sm:block"
          href="https://github.com/serudda/reward-system"
          target="_blank"
        >
          <Icon icon={IconCatalog.gitHub} className="h-6 w-6" />
        </Link>
      </div>
    </div>
  );
};
