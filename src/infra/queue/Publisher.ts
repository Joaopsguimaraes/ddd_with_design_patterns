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
