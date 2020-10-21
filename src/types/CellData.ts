export type nullOrNumber = null | number;

export default class CellData {
  public number: nullOrNumber;
  public draftNumbers?: Set<number>;
  public isReadOnly: boolean;
  public isHovered: boolean;
  public isErrored: boolean | undefined;

  constructor(number: nullOrNumber, isReadOnly: boolean) {
    this.number = number;
    this.isReadOnly = isReadOnly;
    this.isHovered = false;
    if (!isReadOnly) {
      this.draftNumbers = new Set<number>();
      this.isErrored = false;
    }
  }
}
