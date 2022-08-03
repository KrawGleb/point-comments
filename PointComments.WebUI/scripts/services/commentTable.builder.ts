import { getRandomColor } from "../helpers/random.helpers";
import { Comment } from "../models/comment.model";
import { Point } from "../models/point.model";
import { CommentsService } from "./comments.service";

export class CommentTableBuilder {
  public build(point: Point) {
    const table = document.createElement("table");

    table.classList.add("table");
    table.classList.add("table-bordered");

    table.style.textAlign = "center";

    this.addBody(table, point);

    return table;
  }

  private addBody(table: HTMLTableElement, point: Point) {
    const tbody = document.createElement("tbody");

    this.fillBodyWithData(tbody, point);

    table.appendChild(tbody);
  }

  private fillBodyWithData(tbody: HTMLTableSectionElement, point: Point) {
    point.comments?.forEach((comment) => {
      const tr = document.createElement("tr");

      const textTd = document.createElement("td");
      textTd.textContent = comment.text;

      const button = this.createDeleteButton(() =>
        this.registerDeleteClickHandler(tbody, point, comment.id)
      );
      const buttonTd = document.createElement("td");
      buttonTd.appendChild(button);

      tr.appendChild(textTd);
      tr.appendChild(buttonTd);

      tbody.append(tr);
    });

    const tr = document.createElement("tr");

    const button = this.createAddButton(() =>
      this.registerAddClickHandler(button, tbody, point)
    );
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

    button.onclick = clickHandler;

    return button;
  }

  private createDeleteButton(clickHandler: () => void) {
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

  private registerAddClickHandler(
    button: HTMLButtonElement,
    table: HTMLTableSectionElement,
    point: Point
  ) {
    const parent = button.parentElement;
    const input = document.createElement("input");
    const commentService = new CommentsService(point);

    parent?.replaceChild(input, button);

    input.addEventListener("keyup", (event) => {
      if (event.key === "Enter") {
        const point = commentService.addComment({
          text: input.value,
          backgroundColor: getRandomColor(),
        } as Comment);

        table.innerHTML = "";
        this.fillBodyWithData(table, point);
      }
    });
  }

  private registerDeleteClickHandler(
    table: HTMLTableSectionElement,
    point: Point,
    commentId: number
  ) {
    const commentService = new CommentsService(point);

    point = commentService.deleteComment(commentId);

    table.innerHTML = "";
    this.fillBodyWithData(table, point);
  }
}
