export interface Config {
  baseUrl: string;
  getToken: () => Promise<string | null>;
}

let globalConfig: Config | null = null;

export function setConfig(config: Config): void {
  if (!config.baseUrl) throw new Error("[VILAHACK SDK] baseUrl is required");
  if (!config.getToken) throw new Error("[VILAHACK SDK] getToken is required");
  globalConfig = config;
}

export function getConfig(): Config {
  if (!globalConfig) throw new Error("[VILAHACK SDK] config is not set");
  return globalConfig;
}
