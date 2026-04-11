import inquirer from "inquirer"; // Terminal logging (for demostration propouses)
import "dotenv/config"; // To load .env config

import { setConfig, fetchClient } from "@gamedev.upc/vilahack-sdk";
import { createClient } from "@supabase/supabase-js"; // Supabase connection library

// SUPABASE SET UP
// GET SUPABASE AUTH TOKEN
// (You need and account created to test this)
//

//You can obtain these on the vilahack supabase project.
const supabaseUrl: string = process.env.SUPABASE_TEST_URL as string;
const supabaseAnonKey: string = process.env.SUPABASE_TEST_KEY as string;

let supabaseUserAuth: string = ""; //we will change this later

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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

setConfig({
  baseUrl: vilahackEndpoint,
  getToken: getSupabaseToken,
});

// EXAMPLE VILAHACK API CALL

async function testCall(): Promise<void> {
  //Set recieving JSON
  type Difficulty = "very_easy" | "easy" | "medium" | "hard" | "extreme";

  interface Puzzle {
    id: string; // UUID
    difficulty: Difficulty;
    categories: string[];
    points: number;
    name: string;
    prompt: string;
    clues: string[];
    start: string;
    end: string;
  }

  //Fetch data
  const response = await fetchClient<Puzzle[]>("/puzzle/all");

  //Print data
  if (response.success) {
    console.log(response.data);
    console.log(response.data);
  } else {
    console.error("Failed to load challenge:", response.error.message);
  }
}

testCall();
