import type { GlobalError } from "../types.js";

export type Difficulty = "very_easy" | "easy" | "moderate" | "hard" | "very_hard";

export type Category =
  | "cryptography"
  | "reverse_engineering"
  | "binary_exploitation"
  | "network_security"
  | "forensics"
  | "steganography"
  | "osint"
  | "miscellaneous";

export interface Puzzle {
  id: string;
  difficulty: Difficulty;
  categories: Category[];
  points: number;
  name: string;
  prompt: string;
  clues: string[];
  start: string | null;
  end: string | null;
}

export type PuzzleByCategoryMap = Record<Category, Puzzle[]>;

export type GetPuzzleError = GlobalError | "PUZZLE_NOT_FOUND";
export type GetPuzzleAllError = GlobalError;
export type GetPuzzleAllByCategoryError = GlobalError;

export type GetPuzzleResponse =
  | { success: true; data: Puzzle }
  | { success: false; code: GetPuzzleError; message?: string };

export type GetPuzzleAllResponse =
  | { success: true; data: Puzzle[] }
  | { success: false; code: GetPuzzleAllError; message?: string };

export type GetPuzzleAllByCategoryResponse =
  | { success: true; data: PuzzleByCategoryMap }
  | { success: false; code: GetPuzzleAllByCategoryError; message?: string };
