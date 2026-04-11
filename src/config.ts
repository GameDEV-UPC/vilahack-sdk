export interface Config {
  baseUrl: string;
  getToken: () => Promise<string | null>;
}
