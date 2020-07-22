export default class CellData {
  public number: number | null;
  public isReadOnly: boolean;

  constructor(number: number | null, isReadOnly: boolean) {
    this.number = number;
    this.isReadOnly = isReadOnly;
  }
}
