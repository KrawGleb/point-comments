import { Comment } from "../models/comment.model";

export class CommentTableBuilder {
  public build(comments: Comment[]) {
    const table = document.createElement("table");
    table.classList.add("table");

    table.style.textAlign = "center";

    this.addBody(table, comments);

    return table;
  }

  private addBody(table: HTMLTableElement, comments: Comment[]) {
    const tbody = document.createElement("tbody");

    this.fillBodyWithData(tbody, comments);

    table.appendChild(tbody);
  }

  private fillBodyWithData(
    tbody: HTMLTableSectionElement,
    comments: Comment[]
  ) {
    comments.forEach((comment) => {
      const tr = document.createElement("tr");
      const td = document.createElement("td");
      td.textContent = comment.text;

      tr.appendChild(td);
      tbody.append(tr);
    });
  }
}
