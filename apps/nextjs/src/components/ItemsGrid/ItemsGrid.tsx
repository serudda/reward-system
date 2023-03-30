import Image from 'next/image';
import cn from 'classnames';
import { useSession } from 'next-auth/react';

import { type Item } from '@acme/db';

import { api } from '~/utils/api';
import { ItemsCard } from '~/components/ItemsCard/ItemsCard';

export interface ItemsGridProps {
  /**
   * Specify an optional className to be added to the component
   */
  className?: string;

  storeName: string;

  storeImageUrl: string;

  items?: Item[];
}

/**
 * Represents the Items Grid section
 */
export const ItemsGrid = ({ className, storeName, storeImageUrl, items = [] }: ItemsGridProps) => {
  const classes = {
    container: cn(className, 'e-flex e-items-center'),
  };

  const { mutate: buyItem, error } = api.item.buyItem.useMutation({
    onSuccess: () => {
      console.log('success');
    },
  });

  const handleBuyItem = async (itemId: string) => {
    const response = await buyItem({ itemId });
  };

  const renderItems = () => {
    if (items.length === 0) return <div>This store doesn&lsquo;t have items yet.</div>;

    return items.map((item) => (
      <ItemsCard
        key={item.id}
        thumbnailUrl={item.imageUrl}
        title={item.name}
        price={item.price}
        stock={item.stock}
        onActionClick={() => handleBuyItem(item.id)}
      />
    ));
  };

  /* Render JSX */
  return (
    <div className={classes.container}>
      <div className="relative w-full rounded-lg border border-slate-800 bg-slate-800/30">
        {/* Header */}
        <div className="border-b border-slate-800 p-5">
          <div className="text-lg text-slate-700">Search item</div>
        </div>

        {/* Body */}
        <div className="p-8 pb-24">
          <div className="mb-3 font-semibold text-slate-500">All Items</div>
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">{renderItems()}</div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 right-0 w-full border-t border-slate-800 bg-slate-900/30 p-5">
          <div className="flex items-center">
            <div className="flex items-center space-x-4">
              <Image className="rounded-md" src={storeImageUrl} alt={storeName} width={32} height={32} />
              <div className="text-lg text-slate-500">{storeName}</div>
            </div>
            <div className="ml-auto font-semibold text-slate-600">{items.length} items available</div>
          </div>
        </div>
      </div>
    </div>
  );
};
