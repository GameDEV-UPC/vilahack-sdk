import type { GlobalError, ServiceResponse } from "../types.js";

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

export interface PuzzleParams {
  id: string;
}

export interface SolvePuzzleParams {
  id: string;
  flag: string;
}

export type GetPuzzleErrorCode = GlobalError | "PUZZLE_NOT_FOUND";
export type GetPuzzleAllErrorCode = GlobalError;
export type GetPuzzleAllByCategoryErrorCode = GlobalError;
export type SolvePuzzleErrorCode = GlobalError | "NOT_IN_NETWORK" | "INCORRECT_FLAG";
export type GetPuzzleFilesErrorCode = GlobalError | "NOT_IN_NETWORK" | "PUZZLE_NOT_FOUND";
export type GetNextClueErrorCode = GlobalError;

export type GetPuzzleResponse = ServiceResponse<Puzzle, GetPuzzleErrorCode>;
export type GetPuzzleAllResponse = ServiceResponse<Puzzle[], GetPuzzleAllErrorCode>;
export type GetPuzzleAllByCategoryResponse = ServiceResponse<
  PuzzleByCategoryMap,
  GetPuzzleAllByCategoryErrorCode
>;
export type SolvePuzzleResponse = ServiceResponse<boolean, SolvePuzzleErrorCode>;
export type GetPuzzleFilesResponse = ServiceResponse<Blob, GetPuzzleFilesErrorCode>;
export type GetNextClueResponse = ServiceResponse<Puzzle, GetNextClueErrorCode>;
