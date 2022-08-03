import { KonvaService } from "./services/konva.service";
import { PointService } from "./services/point.service";

let konvaService = new KonvaService();
let pointService = new PointService();

pointService
  .getAll()
  .then((points) => points.forEach((point) => konvaService.drawPoint(point)));
