## Design Patterns

### Observer
O Observer é um padrão de projeto comportamental que permite que você defina um mecanismo de assinatura para notificar múltiplos objetos sobre quaisquer eventos que aconteçam com o objeto que eles estão observando.

```ts
//interface
import Command from "../../application/command/Command";

export default interface Observer {
    operation: string;
    notify(command: Command): void;
}
```

```ts
//implementação
import Command from "../../application/command/Command";
import Observer from "./Observer";

export default class Publisher {
  public observers: Observer[];

  constructor() {
    this.observers = [];
  }

  public register(observer: Observer): void {
    this.observers.push(observer);
  }

  public publish(command: Command): void {
    for (const observer of this.observers) {
      if (observer.operation === command.operation) {
        observer.notify(command);
      }
    }
  }
}
```

```ts
//implementação
import AccountRepository from "../repository/AccountRepository";
import CreditCommand from "../../application/command/CreditCommand";
import Observer from "../../infra/queue/Observer";

export default class CreditHandler implements Observer {
  operation: string = "credit";

  constructor(readonly accountRepository: AccountRepository) {}

  notify(command: CreditCommand): void {
    const account = this.accountRepository.get(command.accountDocument);
    if (account) {
      account.credit(command.amount);
    }
  }
}
```

### Command
é um padrão de projeto comportamental que transforma um pedido em um objeto independente que contém toda a informação sobre o pedido. Essa transformação permite que você parametrize métodos com diferentes pedidos, atrase ou coloque a execução do pedido em uma fila, e suporte operações que não podem ser feitas.

**Exemplo**
```ts
//interface
export default interface Command {
  operation: string;
}
```

```ts
//implementação
import Command from "./Command";

export default class DebitCommand implements Command {
  operation: string = "transfer";

  constructor(
    readonly accountDocumentFrom: string,
    readonly accountDocumentTo: string,
    readonly amount: number
  ) {}
}
```

```ts
//implementação
export default class AccountApplicationService {
  constructor(
    readonly publisher: Publisher,
    readonly accountRepository: AccountRepository
  ) {}

  public credit(accountDocument: string, amount: number): void {
    const creditCommand = new CreditCommand(accountDocument, amount);
    this.publisher.publish(creditCommand);
  }
}
```

### Builder
O Builder é um padrão de projeto criacional que permite a você construir objetos complexos passo a passo. O padrão permite que você produza diferentes tipos e representações de um objeto usando o mesmo código de construção.

**Exemplo**
```ts
import Account from "../entity/Account";

export default class AccountBuilder {
  bank: string | undefined;
  branch: string | undefined;
  account: string | undefined;
  document: string;

  constructor(document: string) {
    this.document = document;
  }

  setBank(bank: string) {
    this.bank = bank;
    return this;
  }

  setBranch(branch: string) {
    this.branch = branch;
    return this;
  }

  setAccount(account: string) {
    this.account = account;
    return this;
  }

  build(): Account {
    const account = new Account(this);
    return account;
  }
}
```

```ts
//implementação
export default class AccountApplicationService {
  constructor(
    readonly publisher: Publisher,
    readonly accountRepository: AccountRepository
  ) {}

  create(document: string): void {
    const account = new AccountBuilder(document).build();
    this.accountRepository.save(account);
  }
}
```

```ts
//implementação na entidade
import AccountBuilder from "../builder/AccountBuilder";
import Transaction from "./Transaction";

export default class Account {
  private bank: string | undefined;
  private branch: string | undefined;
  private account: string | undefined;
  document: string;
  private transactions: Transaction[];

  constructor(accountBuilder: AccountBuilder) {
    this.bank = accountBuilder.bank;
    this.branch = accountBuilder.branch;
    this.account = accountBuilder.account;
    this.document = accountBuilder.document;
    this.transactions = [];
  }

  credit(amount: number): void {
    this.transactions.push(new Transaction("credit", amount));
  }

  debit(amount: number): void {
    this.transactions.push(new Transaction("debit", amount));
  }

  getBalance(): number {
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
```