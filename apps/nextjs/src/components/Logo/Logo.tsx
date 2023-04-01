import React from 'react';
import Link from 'next/link';
import cn from 'classnames';

export enum LogoColor {
  default = '#FF5C61',
  blue = '#3983F7',
  light = '#F2F2F2',
  dark = '#060606',
  primary = '#4E55FF',
}

export enum LogoType {
  symbol = 'symbol',
  wordmark = 'wordmark',
  complete = 'complete',
}

export interface LogoProps {
  /**
   * Define if Logo is and link.
   */
  hasLink?: boolean;

  /**
   * Specify the label of the logo.
   */
  arialLabel?: string;

  /**
   * Specify the color of the logo.
   */
  color?: LogoColor;

  /**
   * Type of the logo element.
   */
  type?: LogoType;

  /**
   * Sets the width of the logo in pixels
   */
  width?: string;

  /**
   * Sets the height of the logo in pixels
   */
  height?: string;

  /**
   * Specify an optional className to be added to the component
   */
  className?: string;
}

type Type = {
  symbol: () => JSX.Element;
  wordmark: () => JSX.Element;
  complete: () => JSX.Element;
};

/**
 * @description
 * The logo is a visual representation of a brand or product.
 * It can be a word or an image, or a combination of both.
 */

export const Logo = ({
  hasLink = true,
  width = '16px',
  height = '20.81px',
  arialLabel,
  color = LogoColor.light,
  type = LogoType.symbol,
  className,
}: LogoProps) => {
  const classes = cn(className, 'e-inline-flex');

  const logo: Type = {
    // SYMBOL
    symbol: () => {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill={color} viewBox="0 0 10 14">
          <path d="M10 13.01H0V0h5.065C6.15 0 7.035.193 7.72.58a4.037 4.037 0 0 1 1.57 1.532c.374.648.56 1.365.56 2.15 0 .972-.299 1.844-.897 2.617a4.242 4.242 0 0 1-2.261 1.514L10 13.009ZM1.178.691l5.084 7.102a3.576 3.576 0 0 0 2.074-1.252c.549-.66.823-1.42.823-2.28 0-.686-.168-1.309-.505-1.87-.336-.56-.81-.99-1.42-1.29-.549-.273-1.265-.41-2.15-.41H1.178Zm-.486.448v6.71h4.803L.692 1.14Zm0 11.178h8l-2.73-3.795-.579.02H.692v3.775Z" />
        </svg>
      );
    },

    // WORDMARK
    wordmark: () => {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill={color} viewBox="0 0 10 14">
          <path d="M10 13.01H0V0h5.065C6.15 0 7.035.193 7.72.58a4.037 4.037 0 0 1 1.57 1.532c.374.648.56 1.365.56 2.15 0 .972-.299 1.844-.897 2.617a4.242 4.242 0 0 1-2.261 1.514L10 13.009ZM1.178.691l5.084 7.102a3.576 3.576 0 0 0 2.074-1.252c.549-.66.823-1.42.823-2.28 0-.686-.168-1.309-.505-1.87-.336-.56-.81-.99-1.42-1.29-.549-.273-1.265-.41-2.15-.41H1.178Zm-.486.448v6.71h4.803L.692 1.14Zm0 11.178h8l-2.73-3.795-.579.02H.692v3.775Z" />
        </svg>
      );
    },

    // COMPLETE
    complete: () => {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill={color} viewBox="0 0 10 14">
          <path d="M10 13.01H0V0h5.065C6.15 0 7.035.193 7.72.58a4.037 4.037 0 0 1 1.57 1.532c.374.648.56 1.365.56 2.15 0 .972-.299 1.844-.897 2.617a4.242 4.242 0 0 1-2.261 1.514L10 13.009ZM1.178.691l5.084 7.102a3.576 3.576 0 0 0 2.074-1.252c.549-.66.823-1.42.823-2.28 0-.686-.168-1.309-.505-1.87-.336-.56-.81-.99-1.42-1.29-.549-.273-1.265-.41-2.15-.41H1.178Zm-.486.448v6.71h4.803L.692 1.14Zm0 11.178h8l-2.73-3.795-.579.02H.692v3.775Z" />
        </svg>
      );
    },
  };
  if (!hasLink)
    return (
      <div className={classes} aria-label={arialLabel}>
        {logo[type]()}
      </div>
    );
  return (
    <Link className={classes} aria-label={arialLabel} rel="noopener noreferrer" href="/">
      {logo[type]()}
    </Link>
  );
};
