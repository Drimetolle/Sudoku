import { makepuzzle, solvepuzzle } from "sudoku";
import CellData from "@/types/CellData";
import * as R from "ramda";

export default class Puzzle {
  private _puzzle = new Array<CellData>();

  constructor() {
    this._puzzle = makepuzzle().map(this.initCell);
  }

  get cells() {
    return this._puzzle;
  }

  private initCell(e: unknown): CellData {
    function tryConvertToNumber(obj: unknown) {
      if (obj === null) {
        return obj;
      } else {
        return Number(obj) + 1;
      }
    }

    const cellValue = tryConvertToNumber(e);
    return new CellData(cellValue, !!cellValue ?? false);
  }

  public validatePuzzle(): boolean {
    function convert(obj: CellData) {
      if (obj.number === null) {
        return obj.number;
      } else {
        return obj.number - 1;
      }
    }

    const puzzle = this._puzzle.map(convert);
    const solvedPuzzle = solvepuzzle(puzzle);

    return R.equals(puzzle, solvedPuzzle);
  }
}
