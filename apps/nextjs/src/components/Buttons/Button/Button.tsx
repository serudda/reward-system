import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import cn from 'classnames';

import { Icon, Catalog as IconCatalog } from '~/components';

export enum ButtonSize {
  xs = 'xs',
  sm = 'sm',
  base = 'base',
}

const SizesWithoutIcon: Record<ButtonSize, string> = {
  [ButtonSize.xs]: 'py-2 px-4 text-sm font-medium',
  [ButtonSize.sm]: 'py-2 px-4 text-base font-medium',
  [ButtonSize.base]: 'p-4 text-base font-medium',
};

const SizesOnlyIcon: Record<ButtonSize, string> = {
  [ButtonSize.xs]: 'p-1 text-sm font-medium',
  [ButtonSize.sm]: 'p-2 text-base font-medium',
  [ButtonSize.base]: 'p-4 text-base font-medium',
};

const SizesWithStartIcon: Record<ButtonSize, string> = {
  [ButtonSize.xs]: 'pl-1 pr-2 py-1 text-sm font-medium',
  [ButtonSize.sm]: 'pl-2 pr-4 py-2 text-base font-medium',
  [ButtonSize.base]: 'pl-2 pr-4 py-4 text-base font-medium',
};

const SizesWithEndIcon: Record<ButtonSize, string> = {
  [ButtonSize.xs]: 'pl-2 pr-1 py-1 text-sm font-medium',
  [ButtonSize.sm]: 'pl-4 pr-2 py-2 text-base font-medium',
  [ButtonSize.base]: 'pl-4 pr-2 py-4 text-base font-medium',
};

export enum ButtonVariant {
  primary = 'primary',
  secondary = 'secondary',
  tertiary = 'tertiary',
  ghost = 'ghost',
  destructive = 'destructive',
}

const Variants: Record<ButtonVariant, string> = {
  [ButtonVariant.primary]: 'bg-primary-200/20 text-primary-50 hover:bg-primary-200/30',
  [ButtonVariant.secondary]: 'bg-transparent hover:bg-base-white/20 border border-r-primary-50 text-base-white',
  [ButtonVariant.tertiary]: 'bg-neutral-700 hover:bg-neutral-600 text-primary-300',
  [ButtonVariant.ghost]: 'bg-transparent hover:bg-neutral-600 text-primary-300',
  [ButtonVariant.destructive]: 'bg-red-600 hover:bg-red-700 text-red-50',
};

const DisabledVariants: Record<ButtonVariant, string> = {
  [ButtonVariant.primary]: 'bg-primary-700 text-neutral-300',
  [ButtonVariant.secondary]: 'bg-transparent border border-r-neutral-300 text-neutral-300',
  [ButtonVariant.tertiary]: 'bg-transparent text-neutral-300',
  [ButtonVariant.ghost]: 'bg-transparent text-neutral-300',
  [ButtonVariant.destructive]: 'bg-error-800 text-neutral-300',
};

enum ButtonIconSize {
  xs = '24',
  sm = '24',
  base = '24',
}

export enum HtmlType {
  button = 'button',
  reset = 'reset',
  submit = 'submit',
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Changes the size of the button, giving it more or less padding
   */
  size?: ButtonSize;

  /**
   * The shape of the component. It determines the importance in the hierarchy, for example, the contained button commands the most attention
   */
  variant?: ButtonVariant;

  /**
   * The icon to display on the left side.
   */
  startIcon?: IconCatalog;

  /**
   * The icon to display on the right side.
   */
  endIcon?: IconCatalog;

  /**
   * Disables the button, disallowing user interaction.
   */
  isDisabled?: boolean;

  /**
   * If set to true, the button will display a loading effect.
   */
  isLoading?: boolean;

  /**
   * Set a diferent loading text for your button.
   */
  loadingText?: string;

  /**
   * Extends the button to 100% width.
   */
  isFullWidth?: boolean;

  /**
   * HTML type attribute of the button.
   */
  htmlType?: HtmlType;

  /**
   * Elements to display inside the Navbar.
   */
  children?: ReactNode;
}

/**
 * Buttons are used to initialize an action.
 * Button labels express what action will occur when the user interacts with it.
 */
export const Button = ({
  children,
  size = ButtonSize.base,
  startIcon,
  endIcon,
  isDisabled = false,
  isLoading = false,
  loadingText,
  isFullWidth = false,
  variant = ButtonVariant.primary,
  htmlType = HtmlType.button,
  className,
  onClick,
  ...restOfProps
}: ButtonProps) => {
  const setSizes = () => {
    if (startIcon && children) return SizesWithStartIcon[size];
    if (endIcon && children) return SizesWithEndIcon[size];
    if ((startIcon || endIcon) && !children) return SizesOnlyIcon[size];

    return SizesWithoutIcon[size];
  };

  const classes = {
    button: cn(
      className,
      'flex items-center justify-center relative overflow-hidden min-w-fit',
      'text-center whitespace-nowrap',
      'transition duration-100 ease-out',
      'rounded-lg',
      setSizes(),
      isDisabled ? DisabledVariants[variant] : Variants[variant],
      {
        'w-full': isFullWidth,
        'cursor-default opacity-30': isDisabled,
      },
    ),
    startIcon: cn({
      'mr-1': children && size === ButtonSize.xs,
      'mr-2': children && (size === ButtonSize.sm || size === ButtonSize.base),
    }),
    endIcon: cn({
      'ml-1': children && size === ButtonSize.xs,
      'ml-2': children && (size === ButtonSize.sm || size === ButtonSize.base),
    }),
    loading: cn(
      'absolute left-0 top-0 opacity-30',
      'w-full h-full',
      'flex items-center justify-center',
      'after:content-[""] after:absolute after:h-full after:w-full after:animate-translation-x',
      'before:content-[""] before:absolute before:h-full before:w-full before:animate-translation-x',
      {
        'after:bg-primary-700 before:bg-primary-700': variant === ButtonVariant.primary,
        'after:bg-neutral-500 before:bg-neutral-500':
          variant === ButtonVariant.secondary || variant === ButtonVariant.tertiary || variant === ButtonVariant.ghost,
        'after:bg-error-700 before:bg-error-700': variant === ButtonVariant.destructive,
      },
    ),
  };

  /* Render JSX */
  return (
    <button
      className={classes.button}
      type={htmlType}
      disabled={isDisabled || isLoading}
      onClick={onClick}
      {...restOfProps}
    >
      {startIcon && (
        <Icon
          className={classes.startIcon}
          icon={startIcon}
          width={ButtonIconSize[size]}
          height={ButtonIconSize[size]}
        />
      )}
      <span>{children}</span>
      {isLoading && <span className={classes.loading}></span>}
      {endIcon && (
        <Icon className={classes.endIcon} icon={endIcon} width={ButtonIconSize[size]} height={ButtonIconSize[size]} />
      )}
    </button>
  );
};
