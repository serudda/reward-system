import i18n from 'i18next';

type ErrorMessages = {
  [key: string]: string;
};

const errors: ErrorMessages = {
  Signin: 'Try signing with a different account.',
  OAuthSignin: 'Try signing with a different account.',
  OAuthCallback: 'Try signing with a different account.',
  OAuthCreateAccount: 'Try signing with a different account.',
  EmailCreateAccount: 'Try signing with a different account.',
  Callback: 'Try signing with a different account.',
  OAuthAccountNotLinked: 'To confirm your identity, sign in with the same account you used originally.',
  EmailSignin: 'Check your email address.',
  CredentialsSignin: 'Sign in failed. Check the details you provided are correct.',
  UserNotFound: i18n.t('app.nextjs.error.gitHubNotConnect.description'),
  default: 'Unable to sign in.',
};

export const AuthError = (error = 'default'): string => errors[error] as string;
