// Application is one of the application loaded from the server for which the current user may have access.
// Application.description is optional, but if it is defined it must include at least 'en' attribute
export type Application = {
  isPublic: boolean;
  id: number;
  name: string;
  landingPage?: string;
  description?: { en: string; [key?: string]: string };
};

export type PublicApplication = Application;

export type PrivateApplication = Application & {
  baseUrl: string;
  accessUrlTokenized?: string;
};
