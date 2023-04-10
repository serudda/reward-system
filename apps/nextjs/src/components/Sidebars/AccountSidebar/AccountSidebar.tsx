import Link from 'next/link';
import cn from 'classnames';
import { useSession } from 'next-auth/react';
import { Avatar, AvatarSize, Icon, IconCatalog } from '~/components';

export interface AccountSidebarProps {
  /**
   * Specify an optional className to be added to the component
   */
  className?: string;
}

/**
 * A sidebar that displays the user's account information
 */
export const AccountSidebar = ({ className }: AccountSidebarProps) => {
  const classes = {
    sidebar: cn(className, 'flex w-60 flex-col items-start space-y-4'),
  };

  const { data: sessionData } = useSession();

  /* Render JSX */
  return (
    <div className={classes.sidebar}>
      <aside className="h-max w-full pr-6 md:sticky md:top-4 md:w-auto md:min-w-[200px]">
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
          <nav>
            <ul>
              <li>
                <Link
                  className="group relative mx-1 mb-2 flex items-center space-x-4 rounded py-2 text-slate-400 md:px-3 md:hover:bg-slate-800"
                  href="/account"
                >
                  <Icon
                    className="text-primary-300 h-5 w-5 group-hover:text-slate-200"
                    icon={IconCatalog.adjustmentsHorizontal}
                  />
                  <p className="text-base group-hover:text-slate-200">General</p>
                </Link>
              </li>
              <li>
                <Link
                  className="group relative mx-1 mb-2 flex items-center space-x-4 rounded py-2 text-slate-400 md:px-3 md:hover:bg-slate-800"
                  href="/account"
                >
                  <Icon
                    className="h-5 w-5 text-slate-400 group-hover:text-slate-200"
                    icon={IconCatalog.arrowRightOnRectangle}
                  />
                  <p className="text-base group-hover:text-slate-200">Log out</p>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </div>
  );
};
