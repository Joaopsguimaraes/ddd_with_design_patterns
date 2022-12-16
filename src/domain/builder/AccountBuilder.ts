import Account from "../entity/Account";

export default class AccountBuilder {
  bank: string | undefined;
  branch: string | undefined;
  account: string | undefined;
  document: string;

  constructor(document: string) {
    this.document = document;
  }

  public setBank(bank: string) {
    this.bank = bank;
    return this;
  }

  public setBranch(branch: string) {
    this.branch = branch;
    return this;
  }

  public setAccount(account: string) {
    this.account = account;
    return this;
  }

  public build(): Account {
    const account = new Account(this);
    return account;
  }
}
