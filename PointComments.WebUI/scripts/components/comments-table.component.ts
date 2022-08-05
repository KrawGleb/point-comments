import { getRandomColor } from "../helpers/random.helpers";
import { Comment } from "../models/comment.model";
import { ComponentBase } from "./base.component";
import { PointComponent } from "./point.component";

export class CommentsTableComponent extends ComponentBase {
  private readonly parentRef: PointComponent;

  private comments: Comment[];
  private table: HTMLTableElement;

  constructor(comments: Comment[], parentRef: PointComponent) {
    super();

    this.parentRef = parentRef;
    this.comments = comments ?? [];

    this.init();
  }

  public getTable(): HTMLTableElement {
    return this.table;
  }

  public getComments(): Comment[] {
    return this.comments;
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

      const deleteButton = this.createDeleteButton((event) => {
        this.deleteClickHandler(comment);
      });
      const tdWithDeleteButton = document.createElement("td");
      tdWithDeleteButton.appendChild(deleteButton);

      tr.appendChild(tdWithText);
      tr.appendChild(tdWithDeleteButton);

      tbody.append(tr);
    });

    const tr = document.createElement("tr");

    const addButton = this.createAddButton((event) =>
      this.addClickHandler(addButton, event)
    );
    const tdWithAddButton = document.createElement("td");
    tdWithAddButton.appendChild(addButton);

    tr.appendChild(tdWithAddButton);
    tbody.appendChild(tr);

    return tbody;
  }

  private createDeleteButton(
    clickHandler: (event?: MouseEvent) => void
  ): HTMLButtonElement {
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

  private createAddButton(
    clickHandler: (event?: MouseEvent) => void
  ): HTMLButtonElement {
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

  private addClickHandler(button: HTMLButtonElement, event?: MouseEvent) {
    const parent = button.parentElement;
    const input = document.createElement("input");

    parent?.replaceChild(input, button);

    input.addEventListener("keyup", async (event) => {
      if (event.key === "Enter") {
        const text = input.value;

        this.comments.push({
          text,
          backgroundColor: getRandomColor(),
        } as Comment);

        await this.parentRef.update();

        this.table.innerHTML = "";
        this.table = this.addBody(this.table, this.comments);
      }
    });
  }

  private async deleteClickHandler(comment: Comment) {
    this.comments = this.comments.filter((c) => c !== comment);

    await this.parentRef.update();

    this.table.innerHTML = "";
    this.table = this.addBody(this.table, this.comments);
  }
}
