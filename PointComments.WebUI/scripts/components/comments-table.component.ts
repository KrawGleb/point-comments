import { Comment } from "../models/comment.model";
import { ComponentBase } from "./base.component";

export class CommentsTableComponent extends ComponentBase {
  private readonly comments: Comment[];

  private table: HTMLTableElement;

  constructor(comments: Comment[]) {
    super();

    this.comments = comments ?? [];

    this.init();
  }

  public getTable(): HTMLTableElement {
    return this.table;
  }

  public remove(): void {
    this.table.remove();
  }

  private init(): void {
    this.table = document.createElement("table");

    this.table.classList.add("table");
    this.table.classList.add("table-bordered");
    this.table.style.textAlign = "center";

    this.table = this.addBody(this.table, this.comments);
  }

  private addBody(
    table: HTMLTableElement,
    comments: Comment[]
  ): HTMLTableElement {
    let tbody = document.createElement("tbody");

    tbody = this.fillBodyWithData(tbody, comments);

    table.appendChild(tbody);

    return table;
  }

  private fillBodyWithData(
    tbody: HTMLTableSectionElement,
    comments: Comment[]
  ): HTMLTableSectionElement {
    comments.forEach((comment) => {
      const tr = document.createElement("tr");

      const tdWithText = document.createElement("td");
      tdWithText.textContent = comment.text;
      tdWithText.style.background = comment.backgroundColor;

      const deleteButton = this.createDeleteButton(() => {
        // TODO (Mb event)
      });
      const tdWithDeleteButton = document.createElement("td")
      tdWithAddButton.appendChild(deleteButton);

      tr.appendChild(tdWithText).appendChild(tdWithDeleteButton);

      tbody.append(tr);
    });

    const tr = document.createElement("tr");

    const addButton = this.createAddButton(() => {
      // TODO (Mb event)
    });
    const tdWithAddButton = document.createElement("td");
    tdWithAddButton.appendChild(addButton);

    tr.appendChild(tdWithAddButton);
    tbody.appendChild(tr);

    return tbody;
  }

  private createDeleteButton(clickHandler: () => void): HTMLButtonElement {
    const button = document.createElement("button");
    button.classList.add("btn");
    button.classList.add("btn-danger");

    const icon = document.createElement("i");
    icon.classList.add("bi");
    icon.classList.add("bi-dash-circle");

    button.appendChild(icon);

    button.onclick = clickHandler;

    return button;
  }

  private createAddButton(clickHandler: () => void): HTMLButtonElement {
    const button = document.createElement("button");
    button.classList.add("btn");
    button.classList.add("btn-success");

    const icon = document.createElement("i");
    icon.classList.add("bi");
    icon.classList.add("bi-plus-circle");

    button.appendChild(icon);

    button.onclick = clickHandler;

    return button;
  }
}
