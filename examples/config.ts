import { getConfig, setConfig } from "@gamedev.upc/vilahack-sdk";

// Set API endpoint
const url: string = "API_URL"; // Test, Prod, etc.

async function getToken(): Promise<string | null> {
  return "API_TOKEN"; // Supabase token.
}

// Set config
setConfig({
  baseUrl: url,
  getToken: getToken,
});

// Example for verification
console.log(getConfig());
