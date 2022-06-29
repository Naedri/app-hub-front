import type { ITranslation } from '../../../utils/interfaces/other';

const enTranslation: ITranslation = {
  auth: {
    qMissingAccount: "Don't have an account ?",
    signup: 'Sign up',
    login: 'Log in',
    email: 'email',
    emailExample: 'johndoe@provider.com',
    password: 'password',
    passwordExample: 'an awesome password',
    invalidIdentification: 'Provided authentications are wrong.',
    profile: 'profile',
    redirectingToProfile: 'Redirecting to your profile.',
  },
  app: {},
  common: {
    validation: 'OK',
    cancel: 'Cancel',
    loading: 'Loading',
    redirecting: 'Redirecting {{preposition}} {{somewhere}}',
    to: 'to',
    tryAgain: 'Please try again.',
  },
  error: {
    404: 'Not found',
    unknown: 'Some strange thing happened',
  },
};

export default enTranslation;
