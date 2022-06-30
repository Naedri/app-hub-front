export type ErrorFromServer = {
  response: {
    status: number;
  };
  message: string;
};

export interface ErrorClient {
  name: string;
  message: string;
}
