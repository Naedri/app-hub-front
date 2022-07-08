export type ErrorFromServer = {
  response: {
    status: number;
  };
  message: string;
};

export type ErrorClient = {
  name: string;
  message: string;
};
