import { Layer } from "konva/lib/Layer";
import { Circle } from "konva/lib/shapes/Circle";
import { Stage, StageConfig } from "konva/lib/Stage";
import { Point } from "../models/point.model";

export class KonvaService {
  private readonly defaultStageConfig = {
    container: "container",
    width: 1000,
    height: 1000,
  } as StageConfig;

  private readonly stage: Stage;

  constructor(stageConfig?: StageConfig) {
    this.stage = !!stageConfig
      ? new Stage(stageConfig)
      : new Stage(this.defaultStageConfig);
  }

  public drawPoint(point: Point) {
    let layer = new Layer();

    let circle = new Circle({
        x: point.x,
        y: point.y,
        radius: point.radius,
        fill: point.color,
        stroke: 'black',
        strokeWidth: 1
    });

    layer.add(circle);
    this.stage.add(layer);
    layer.draw();
  }
}
