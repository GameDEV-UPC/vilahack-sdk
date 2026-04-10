# Vilahack SDK

The official, strongly-typed TypeScript SDK for the Vilahack API. 

Built with zero external dependencies, this SDK provides a seamless developer experience with comprehensive type safety, intelligent error handling (Result pattern), and built-in dynamic authentication routing.

## Installation

Install the package via npm, yarn, or pnpm:

```bash
npm install @gamedev.upc/vilahack-sdk
```

## Usage

To use the SDK, you'll need to configure it with your API base URL and authentication function.

In this example setup, we're using Supabase as an example authentication provider:

```ts
// lib/vilahack.ts
import { setConfig } from "@gamedev.upc/vilahack-sdk";
import { supabase } from "./supabase";
import { API_URL } from "@constants/api";

setConfig({
  baseUrl: API_URL,
  getToken: async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return session?.access_token || null;
  },
});

export * from "@gamedev.upc/vilahack-sdk";
```

After the configuration is set up, you must make sure to import your SDK methods from this new file rather than the raw package. This guarantees the SDK is configured before any API calls are made:

```ts
// BAD: Bypasses your configuration
import { User } from "@gamedev.upc/vilahack-sdk";

// GOOD: Uses your configured instance
import { User, Team } from "@lib/vilahack";

// Now you can make API calls!
const response = await User.getUser("user_123");
