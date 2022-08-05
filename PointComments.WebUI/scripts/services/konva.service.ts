import { Layer } from "konva/lib/Layer";
import { Circle } from "konva/lib/shapes/Circle";
import { Stage, StageConfig } from "konva/lib/Stage";
import {
  getRandomColor,
  getRandomNumberInRange,
} from "../helpers/random.helpers";
import { Point } from "../models/point.model";
import { CommentTableBuilder as CommentsTableBuilder } from "./comment-table.builder";
import { PointsService } from "./points.service";

export class KonvaService {
  private readonly defaultStageConfig = {
    container: "konva-container",
    width: 1000,
    height: 750,
  } as StageConfig;

  private readonly pointService: PointsService;
  private readonly commentsTableBuilder: CommentsTableBuilder;

  private stageConfig?: StageConfig;
  private stage: Stage;

  constructor(stageConfig?: StageConfig) {
    this.pointService = new PointsService();
    this.commentsTableBuilder = new CommentsTableBuilder();

    this.initStage(stageConfig);
    this.fillStage();
  }

  public drawPoint(point: Point) {
    const layer = new Layer();

    let circle = new Circle({
      x: point.x,
      y: point.y,
      radius: point.radius,
      fill: point.color,
      name: point.id.toString(),
    });

    circle.on("dblclick", () => {
      this.deletePoint(point);
    });

    layer.add(circle);
    this.stage.add(layer);
    layer.draw();

    this.addCommentsUnderPoint(point);
  }

  private addCommentsUnderPoint(point: Point) {
    const marginBottom = 4;
    const areaPosition = {
      x: point.x,
      y: point.y + point.radius + marginBottom,
    };

    let table = this.commentsTableBuilder.build(point);

    const div = document.createElement("div");
    div.id = `point-comments-table-${point.id}`;
    div.classList.add("point-comments-table");
    div.style.position = "absolute";

    div.style.top = areaPosition.y + "px";
    div.style.left = areaPosition.x + "px";

    div.appendChild(table);
    document.getElementById("wrapper")?.appendChild(div);
  }

  private async reloadStage() {
    this.stage.clear();
    this.deleteAllCommentsTables();

    this.initStage(this.stageConfig);
    await this.fillStage();
  }

  private async deletePoint(point: Point) {
    this.deleteCommentsTable(point);

    await this.pointService.deleteById(point.id);
    await this.reloadStage();
  }

  private deleteCommentsTable(point: Point) {
    const commentsTable = document.getElementById(
      `point-comments-table-${point.id}`
    );
    commentsTable?.parentNode?.removeChild(commentsTable);
  }

  private deleteAllCommentsTables() {
    const tables = document.querySelectorAll(".point-comments-table");
    tables.forEach((table) => table.parentNode?.removeChild(table));
  }

  private initStage(stageConfig?: StageConfig) {
    this.stageConfig = stageConfig;
    this.stage = !!stageConfig
      ? new Stage(stageConfig)
      : new Stage(this.defaultStageConfig);

    this.stage.on("click", async (event) => {
      if (event.target.constructor.name === "Stage") {
        let randomRadius = getRandomNumberInRange(10, 50);
        let point = {
          x: event.evt.offsetX,
          y: event.evt.offsetY,
          radius: randomRadius,
          color: getRandomColor(),
        } as Point;

        const addedPoint = await this.pointService.add(point);
        this.drawPoint(addedPoint);
      }
    });
  }

  private async fillStage() {
    const points = await this.pointService.getAll();
    points.forEach((point) => this.drawPoint(point));
  }
}
