export type ErrorFromServer = {
  code?: number;
  message?: string;
  config?: {
    withCredentials?: boolean;
  };
};

export type ErrorClient = {
  name: string;
  message: string;
};
