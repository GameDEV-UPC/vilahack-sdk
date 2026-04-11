export * from "./types.js";

import { VilahackClient } from "./client.js";
import type { Config } from "./config.js";

export function createClient(config: Config) {
  return new VilahackClient(config);
}
