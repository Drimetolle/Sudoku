import { makepuzzle } from "sudoku";
import CellData from "@/types/CellData";

function tryConvertToNumber(obj: unknown) {
  if (obj === null) {
    return obj;
  } else {
    return Number(obj) + 1;
  }
}

function initCell(e: unknown): CellData {
  const cellValue = tryConvertToNumber(e);
  return new CellData(cellValue, !!cellValue ?? false);
}

export function generatePuzzle(): Array<CellData> {
  return makepuzzle().map(initCell);
}
