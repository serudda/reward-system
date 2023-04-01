import React, { createContext, useContext, useRef, useState } from 'react';
import { createId } from '@paralleldrive/cuid2';

import { type ToastProps } from '~/components/Notifications/Toast/Toast';

export interface ToastContextType {
  currentToasts: Array<ToastProps>;
  addToast: (toast: ToastProps) => void;
  deleteToast: (toastId: string | number) => void;
}

interface ToastProviderProps {
  children: React.ReactNode;
}

/*  CONTEXT DEFINITION  */
export const ToastContext = createContext<ToastContextType>({} as ToastContextType);

export const ToastProvider = ({ children }: ToastProviderProps): JSX.Element => {
  const [currentToasts, setCurrentToasts] = useState<Array<ToastProps>>([]);
  const currentToastsRef = useRef(currentToasts);
  currentToastsRef.current = currentToasts;

  const addToast = (toast: ToastProps) => {
    // Internal toast id to stack more than one
    const id = createId();
    const newToasts = [...currentToastsRef.current, { ...toast, id }];
    setCurrentToasts(newToasts);
  };

  const deleteToast = (toastId: string | number) => {
    const newToasts = currentToastsRef.current.filter((currentToast) => currentToast.id !== toastId);
    setCurrentToasts([...newToasts]);
  };

  const toastProviderValue = {
    currentToasts,
    addToast,
    deleteToast,
  };

  return <ToastContext.Provider value={toastProviderValue}>{children}</ToastContext.Provider>;
};

/*   EXPORT USE METHOD   */
export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToastContext must be wrapped within ToastWrapper');
  return context;
};
