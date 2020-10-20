import { nullOrNumber } from "@/types/CellData";

export enum ActionType {
  draft,
  value
}

export class Action {
  index: number;
  value: nullOrNumber;
  previousValue: nullOrNumber;
  type: ActionType;

  constructor(
    value: nullOrNumber,
    previousValue: nullOrNumber,
    index: number,
    type: ActionType
  ) {
    this.value = value;
    this.previousValue = previousValue;
    this.index = index;
    this.type = type;
  }
}

export default class ActionQueue {
  private _queue: Array<Action>;

  constructor() {
    this._queue = new Array<Action>();
  }

  push(action: Action) {
    this._queue.push(action);
  }

  pop(): Action | undefined {
    return this._queue.pop();
  }
}
