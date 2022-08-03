import { Layer } from "konva/lib/Layer";
import { Circle } from "konva/lib/shapes/Circle";
import { Stage, StageConfig } from "konva/lib/Stage";
import {
  getRandomColor,
  getRandomNumberInRange,
} from "../helpers/random.helpers";
import { Point } from "../models/point.model";
import { CommentTableBuilder } from "./commentTable.builder";
import { PointService } from "./point.service";

export class KonvaService {
  private readonly defaultStageConfig = {
    container: "konva-container",
    width: 1000,
    height: 750,
  } as StageConfig;

  private readonly pointService: PointService;
  private readonly commentTableBuilder: CommentTableBuilder;

  private stageConfig?: StageConfig;
  private stage: Stage;

  constructor(stageConfig?: StageConfig) {
    this.pointService = new PointService();
    this.commentTableBuilder = new CommentTableBuilder();

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
    const comments = point.comments;

    if (!comments || comments.length === 0) {
      return;
    }

    const areaPosition = {
      x: point.x,
      y: point.y + point.radius + 4,
    };

    let table = this.commentTableBuilder.build(comments);

    const div = document.createElement("div");
    div.id = `pointComment${point.id}`;
    div.style.position = "absolute";

    div.style.top = areaPosition.y + "px";
    div.style.left = areaPosition.x + "px";

    div.appendChild(table);
    document.getElementById("wrapper")?.appendChild(div);
  }

  private reloadStage() {
    this.stage.clear();
    this.initStage(this.stageConfig);
    this.fillStage();
  }

  private deletePoint(point: Point) {
    this.pointService.deleteById(point.id).then((_) => this.reloadStage());
    document.getElementById(`pointComment${point.id}`)?.remove();
  }

  private initStage(stageConfig?: StageConfig) {
    this.stageConfig = stageConfig;
    this.stage = !!stageConfig
      ? new Stage(stageConfig)
      : new Stage(this.defaultStageConfig);

    this.stage.on("click", (event) => {
      if (event.target.constructor.name === "Stage") {
        let randomRadius = getRandomNumberInRange(10, 50);
        let point = {
          x: event.evt.offsetX,
          y: event.evt.offsetY,
          radius: randomRadius,
          color: getRandomColor(),
        } as Point;

        this.pointService.add(point).then((addedPoint) => {
          this.drawPoint(addedPoint);
        });
      }
    });
  }

  private fillStage() {
    this.pointService
      .getAll()
      .then((points) => points.forEach((point) => this.drawPoint(point)));
  }
}
