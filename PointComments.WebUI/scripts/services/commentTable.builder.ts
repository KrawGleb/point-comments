import { Comment } from "../models/comment.model";
import { Point } from "../models/point.model";
import { CommentsService } from "./comments.service";

export class CommentTableBuilder {
  private commentService: CommentsService;

  public build(point: Point) {
    this.commentService = new CommentsService(point);

    const table = document.createElement("table");

    table.classList.add("table");
    table.classList.add("table-bordered");

    table.style.textAlign = "center";

    this.addBody(table, point.comments);

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

      const textTd = document.createElement("td");
      textTd.textContent = comment.text;

      const button = this.createRemoveButton(() => {
        this.commentService.deleteComment(comment.id);
      });
      const buttonTd = document.createElement("td");
      buttonTd.appendChild(button);

      tr.appendChild(textTd);
      tr.appendChild(buttonTd);

      tbody.append(tr);
    });

    const tr = document.createElement("tr");

    const button = this.createAddButton(() => {
      console.log("add comment");
    });
    const buttonTd = document.createElement("td");
    buttonTd.appendChild(button);

    tr.appendChild(buttonTd);
    tbody.append(tr);
  }

  private createAddButton(clickHandler: () => void) {
    const button = document.createElement("button");
    button.classList.add("btn");
    button.classList.add("btn-success");

    const icon = document.createElement("i");
    icon.classList.add("bi");
    icon.classList.add("bi-plus-circle");

    button.appendChild(icon);

    button.click = clickHandler;

    return button;
  }

  private createRemoveButton(clickHandler: () => void) {
    const button = document.createElement("button");
    button.classList.add("btn");
    button.classList.add("btn-danger");

    const icon = document.createElement("i");
    icon.classList.add("bi");
    icon.classList.add("bi-dash-circle");

    button.appendChild(icon);

    button.click = clickHandler;

    return button;
  }
}
