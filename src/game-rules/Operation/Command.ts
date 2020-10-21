import CellData, { nullOrNumber } from "@/types/CellData";

export interface Command<T> {
  execute(state: T, ...args: never): void;
}

export abstract class MutationCellCommand implements Command<CellData> {
  public index: number;

  constructor(index: number) {
    this.index = index;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  execute(state: CellData): void {
    //
  }
}

export class SetValueCommand extends MutationCellCommand {
  private readonly _payload: nullOrNumber;
  private _previousValue: nullOrNumber;

  constructor(payload: nullOrNumber, index: number) {
    super(index);
    this._payload = payload;
    this._previousValue = null;
  }

  get payload() {
    return this._payload;
  }

  get previousValue() {
    return this._previousValue;
  }

  public execute(state: CellData): void {
    this._previousValue = state.number;

    if (state.number == this._payload) {
      state.number = null;
    } else {
      state.number = this._payload;
      state.draftNumbers = new Set();
    }
  }
}

export class SetDraftCommand extends MutationCellCommand {
  private readonly _payload: number;

  constructor(payload: number, index: number) {
    super(index);
    this._payload = payload;
  }

  get payload() {
    return this._payload;
  }

  public execute(state: CellData): void {
    if (typeof this._payload == "number") {
      this.inputUniqueNumber(state, this._payload);
      state.number = null;
    } else state.draftNumbers = new Set();
  }

  private inputUniqueNumber(cell: CellData, value: number): void {
    if (cell.draftNumbers?.has(value)) {
      cell.draftNumbers?.delete(value);
      cell.draftNumbers = new Set(cell.draftNumbers);
    } else if (cell.draftNumbers !== undefined) {
      cell.draftNumbers = new Set([...cell.draftNumbers?.add(value)].sort());
    }
  }
}

export class UndoOperationCommand implements Command<Array<CellData>> {
  private readonly _payload: Command<CellData>;

  constructor(payload: Command<CellData>) {
    this._payload = payload;
  }

  public execute(state: Array<CellData>): void {
    if (!state) {
      return;
    }

    if (this._payload instanceof SetValueCommand) {
      state[this._payload.index].number = this._payload.previousValue;
      state.splice(this._payload.index, 1, state[this._payload.index]);
    } else if (this._payload instanceof SetDraftCommand) {
      const element = state[this._payload.index];
      element.draftNumbers?.delete(this._payload.payload);
      state.splice(this._payload.index, 1, element);
    }
  }
}
