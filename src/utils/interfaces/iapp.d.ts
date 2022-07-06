//TODO update description type
export interface IApp {
  id: number;
  name: string;
  landingPage?: string;
  description?: { en: string; no: string };
  url?: string;
}
