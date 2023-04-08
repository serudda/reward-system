import React, { ReactNode } from 'react';
import cn from 'classnames';

export interface OptionProps {
  /**
   * Specify an optional className to be added to the component
   */
  className?: string;

  /**
   * Elements to display inside the Option.
   */
  children?: ReactNode;

  /**
   * Specify whether the Option is disabled
   */
  isDisabled?: boolean;

  /**
   * Callback when the option was clicked
   */
  onClick?: (event: React.MouseEvent) => void;
}

/**
 * Represents an item to use in the DropdownMenu component
 * @author Sergio Ruiz<sergioruizdavila@gmail.com>
 * Created at 2022-09-21
 */
export const Option = ({ className, children, isDisabled, onClick }: OptionProps) => {
  const classes = cn(className, 'flex text-slate-50 text-sm px-3 py-2 select-none', 'cursor-pointer', {
    'pointer-events-none opacity-25': isDisabled,
    'hover:bg-slate-900/50': !isDisabled,
  });

  const handleClick = (event: React.MouseEvent) => {
    if (onClick) onClick(event);
  };

  /* Render JSX */
  return (
    <div role="option" tabIndex={0} className={classes} onClick={handleClick}>
      {children}
    </div>
  );
};
