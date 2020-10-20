import { makepuzzle, solvepuzzle } from "sudoku";
import CellData, { nullOrNumber } from "@/types/CellData";

export default class Puzzle {
  private _sourcePuzzle = new Array<nullOrNumber>();
  private _puzzle = new Array<CellData>();
  private _solvedPuzzle = new Array<number>();

  constructor() {
    this._sourcePuzzle = makepuzzle();
    this._puzzle = this._sourcePuzzle.map(this.initCell);
    this._solvedPuzzle = solvepuzzle(this._sourcePuzzle);
  }

  get cells() {
    return this._puzzle;
  }

  set cells(newValue: Array<CellData>) {
    this._puzzle = newValue;
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

  private forEachDiff(
    arr1: Array<nullOrNumber>,
    arr2: Array<number>
  ): Array<number> {
    const result = [];
    for (let i = 0; i < arr1.length; i++) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      result.push((arr1[i] === null ? arr2[i] : arr1[i]!) - arr2[i]);
    }

    return result;
  }

  private findErrors(arr: Array<number>): Array<number> {
    const result = [];

    for (let i = 0; i < arr.length; i++) if (!(arr[i] == 0)) result.push(i);

    return result;
  }

  public validatePuzzle(): Array<number> {
    function convert(obj: CellData) {
      if (obj.number === null) {
        return obj.number;
      } else {
        return obj.number - 1;
      }
    }

    const puzzle = this._puzzle.map(convert);
    const diff = this.forEachDiff(puzzle, this._solvedPuzzle);

    return this.findErrors(diff);
  }

  public resetPuzzle(): void {
    this._puzzle = this._sourcePuzzle.map(this.initCell);
  }
}
