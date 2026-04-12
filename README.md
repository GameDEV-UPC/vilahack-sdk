# Vilahack SDK

The official, strongly-typed TypeScript SDK for the Vilahack API. 

Built with zero external dependencies, this SDK provides a seamless developer experience with comprehensive type safety, intelligent error handling (Result pattern), and built-in dynamic authentication routing.

## Installation

Install the package via npm, yarn, or pnpm:

```bash
npm install @gamedev.upc/vilahack-sdk
```

## Usage

The SDK uses a client instance pattern. You must create and configure a single instance of the client to use throughout your application.

In this example, we configure the SDK and use Supabase to dynamically inject the freshest authentication token into every request.

```ts
// src/lib/vilahack.ts
import { createClient } from "@gamedev.upc/vilahack-sdk";
import { supabase } from "./supabase";
import { API_URL } from "@constants/api";

// Create and export the configured client
export const vilahack = createClient({
  baseUrl: API_URL,
  getToken: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.access_token || null;
  },
});
```

Once configured, simply import your vilahack instance into any file to make strictly-typed API calls.

```ts
import { vilahack } from "@lib/vilahack";

// User Module
const userResponse = await vilahack.user.get()

// Team Module
const teamResponse = await vilahack.team.get()
```

## Importing TypeScript

Because types are completely separate from your configured instance, you should import them directly from the raw package using the import type syntax.

```ts
// User Types
import type { GetUserError } from "@gamedev.upc/vilahack-sdk/user"

// Team Types
import type { GetTeamError } from "@gamedev.upc/vilahack-sdk/team"
```
