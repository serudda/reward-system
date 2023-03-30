import Image from 'next/image';
import cn from 'classnames';

import { Tag, TagVariant } from '~/components/Tag/Tag';

export interface ItemsCardProps {
  /**
   * Specify an optional className to be added to the component
   */
  className?: string;

  /**
   * Specify the cost of the item
   */
  price: number;

  /**
   * Set the image url
   */
  thumbnailUrl?: string;

  /**
   * Set the item name
   */
  title: string;

  /**
   * Set the amount available of the item
   */
  stock: number;

  /**
   * Provide a handler that is called when the action button was clicked.
   */
  onActionClick?: () => void;
}

/**
 * Represents a Items Card
 */
export const ItemsCard = ({
  className,
  title,
  thumbnailUrl = '/assets/default.png',
  stock = 0,
  price = 0,
  onActionClick,
}: ItemsCardProps) => {
  const isDisabled = stock === 0;

  const classes = {
    container: cn(className),
    imageContainer: cn('relative flex items-center justify-center rounded-t-lg bg-slate-800 p-6', {
      'cursor-default opacity-50': isDisabled,
    }),
    action: cn('bg-primary-200/20 text-primary-50', 'flex items-center justify-center', 'rounded-b-lg p-2', {
      'hover:bg-primary-200/30': !isDisabled,
      'cursor-default opacity-30': isDisabled,
    }),
  };

  const handleActionClick = () => {
    if (isDisabled) return;
    if (onActionClick) onActionClick();
  };

  const renderAvailabilityTag = () => {
    if (stock === 0) return <Tag variant={TagVariant.white}>out of stock</Tag>;
    if (stock === 1) return <Tag variant={TagVariant.error}>last unit</Tag>;
    if (stock <= 3) return <Tag variant={TagVariant.warning}>{stock} units</Tag>;
    if (stock > 3) return <Tag variant={TagVariant.neutral}>{stock} units</Tag>;
    return null;
  };

  /* Render JSX */
  return (
    <div className={classes.container}>
      <div className="mb-2 flex flex-col">
        {/* Image */}
        <div className={classes.imageContainer}>
          <div className="absolute top-2 right-2">
            <Tag variant={TagVariant.neutral}>🔥</Tag>
          </div>

          <div className="relative h-40 w-40 rounded-full">
            <Image className="rounded-full object-cover" src={thumbnailUrl} alt={title} fill />
          </div>
        </div>

        {/* Action */}
        <div
          className={classes.action}
          role="button"
          tabIndex={0}
          onClick={handleActionClick}
          onKeyDown={handleActionClick}
        >
          <div className="flex items-center space-x-2">
            <Image src="/assets/indie-token-icon.png" alt="Platzi" width={20} height={20} />
            <span className="font-bold">{price}</span>
          </div>
        </div>
      </div>

      {/* Item info */}
      <div className="">
        <p className="mb-1 text-lg font-semibold text-slate-300 line-clamp-2">{title}</p>
        <div className="flex items-center space-x-2">
          <div className="text-sm font-semibold text-slate-500">Amount</div>
          {renderAvailabilityTag()}
        </div>
      </div>
    </div>
  );
};
