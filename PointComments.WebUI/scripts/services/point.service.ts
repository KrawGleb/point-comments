import { Point } from "../models/point.model";
import { HttpService } from "./http.service";

export class PointService {
  private readonly httpService: HttpService;

  constructor() {
    this.httpService = new HttpService();
  }

  public getAll() {
    return this.httpService.get<Point[]>('point');
  }

  public getById(id: number) {
    return this.httpService.get<Point>(`point/${id}`);
  }

  public add(point: Point) {
    return this.httpService.post('point', point);
  }
}
