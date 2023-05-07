import Image from 'next/image';
import cn from 'classnames';

export enum AvatarSize {
  xs = 'xs',
  sm = 'sm',
  base = 'base',
}

const Sizes: Record<AvatarSize, string> = {
  [AvatarSize.xs]: 'w-6 h-6',
  [AvatarSize.sm]: 'w-6.5 h-6.5',
  [AvatarSize.base]: 'w-8 h-8',
};

const ImageSizes: Record<AvatarSize, string> = {
  [AvatarSize.xs]: '24',
  [AvatarSize.sm]: '28',
  [AvatarSize.base]: '40',
};

export interface AvatarProps {
  /**
   * Changes the size of the Spinner.
   */
  size?: AvatarSize;

  /**
   * Specify an optional alt text for the image
   */
  altText?: string;

  /**
   * Specify an optional image url
   */
  imgUrl?: string;

  /**
   * Specify an optional className to be added to the component
   */
  className?: string;
}

/**
 * Avatars are used to show a thumbnail representation of an individual or business in the interface.
 */
export const Avatar = ({
  size = AvatarSize.sm,
  altText = 'avatar image',
  imgUrl = '/assets/default-avatar.svg',
  className,
}: AvatarProps) => {
  const classes = {
    avatar: cn(className, 'rounded-full relative', Sizes[size]),
    image: cn('rounded-full'),
  };

  return (
    <div className={classes.avatar}>
      <Image
        className={classes.image}
        src={imgUrl}
        alt={altText}
        width={parseInt(ImageSizes[size])}
        height={parseInt(ImageSizes[size])}
      />
    </div>
  );
};
