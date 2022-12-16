import AccountBuilder from "../builder/AccountBuilder";
import Transaction from "./Transaction";

export default class Account {
  private bank: string | undefined;
  private branch: string | undefined;
  private account: string | undefined;
  public document: string;
  private transactions: Transaction[];

  constructor(accountBuilder: AccountBuilder) {
    this.bank = accountBuilder.bank;
    this.branch = accountBuilder.branch;
    this.account = accountBuilder.account;
    this.document = accountBuilder.document;
    this.transactions = [];
  }

  public credit(amount: number): void {
    this.transactions.push(new Transaction("credit", amount));
  }

  public debit(amount: number): void {
    this.transactions.push(new Transaction("debit", amount));
  }

  public getBalance(): number {
    let balance: number = 0;
    for (const transaction of this.transactions) {
      if (transaction.type === "credit") {
        balance += transaction.amount;
      }
      if (transaction.type === "debit") {
        balance -= transaction.amount;
      }
    }
    return balance;
  }
}
