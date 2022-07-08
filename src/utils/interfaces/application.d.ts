// IApp.description is optional, but if it is defined it must include at least 'en' attribute
export type Application = {
  id: number;
  name: string;
  landingPage?: string;
  description?: { en: string; [key?: string]: string };
  url?: string;
};
