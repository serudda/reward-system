import React, { useEffect } from 'react';
import cn from 'classnames';

import { useToast } from '~/common';
import { Button, ButtonSize, ButtonVariant, Catalog as IconCatalog } from '~/components';

export type ActionType = {
  /**
   * Set the button action label
   */
  label?: string;

  /**
   * Provide a handler that is called when the action button was clicked.
   */
  onActionClick: () => void;
};

export enum ToastVariant {
  neutral = 'neutral',
  success = 'success',
  warning = 'warning',
  error = 'error',
}

const Variants: Record<ToastVariant, string> = {
  [ToastVariant.neutral]: 'bg-primary-900 border border-primary-500',
  [ToastVariant.success]: 'bg-success-900 border border-success-800',
  [ToastVariant.warning]: 'bg-warning-800 border border-warning-500',
  [ToastVariant.error]: 'bg-error-800 border border-error-500',
};

export interface ToastProps {
  /**
   * Set an idntifier when you have more than one Toast on the screen.
   */
  id?: string | number;

  /**
   * Descriptive label to be read to screenreaders
   */
  ariaLabel?: string;

  /**
   * Specify an optional className to be added to the component
   */
  className?: string;

  /**
   * Set a title
   */
  title: string;

  /**
   * The shape of the component.
   */
  variant?: ToastVariant;

  /**
   * Set an extra action
   */
  action?: ActionType;

  /**
   * Whether the Toast has a close button
   */
  hasCloseBtn?: boolean;

  /**
   * Set a time to auto delete Toast
   */
  dismissInterval?: number;

  /**
   * Provide a handler that is called when the close button was clicked.
   */
  onClose?: () => void;
}

/**
 * Generally, an alert displays a prominent message at the top of the screen.
 * It could be used to promote a new feature or provide action-based feedback messages.
 * They’re persistent and nonmodal, allowing the user to either ignore them or interact
 * with them at any time.
 */
export const Toast = ({
  id,
  ariaLabel,
  className,
  title,
  variant = ToastVariant.neutral,
  action,
  hasCloseBtn = true,
  dismissInterval,
  onClose,
}: ToastProps) => {
  const classes = {
    container: cn(className, 'p-2 flex items-center rounded-lg min-h-12 w-full', Variants[variant]),
  };

  const { deleteToast } = useToast();

  useEffect(() => {
    if (!dismissInterval) return;

    const timer = setTimeout(() => {
      if (id) deleteToast(id);
    }, dismissInterval);

    return () => clearTimeout(timer);
  }, []);

  const handleCloseBtnClick = () => {
    if (!hasCloseBtn) return;
    if (id) deleteToast(id);
    if (onClose) onClose();
  };

  const handleActionBtnClick = () => {
    if (!action) return;

    const { onActionClick } = action;
    if (onActionClick) onActionClick();
  };

  /* Render JSX */
  return (
    <div
      className={classes.container}
      role="alert"
      aria-label={ariaLabel}
      aria-labelledby={`title-${id}`}
      aria-describedby={`description-${id}`}
      tabIndex={0}
    >
      {/* CONTENT */}
      <div className="e-flex e-items-center e-flex-col">
        {/* TITLE */}
        <div id={`title-${id}`} className="e-text-sm e-font-semi-bold e-text-neutral-50">
          {title}
        </div>
      </div>

      <div className="e-flex e-items-center e-space-x-3 e-ml-auto">
        {/* ACTION */}
        {action && (
          <Button variant={ButtonVariant.secondary} size={ButtonSize.xs} onClick={handleActionBtnClick}>
            {action.label}
          </Button>
        )}
        {/* CLOSE BTN */}
        {hasCloseBtn && (
          <Button
            variant={ButtonVariant.ghost}
            size={ButtonSize.xs}
            onClick={handleCloseBtnClick}
            startIcon={IconCatalog.close}
          />
        )}
      </div>
    </div>
  );
};
