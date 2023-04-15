import { AccountSidebar } from '~/components';

export interface SidebarLayoutProps {
  children: React.ReactNode;
}

export const SidebarLayout = ({ children }: SidebarLayoutProps) => {
  return (
    <div className="mt-12 mb-24 block space-y-4 md:flex md:space-x-5 md:space-y-0">
      {/* Sidebar */}
      <AccountSidebar />

      {/* Section */}
      <main className="flex w-full min-w-0 flex-col items-center border-l border-slate-800 py-3 pl-12">{children}</main>
    </div>
  );
};
