import { makepuzzle, solvepuzzle } from "sudoku";
import CellData from "@/types/CellData";
import * as R from "ramda";

function tryConvertToNumber(obj: unknown) {
  if (obj === null) {
    return obj;
  } else {
    return Number(obj) + 1;
  }
}

function convert(obj: CellData) {
  if (obj.number === null) {
    return obj.number;
  } else {
    return obj.number - 1;
  }
}

function initCell(e: unknown): CellData {
  const cellValue = tryConvertToNumber(e);
  return new CellData(cellValue, !!cellValue ?? false);
}

export function generatePuzzle(): Array<CellData> {
  return makepuzzle().map(initCell);
}

export function validatePuzzle(board: Array<CellData>): boolean {
  const puzzle = board.map(convert);
  const solvedPuzzle = solvepuzzle(puzzle);

  return R.equals(puzzle, solvedPuzzle);
}
