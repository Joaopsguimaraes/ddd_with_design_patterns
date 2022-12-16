import Account from "../../domain/entity/Account";
import AccountBuilder from "../../domain/builder/AccountBuilder";
import AccountRepository from "../../domain/repository/AccountRepository";
import CreditCommand from "../command/CreditCommand";
import DebitCommand from "../command/DebitCommand";
import Publisher from "../../infra/queue/Publisher";
import TransferCommand from "../command/TransferCommand";

export default class AccountApplicationService {
  constructor(
    readonly publisher: Publisher,
    readonly accountRepository: AccountRepository
  ) {}

  public create(document: string): void {
    const account = new AccountBuilder(document).build();
    this.accountRepository.save(account);
  }

  public credit(accountDocument: string, amount: number): void {
    const creditCommand = new CreditCommand(accountDocument, amount);
    this.publisher.publish(creditCommand);
  }

  public debit(accountDocument: string, amount: number): void {
    const debitCommand = new DebitCommand(accountDocument, amount);
    this.publisher.publish(debitCommand);
  }

  public transfer(
    accountDocumentFrom: string,
    accountDocumentTo: string,
    amount: number
  ): void {
    const transferCommand = new TransferCommand(
      accountDocumentFrom,
      accountDocumentTo,
      amount
    );
    this.publisher.publish(transferCommand);
  }

  public get(accountDocument: string): Account {
    return this.accountRepository.get(accountDocument);
  }
}
