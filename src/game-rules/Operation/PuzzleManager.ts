import Puzzle from "@/game-rules/Puzzle";
import CellData from "@/types/CellData";
import { Command, UndoOperationCommand } from "./Command";

export default class PuzzleManager {
  private readonly _puzzle: Puzzle;
  private readonly _history: Array<Command<CellData>>;

  constructor(puzzle: Puzzle) {
    this._puzzle = puzzle;
    this._history = new Array<Command<CellData>>();
  }

  get puzzle() {
    return this._puzzle;
  }

  executeCommand(state: CellData, command: Command<CellData>) {
    command.execute(state);
    this._history.push(command);
  }

  undo() {
    const lastCommand = this._history.pop();

    if (lastCommand) {
      const command = new UndoOperationCommand(lastCommand);
      command.execute(this._puzzle.cells);
    }
  }
}
