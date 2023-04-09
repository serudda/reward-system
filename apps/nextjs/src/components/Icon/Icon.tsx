import React from 'react';

export enum IconCatalog {
  adjustmentsHorizontal = 'M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75',
  arrowLongLeft = 'M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18',
  arrowLongRight = 'M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3',
  chevronDown = 'M19.5 8.25l-7.5 7.5-7.5-7.5',
  gitHub = 'M12 2C6.478 2 2 6.478 2 12c0 4.418 2.865 8.167 6.84 9.49.498.092.66-.218.66-.482v-1.861c-2.782.605-3.36-1.18-3.36-1.18-.456-1.156-1.112-1.464-1.112-1.464-.907-.62.07-.607.07-.607 1.004.07 1.532 1.03 1.532 1.03.892 1.529 2.34 1.087 2.91.832.09-.646.348-1.088.635-1.337-2.22-.254-4.556-1.112-4.556-4.943a3.87 3.87 0 0 1 1.03-2.684c-.103-.252-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.59 9.59 0 0 1 12 6.836a9.62 9.62 0 0 1 2.505.337c1.91-1.294 2.748-1.026 2.748-1.026.544 1.378.201 2.396.098 2.647.642.7 1.029 1.593 1.029 2.684 0 3.841-2.34 4.687-4.566 4.935.358.31.686.918.686 1.851v2.744c0 .266.16.579.668.48A10.003 10.003 0 0 0 22 12c0-5.522-4.477-10-10-10Z',
  xCircle = 'M6 18L18 6M6 6l12 12',
}

export interface IconProps {
  /**
   * The icon to display
   */
  icon: IconCatalog;

  /**
   * Specify if the icon is solid or not.
   */
  isSolid?: boolean;

  strokeWidth?: number;

  /**
   * Specify an optional className to be added to the component.
   */
  className?: string;

  /**
   * The callback to get notified when the icon was clicked.
   */
  onClick?: (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
}

/**
 * The Icons catalog
 */
export const Icon = ({
  icon = IconCatalog.arrowLongRight,
  isSolid = false,
  strokeWidth = 1.5,
  className,
  onClick,
}: IconProps) => {
  return (
    <svg
      data-testid="Icon"
      className={className}
      stroke={isSolid ? undefined : 'currentColor'}
      fill={isSolid ? 'currentColor' : undefined}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      strokeWidth={strokeWidth}
      focusable="false"
      aria-hidden="true"
      onClick={onClick}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
    </svg>
  );
};
