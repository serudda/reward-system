import React, { ReactNode } from 'react';
import { Popover, PopoverPlacement, PopoverProps } from '../Overlays/Popover/Popover';
import { Menu } from './Menu/Menu';
import { Option } from './Option/Option';

export interface DropdownProps extends Omit<PopoverProps, 'content' | 'placement'> {
  /**
   * Specify an optional className to be added to the component.
   */
  className?: string;

  /**
   * Set the Trigger element.
   */
  trigger: ReactNode;

  /**
   * Set the Menu element.
   */
  menu: PopoverProps['content'];

  /**
   * The position (relative to the target) at which the Menu should appear.
   */
  menuPlacement?: PopoverProps['placement'];
}

/**
 * This component presents a list of options that take immediate action or
 * navigate the user outside of the current context.
 * It can be thought of as a collection of links or buttons.
 */
export const DropdownMenu = ({
  trigger,
  menu,
  menuPlacement = PopoverPlacement.bottomStart,
  ...restProps
}: DropdownProps) => {
  return (
    <Popover content={menu} placement={menuPlacement} {...restProps}>
      {trigger}
    </Popover>
  );
};

DropdownMenu.Menu = Menu;
DropdownMenu.Option = Option;
