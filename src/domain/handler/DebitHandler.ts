import AccountRepository from "../repository/AccountRepository";
import DebitCommand from "../../application/command/DebitCommand";
import Observer from "../../infra/queue/Observer";

export default class DebitHandler implements Observer {
  operation: string = "debit";

  constructor(readonly accountRepository: AccountRepository) {}

  public notify(command: DebitCommand): void {
    const account = this.accountRepository.get(command.accountDocument);
    if (account) {
      account.debit(command.amount);
    }
  }
}
