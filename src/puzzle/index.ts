export * from "./types.js";

import type { Config } from "../config.js";
import { getNextClue } from "./getNextClue.js";
import { getPuzzle } from "./getPuzzle.js";
import { getPuzzleAll } from "./getPuzzleAll.js";
import { getPuzzleAllByCategory } from "./getPuzzleAllByCategory.js";
import { getPuzzleFiles } from "./getPuzzleFiles.js";
import { solvePuzzle } from "./solvePuzzle.js";
import type {
  GetPuzzleResponse,
  GetPuzzleAllResponse,
  GetPuzzleAllByCategoryResponse,
  PuzzleParams,
  GetPuzzleFilesResponse,
  SolvePuzzleResponse,
  SolvePuzzleParams,
  GetNextClueResponse,
} from "./types.js";

export class PuzzleModule {
  constructor(private config: Config) {}

  public async get(params: PuzzleParams): Promise<GetPuzzleResponse> {
    return getPuzzle(this.config, params);
  }

  public async list(): Promise<GetPuzzleAllResponse> {
    return getPuzzleAll(this.config);
  }

  public async listByCategory(): Promise<GetPuzzleAllByCategoryResponse> {
    return getPuzzleAllByCategory(this.config);
  }

  public async solve(params: SolvePuzzleParams): Promise<SolvePuzzleResponse> {
    return solvePuzzle(this.config, params);
  }

  public async files(params: PuzzleParams): Promise<GetPuzzleFilesResponse> {
    return getPuzzleFiles(this.config, params);
  }

  public async getNextClue(params: PuzzleParams): Promise<GetNextClueResponse> {
    return getNextClue(this.config, params);
  }
}
