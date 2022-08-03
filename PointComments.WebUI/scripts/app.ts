import { Point } from "./models/point.model";
import { KonvaService } from "./services/konva.service";
import { PointService } from "./services/point.service";

let konvaService = new KonvaService();
let pointService = new PointService();

registerClickHandler();


function registerClickHandler() {
  let clickableArea = document.getElementById("konva-container");

  document.oncontextmenu = (event) => {
    let isClickInsideArea = clickableArea?.contains(event.target as Node);

    if (isClickInsideArea) {
      event.preventDefault();
      let randomRadius = getRandomNumberInRange(10, 50);
      let point = {
        x: event.offsetX,
        y: event.offsetY,
        radius: randomRadius,
        color: getRandomColor(),
      } as Point;

      pointService.add(point).then((addedPoint) => {
        konvaService.drawPoint(addedPoint);
        konvaService.addCommentsUnderPoint(addedPoint);
      });
    }
  };
}

function getRandomNumberInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function getRandomColor(): string {
  return "#" + ((Math.random() * 0xffffff) << 0).toString(16);
}
