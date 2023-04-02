import React from 'react';
import cn from 'classnames';

import { useToast } from '~/common/contexts';
import { Toast } from './Toast';

export enum ToastPlacement {
  top = 'top',
  bottom = 'bottom',
}

const Placement: Record<ToastPlacement, string> = {
  [ToastPlacement.top]: 'top-3 left-1/2 -translate-x-1/2 transform',
  [ToastPlacement.bottom]: 'bottom-3 left-1/2 -translate-x-1/2 transform',
};

export interface ToastContainerProps {
  /**
   * Specify an optional className to be added to the component
   */
  className?: string;

  /**
   * The position (relative to the target) at which the toast should appear.
   */
  placement?: ToastPlacement;
}

/**
 * The main container for all the Toasts in the app.
 */
export const ToastContainer = ({ className, placement = ToastPlacement.top }: ToastContainerProps) => {
  const classes = cn(className, 'fixed z-40 min-w-128 space-y-4', Placement[placement]);
  const { currentToasts } = useToast();

  if (currentToasts.length === 0) return null;

  const wrapperToast = currentToasts.map((toast) => (
    <div key={toast.id} className="flex w-full transform transition-all duration-300">
      <Toast {...toast} />
    </div>
  ));

  /* RENDER */
  return <div className={classes}>{wrapperToast}</div>;
};
