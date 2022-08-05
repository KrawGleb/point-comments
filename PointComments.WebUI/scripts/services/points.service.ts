import { Point } from "../models/point.model";
import { HttpService } from "./http.service";

export class PointsService {
  private readonly httpService: HttpService;

  constructor() {
    this.httpService = new HttpService();
  }

  public getAll() {
    return this.httpService.get<Point[]>("points");
  }

  public getById(id: number) {
    return this.httpService.get<Point>(`points/${id}`);
  }

  public add(point: Point) {
    return this.httpService.post<Point>("points", point);
  }

  public deleteById(id: number) {
    return this.httpService.delete<Point>(`points/${id}`);
  }

  public update(point: Point) {
    return this.httpService.put<Point>("points", point);
  }
}
