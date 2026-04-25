import inquirer from "inquirer"; // Terminal logging (for demostration propouses)
import "dotenv/config"; // To load .env config

import { createClient as createClientVilahack } from "@gamedev.upc/vilahack-sdk";
import { createClient as createClientSupabase } from "@supabase/supabase-js"; // Supabase connection library

// SUPABASE SET UP
// GET SUPABASE AUTH TOKEN
// (You need and account created to test this)
//

//You can obtain these on the vilahack supabase project.
const supabaseUrl: string = process.env.SUPABASE_TEST_URL as string;
const supabaseAnonKey: string = process.env.SUPABASE_TEST_KEY as string;

let supabaseUserAuth: string = ""; //we will change this later

export const supabase = createClientSupabase(supabaseUrl, supabaseAnonKey);

async function getCredentials() {
  const credentials = await inquirer.prompt([
    {
      type: "input",
      name: "email",
      message: "Enter your Supabase email:",
      validate: (input) => (input.includes("@") ? true : "Please enter a valid email."),
    },
    {
      type: "password",
      name: "password",
      message: "Enter your Supabase password:",
      mask: "*", // Replaces typed characters with asterisks
    },
  ]);

  return credentials;
}

// Usage with Supabase
async function login() {
  const { email, password } = await getCredentials();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) console.error("Error logging in:", error.message);
  else {
    if (data.session) {
      supabaseUserAuth = data.session.access_token;
      console.log("User logged in:", data.user);
    } else {
      console.error("ERROR: Could not retrieve session token of supabase user.");
    }
  }
}

await login();

// VILAHACK-SDK SET UP
//
//

const vilahackEndpoint: string = process.env.VILAHACK_TEST_URL as string; // Test, Prod, etc.

async function getSupabaseToken(): Promise<string | null> {
  return supabaseUserAuth; // Supabase token.
}

export const vilahack = createClientVilahack({
  baseUrl: vilahackEndpoint,
  getToken: getSupabaseToken,
});

// EXAMPLE TO RETRIEVE DATA FROM VILAHACK

const puzzles = await vilahack.puzzle.getAll();

//Print data
if (puzzles.success) {
  console.log(puzzles.data);
} else {
  console.error("Failed to load challenge:", puzzles.message);
}

// import User Types to use user interface
import type { GetApplicationResponse } from "@gamedev.upc/vilahack-sdk/user/application";

const user: GetApplicationResponse = await vilahack.user.application.get();
if (user.success) {
  console.log(user.data);
} else {
  console.log("Failed to retrieve user: ", user.message);
}
