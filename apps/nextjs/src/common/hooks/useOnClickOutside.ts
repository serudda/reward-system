import { useCallback, useEffect } from 'react';

/**
 * Hook used for getting the click outside event of a container.
 */
export const useOnClickOutside = (element: any, handler: any): void => {
  const listener = useCallback(
    (event: any) => {
      if (!element || element.contains(event.target)) return;
      handler(event);
    },
    [element, handler],
  );

  useEffect(() => {
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return (): void => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
    // eslint-disable-next-line
  }, [element]);
};
