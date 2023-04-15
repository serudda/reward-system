import Image from 'next/image';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { type Item } from '@acme/db';
import { api } from '~/utils/api';
import { useToast } from '~/common';
import { ItemsCard, ToastVariant } from '~/components';

export interface ItemsGridProps {
  /**
   * Specify an optional className to be added to the component
   */
  className?: string;

  /**
   * The name of the store
   */
  storeName: string;

  /**
   * The image url of the store
   */
  storeImageUrl: string;

  /**
   * The list of items
   */
  items?: Item[];
}

/**
 * Represents the Items Grid section
 */
export const ItemsGrid = ({ className, storeName, storeImageUrl, items = [] }: ItemsGridProps) => {
  const classes = {
    container: cn(className),
  };

  const { t } = useTranslation(['nextjs']);

  const { addToast } = useToast();

  const { mutate: buyItem } = api.item.buyItem.useMutation({
    onSuccess: () => {
      addToast({
        variant: ToastVariant.success,
        title: t('component.itemsGrid.message.success.boughtItem'),
        dismissInterval: 5000,
      });
    },
    onError: (error) => {
      const errorMsg = error.message;
      addToast({
        variant: ToastVariant.error,
        title: errorMsg,
        dismissInterval: 5000,
      });
    },
  });

  const handleBuyItem = (itemId: string) => void buyItem({ itemId });

  const renderItems = () => {
    if (items.length === 0)
      return (
        <div className="flex w-full items-center justify-center py-20">
          <span className="text-lg text-slate-300">{t('component.itemsGrid.message.empty')}</span>
        </div>
      );

    const itemsList = items.map((item) => (
      <ItemsCard
        key={item.id}
        thumbnailUrl={item.image}
        title={item.name}
        price={item.price}
        stock={item.stock}
        onActionClick={() => handleBuyItem(item.id)}
      />
    ));

    return <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">{itemsList}</div>;
  };

  /* Render JSX */
  return (
    <div className={classes.container}>
      <div className="relative w-full rounded-lg border border-slate-800 bg-slate-800/30">
        {/* Header */}
        {/*<div className="border-b border-slate-800 p-5">
          <div className="text-lg text-slate-700">Search item</div>
        </div>*/}

        {/* Body */}
        <div className="p-8 pb-24">
          <div className="mb-3 font-semibold text-slate-500">{t('component.itemsGrid.body.title')}</div>
          {renderItems()}
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 right-0 w-full border-t border-slate-800 bg-slate-900/30 p-5">
          <div className="flex items-center">
            <div className="flex items-center space-x-4">
              <Image className="rounded-md" src={storeImageUrl} alt={storeName} width={32} height={32} />
              <div className="text-lg text-slate-400">{storeName}</div>
            </div>
            <div className="ml-auto font-semibold text-slate-600">
              {t('component.itemsGrid.footer.itemsAvailable', { amount: items.length })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
