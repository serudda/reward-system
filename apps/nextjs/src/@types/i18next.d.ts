/**
 * If you want to enable locale keys typechecking and enhance IDE experience.
 * Requires `resolveJsonModule:true` in your tsconfig.json.
 * @link https://www.i18next.com/overview/typescript
 */
import 'i18next';
import type { I18nNamespaces } from 'next-i18next';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: I18nNamespaces;
  }
}

// reference issue: https://github.com/i18next/react-i18next/issues/1601
declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false;
  }
}
