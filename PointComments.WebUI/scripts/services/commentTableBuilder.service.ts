import { Comment } from "../models/comment.model";

export class CommentTableBuilder {
    public buildTable(comments: Comment[]) {
        let table = document.createElement("table");
        table.classList.add("table");

        this.addBody(table, comments)

        return table;
    }


    private addBody(table: HTMLTableElement, comments: Comment[]) 
    {
        let tbody = document.createElement("tbody");

        this.fillBodyWithData(tbody, comments);

        table.appendChild(tbody);
    }

    private fillBodyWithData(tbody: HTMLTableSectionElement, comments: Comment[]) 
    {
        comments.forEach(comment => {
            let tr = document.createElement("tr");
            let td = document.createElement("td");
            td.textContent = comment.text;

            tr.appendChild(td);
            tbody.append(tr);
        })
    }
}