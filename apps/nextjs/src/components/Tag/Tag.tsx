import React, { useState, type ReactNode } from 'react';
import cn from 'classnames';

export enum TagVariant {
  primary = 'primary',
  neutral = 'neutral',
  success = 'success',
  warning = 'warning',
  error = 'error',
}

const Variants: Record<TagVariant, string> = {
  [TagVariant.primary]: 'bg-primary-200/30 text-primary-50',
  [TagVariant.neutral]: 'bg-slate-800 text-slate-50',
  [TagVariant.success]: 'bg-green-400/50 text-green-50',
  [TagVariant.warning]: 'bg-yellow-400/50 text-yellow-50',
  [TagVariant.error]: 'bg-red-400/50 text-red-50',
};

const StrokeVariants: Record<TagVariant, string> = {
  [TagVariant.primary]: 'border border-primary-50',
  [TagVariant.neutral]: 'border border-slate-600',
  [TagVariant.success]: 'border border-green-400',
  [TagVariant.warning]: 'border border-yellow-400',
  [TagVariant.error]: 'border border-red-400',
};

export interface TagProps {
  /**
   * Set the Tag content
   */
  children: ReactNode;

  /**
   * The shape of the component. It determines the importance in the hierarchy, for example, the contained button commands the most attention
   */
  variant?: TagVariant;

  /**
   * Specify an optional className to be added to the component
   */
  className?: string;

  /**
   * Whether the Tag has a border
   */
  hasStroke?: boolean;

  /**
   * Specify an optional test ID to use on e2e tests.
   */
  dataTestId?: string;
}

/**
 * The Tag component is useful to emphasize information to the user,
 * works best with single word values.
 */
export const Tag = ({ children, variant = TagVariant.primary, hasStroke = false, className, dataTestId }: TagProps) => {
  const [tagContent, setTagContent] = useState('');

  const setStrokeColor = () => {
    if (!hasStroke) return '';
    return StrokeVariants[variant];
  };

  const classes = {
    tag: cn(
      className,
      'items-center relative overflow-hidden',
      'text-center whitespace-nowrap',
      'transition duration-100 ease-out',
      'rounded-2xl',
      Variants[variant],
      setStrokeColor(),
      {
        'inline-flex py-0.5 px-2': tagContent.length > 1,
        'w-6 h-6 flex justify-center flex-grow-0 flex-shrink-0': tagContent.length === 1,
      },
    ),
  };

  const handleTagRef = (ref: HTMLDivElement | null) => setTagContent(ref?.textContent as string);

  /* Render JSX */
  return (
    <div ref={(ref) => handleTagRef(ref)} data-testid={dataTestId} className={classes.tag}>
      <span className="text-xs font-bold">{children}</span>
    </div>
  );
};
