import { nullOrNumber } from "@/types/CellData";

export enum ActionType {
  draft,
  value
}

export class Action {
  index: number;
  value: nullOrNumber;
  type: ActionType;

  constructor(value: number, index: number, type: ActionType) {
    this.value = value;
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
}
