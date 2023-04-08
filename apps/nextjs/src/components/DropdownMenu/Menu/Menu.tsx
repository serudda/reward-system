import React, { ReactNode } from 'react';
import cn from 'classnames';

export interface MenuProps {
  /**
   * Specify an optional className to be added to the component.
   */
  className?: string;

  /**
   * Elements to display inside the DropdownMenu.
   */
  children?: ReactNode;
}

/**
 * Menu (Dropdown Menu)
 * @author Sergio Ruiz Davila<sergio.ruiz@evacenter.com>
 * Created at 2022-09-21
 */
export const Menu = ({ className, children }: MenuProps) => {
  const classes = cn(className, 'rounded flex-grow w-full overflow-y-auto');

  return (
    <div className={classes} role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
      {children}
    </div>
  );
};
