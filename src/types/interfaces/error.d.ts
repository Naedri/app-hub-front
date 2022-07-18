export type ErrorFromServer = {
  code?: number;
  message?: string;
  config?: {
    withCredentials?: boolean;
  };
};

/**
 * key will be used for the translation
 */
export type ErrorClient = {
  key: string;
  message?: string;
  advice?: string;
};
