import AccountRepository from "../repository/AccountRepository";
import Observer from "../../infra/queue/Observer";
import TransferCommand from "../../application/command/TransferCommand";
import TransferService from "../service/TransferService";
import Account from "../entity/Account";

export default class TransferHandler implements Observer {
  public operation: string = "transfer";

  constructor(readonly accountRepository: AccountRepository) {}

  public notify(command: TransferCommand): void {
    const accountFrom: Account = this.accountRepository.get(
      command.accountDocumentFrom
    );
    const accountTo: Account = this.accountRepository.get(
      command.accountDocumentTo
    );
    if (accountFrom && accountTo) {
      const transferService = new TransferService();
      transferService.transfer(accountFrom, accountTo, command.amount);
    }
  }
}
