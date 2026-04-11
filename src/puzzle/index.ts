import type { Config } from "../config.js";
import { getPuzzle } from "./getPuzzle.js";
import { getPuzzleAll } from "./getPuzzleAll.js";
import { getPuzzleAllByCategory } from "./getPuzzleAllByCategory.js";
import type {
  GetPuzzleResponse,
  GetPuzzleAllResponse,
  GetPuzzleAllByCategoryResponse,
} from "./types.js";

export class PuzzleModule {
  constructor(private config: Config) {}

  public async get(id: string): Promise<GetPuzzleResponse> {
    return getPuzzle(this.config, id);
  }

  public async getAll(): Promise<GetPuzzleAllResponse> {
    return getPuzzleAll(this.config);
  }

  public async getAllByCategory(): Promise<GetPuzzleAllByCategoryResponse> {
    return getPuzzleAllByCategory(this.config);
  }
}
