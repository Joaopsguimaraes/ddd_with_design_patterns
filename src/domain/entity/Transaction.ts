export default class Transaction {
  private _type: string | undefined;
  private _amount: number | undefined;

  constructor(readonly type: string, readonly amount: number) {
    this._type = type;
    this._amount = amount;
  }
}
