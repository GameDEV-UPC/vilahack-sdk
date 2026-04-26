# Vilahack SDK

The official, strongly-typed TypeScript SDK for the Vilahack API.

Built with zero external dependencies, this SDK provides a seamless developer experience with comprehensive type safety, intelligent error handling (Result pattern), and built-in dynamic authentication routing.

## Installation

Install the package via npm, yarn, or pnpm:

```bash
npm install @gamedev.upc/vilahack-sdk@latest
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
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return session?.access_token || null;
  },
});
```

Once configured, simply import your vilahack instance into any file to make strictly-typed API calls.

```ts
import { vilahack } from "@lib/vilahack";

// User Module
const userResponse = await vilahack.user.getQR();

// Application Submodule
const applicationResponse = await vilahack.user.application().get();

// Attendance Submodule
const attResponse = await vilahack.user.attendance.confirm();

// Team Module
const teamResponse = await vilahack.team.get();
```

## Importing TypeScript

Because types are completely separate from your configured instance, you should import them directly from the raw package using the import type syntax.

```ts
// User Types
import type { GetUserErrorCode } from "@gamedev.upc/vilahack-sdk/user";

// Team Types
import type { GetTeamErrorCode } from "@gamedev.upc/vilahack-sdk/team";
```

## References

<details>
<summary><b>User Module Reference</b></summary>

| Method          | Parameters          | Description                                             |
| :-------------- | :------------------ | :------------------------------------------------------ |
| `get(data?)`    | `UserRequest`       | Fetches current user, or a specific user by ID/QR.      |
| `getQR(data?)`  | `QRRequest`         | Returns a QR code SVG for check-in.                     |

<details>
<summary><b> Application Submodule Reference</b></summary>

| Method          | Parameters          | Description                                             |
| :-------------- | :------------------ | :------------------------------------------------------ |
| `get()`         | `ApplicationParams`              | Fetches the current user's application details.         |
| `update(data)`  | `UpdateApplicationRequest` | Updates the current user's application details.         |
| `submit(data)`  | `SubmitApplicationRequest` | Submits the current user's application for review.      |
| `listSummaries()` | `none` | Lists all user's application summaries.         |

</details>

<details>
<summary><b> Attendance Submodule Reference</b></summary>

| Method          | Parameters          | Description                                             |
| :-------------- | :------------------ | :------------------------------------------------------ |
| `accept(params)`| `AttendanceParams`      | Accepts the specified user's attendance request.          |
| `checkIn(params)`| `AttendanceParams`      | Checks in the specified user for the current event.    |
| `confirm()`     | `none`              | Confirms attendance for the current user.               |
| `cancel()`      | `none`              | Cancels attendance for the current user.                |
| `cancel()`      | `none`              | Cancels the current user's attendance request.           |

</details>
</details>

<details>
<summary><b>Team Module Reference</b></summary>

| Method         | Parameters     | Description                                          |
| :------------- | :------------- | :--------------------------------------------------- |
| `get()`        | `none`         | Fetches the team details for the current user.       |
| `create(params)` | `TeamParams` | Creates a new team with the provided name.           |
| `update(params)` | `TeamParams` | Updates the current team's name.                  |
| `join(id)`     | `id: string`   | Joins an existing team using the team's unique uuid. |
| `leave()`      | `none`         | Removes the current user from their team.            |

</details>

<details>
<summary><b>Puzzle Module Reference</b></summary>

| Method               | Parameters   | Description                                                 |
| :------------------- | :----------- | :---------------------------------------------------------- |
| `get(id)`            | `id: string` | Fetches details for a specific puzzle by its ID.            |
| `getAll()`           | `none`       | Retrieves a list of all available puzzles.                  |
| `getAllByCategory()` | `none`       | Retrieves all puzzles grouped by their specific categories. |

</details>

<details>
<summary><b>Leaderboard Module Reference</b></summary>

| Method               | Parameters   | Description                                                 |
| :------------------- | :----------- | :---------------------------------------------------------- |
| `get()`              | `none`       | Fetches the current event's leaderboard.                    |

</details>
