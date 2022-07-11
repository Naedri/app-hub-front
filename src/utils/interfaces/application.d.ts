// Application is one of the application loaded from the server for which the current user may have access.
// Application.description is optional, but if it is defined it must include at least 'en' attribute
export type Application = {
  id: number;
  name: string;
  landingPage?: string;
  description?: { en: string; [key?: string]: string };
  url?: string;
};
