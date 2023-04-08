import Link from 'next/link';
import cn from 'classnames';
import { signIn, signOut, useSession } from 'next-auth/react';
import {
  Avatar,
  AvatarSize,
  Button,
  ButtonSize,
  ButtonVariant,
  DropdownMenu,
  Icon,
  IconCatalog,
  Logo,
  LogoType,
  PopoverPlacement,
} from '~/components';

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

  const renderNavOptions = () => {
    // User is logged in
    if (sessionData)
      return (
        <DropdownMenu
          menuPlacement={PopoverPlacement.bottomEnd}
          trigger={
            <div role="button" tabIndex={0}>
              <Avatar imgUrl={sessionData.user.thumbnail} size={AvatarSize.xs} />
            </div>
          }
          menu={
            <DropdownMenu.Menu>
              <DropdownMenu.Option>
                <Link href="/setting">Account Settings</Link>
              </DropdownMenu.Option>
              <DropdownMenu.Option className="border-t border-slate-700/50" onClick={handleLogOutClick}>
                <span className="text-red-500">Logout</span>
              </DropdownMenu.Option>
            </DropdownMenu.Menu>
          }
        ></DropdownMenu>
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
      <nav className="flex items-center space-x-9">
        <a className="hidden transform text-sm font-medium text-slate-300 hover:text-white" href="#pricing">
          Pricing
        </a>
        <a className="transform whitespace-nowrap text-sm font-semibold text-slate-300 hover:text-white" href="/signup">
          Docs
        </a>
        <a className="transform whitespace-nowrap text-sm font-semibold text-slate-300 hover:text-white" href="/signup">
          Help
        </a>

        <Link
          className="hidden transform text-sm font-medium text-slate-300 hover:text-white sm:block"
          href="https://github.com/serudda/reward-system"
          target="_blank"
        >
          <Icon icon={IconCatalog.gitHub} className="h-6 w-6" isSolid />
        </Link>
      </nav>

      <div className="flex items-center border-l-2 border-slate-700 pl-6">{renderNavOptions()}</div>
    </div>
  );
};
