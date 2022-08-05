import { KonvaEventObject } from "konva/lib/Node";
import { Stage, StageConfig } from "konva/lib/Stage";
import { POINT_DELETED_EVENT } from "../constants/point-events.constants";
import {
  getRandomColor,
  getRandomNumberInRange,
} from "../helpers/random.helpers";
import { Point } from "../models/point.model";
import { PointsService as PointsService } from "../services/points.service";
import { ComponentBase } from "./base.component";
import { PointComponent } from "./point.component";

let defaultStageConfig: StageConfig = {
  container: "konva-container",
  width: 1000,
  height: 750,
} as StageConfig;

export class StageComponent extends ComponentBase {
  private readonly pointsService: PointsService;

  private points: PointComponent[] = [];
  private stageConfig: StageConfig;
  private stageRef: Stage;

  constructor(stageConfig: StageConfig = defaultStageConfig) {
    super();

    this.stageConfig = stageConfig;
    this.pointsService = new PointsService();
  }

  public async init(): Promise<void> {
    this.initStage();

    const points = await this.pointsService.getAll();
    points.forEach((point) => {
      const pointComponent = new PointComponent(point);
      this.points.push(pointComponent);
    });

    this.reloadStage();
  }

  private initStage() {
    this.stageRef = new Stage(this.stageConfig);

    this.stageRef.on("click", (event) => {
      this.stageOnClick(event);
    });
  }

  private async stageOnClick(
    event: KonvaEventObject<MouseEvent>
  ): Promise<void> {
    if (event.target.constructor.name !== "Stage") {
      return;
    }

    const point: Point = {
      x: event.evt.offsetX,
      y: event.evt.offsetY,
      radius: getRandomNumberInRange(10, 50),
      color: getRandomColor(),
    } as Point;

    const addedPoint = await this.pointsService.add(point);
    const pointComponent = new PointComponent(addedPoint);
    this.points.push(pointComponent);
    pointComponent.drawOnStage(this.stageRef);
  }

  private reloadStage(withCommentsTable: boolean = true) {
    this.stageRef.clear();

    this.points.forEach((p) => p.drawOnStage(this.stageRef, withCommentsTable));
  }
}
