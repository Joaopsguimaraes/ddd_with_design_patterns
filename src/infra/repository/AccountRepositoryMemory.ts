import Account from "../../domain/entity/Account";
import AccountRepository from "../../domain/repository/AccountRepository";

export default class AccountRepositoryMemory implements AccountRepository {
  public accounts: Account[];

  constructor() {
    this.accounts = [];
  }

  public get(accountDocument: string): Account {
    const account: Account | undefined = this.accounts.find(
      (account: Account): boolean => account.document === accountDocument
    );
    if (!account) throw new Error("Account not found");
    return account;
  }

  public save(account: Account) {
    this.accounts.push(account);
  }
}
