import { Subject } from "rxjs";
import { ComponentBase } from "./base.component";

export class DestroyableComponent extends ComponentBase {
  protected onDestroy: Subject<void> = new Subject<void>();

  protected destroy() {
    this.onDestroy.next();
  }
}
