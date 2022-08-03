import { Layer } from "konva/lib/Layer";
import { Circle } from "konva/lib/shapes/Circle";
import { Stage, StageConfig } from "konva/lib/Stage";
import { Point } from "../models/point.model";
import { PointService } from "./point.service";

export class KonvaService {
  private readonly defaultStageConfig = {
    container: "konva-container",
    width: 1000,
    height: 750,
  } as StageConfig;
  private readonly pointService: PointService;
  private stageConfig?: StageConfig;
  private stage: Stage;

  constructor(stageConfig?: StageConfig) {
    this.pointService = new PointService();
   
    this.initStage(stageConfig);
  }

  public drawPoint(point: Point) {
    let layer = new Layer();

    let circle = new Circle({
      x: point.x,
      y: point.y,
      radius: point.radius,
      fill: point.color,
      name: point.id.toString(),
    });

    circle.on("click", () => {
      this.pointService.deleteById(point.id).then((_) => this.reloadStage());
    });

    layer.add(circle);
    this.stage.add(layer);
    layer.draw();
  }

  private reloadStage() {
    console.log("reload");
    this.stage.clear();
    this.initStage(this.stageConfig);
  }

  // TODO: initStage must just init and don't draw points
  private initStage(stageConfig?: StageConfig) {
    this.stageConfig = stageConfig;
    this.stage = !!stageConfig
      ? new Stage(stageConfig)
      : new Stage(this.defaultStageConfig);

    this.pointService
      .getAll()
      .then((points) => points.forEach((point) => this.drawPoint(point)));
  }
}
