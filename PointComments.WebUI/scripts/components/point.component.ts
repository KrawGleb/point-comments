import { Layer } from "konva/lib/Layer";
import { Circle } from "konva/lib/shapes/Circle";
import { Stage } from "konva/lib/Stage";
import { Point } from "../models/point.model";
import { PointsService } from "../services/points.service";
import { ComponentBase } from "./base.component";
import { CommentsTableComponent } from "./comments-table.component";

export class PointComponent extends ComponentBase {
  private readonly point: Point;
  private readonly commentsTable: CommentsTableComponent;
  private readonly pointsService: PointsService;
  
  private layerRef: Layer;

  constructor(point: Point) {
    super();

    this.point = point;
    this.commentsTable = new CommentsTableComponent(point.comments, this);
    this.pointsService = new PointsService();
  }

  public delete(): void {
    this.layerRef.remove();
    this.commentsTable.remove();
    this.pointsService.deleteById(this.point.id);
  }

  public async update(): Promise<void> {
    this.point.comments = this.commentsTable.getComments();

    await this.pointsService.update(this.point);
  }

  public drawOnStage(stageRef: Stage, withCommentsTable: boolean = true): void {
    this.drawCircle(stageRef);

    if (withCommentsTable) {
      this.showCommentsTable();
    }
  }

  private drawCircle(stageRef: Stage): void {
    this.layerRef = new Layer();
    let circle = new Circle({
      x: this.point.x,
      y: this.point.y,
      radius: this.point.radius,
      fill: this.point.color,
    });

    circle.on("dblclick", () => this.delete());

    this.layerRef.add(circle);
    stageRef.add(this.layerRef);
    this.layerRef.draw();
  }

  private showCommentsTable() {
    const marginBottom = 4;
    const areaPosition = {
      x: this.point.x,
      y: this.point.y + this.point.radius + marginBottom,
    };

    const divWithTable = document.createElement("div");
    divWithTable.appendChild(this.commentsTable.getTable());

    divWithTable.style.position = "absolute";
    divWithTable.style.top = areaPosition.y + "px";
    divWithTable.style.left = areaPosition.x + "px";

    document.getElementById("wrapper")?.appendChild(divWithTable);
  }
}
