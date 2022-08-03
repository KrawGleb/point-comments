import { Point } from "./models/point.model";
import { KonvaService } from "./services/konva.service";
import { PointService } from "./services/point.service";

let color = ["red", "black", "blue", "green"];

let konvaService = new KonvaService();
let pointService = new PointService();

drawSavedPoints();
registerClickHandler();

function drawSavedPoints() {
  pointService.getAll().then((points) =>
    points.forEach((point) => {
      konvaService.drawPoint(point);
    })
  );
}

function registerClickHandler() {
  let clickableArea = document.getElementById("konva-container");

  document.addEventListener("click", (event) => {
    let isClickInsideArea = clickableArea?.contains(event.target as Node);

    if (isClickInsideArea) {
      let randomRadius = getRandomNumberInRange(10, 50);
      let point = {
        x: event.offsetX,
        y: event.offsetY,
        radius: randomRadius,
        color: getRandomColor(),
      } as Point;

      konvaService.drawPoint(point);
      pointService.add(point);
    }
  });
}

function getRandomNumberInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function getRandomColor(): string {
  return "#" + ((Math.random() * 0xffffff) << 0).toString(16);
}
