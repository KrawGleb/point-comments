import { Point } from "../models/point.model";
import { HttpService } from "./http.service";

export class PointService {
    private readonly httpService: HttpService;

    constructor() {
        this.httpService = new HttpService();
    }

    public getAll(): Promise<Point[]> {
        return this.httpService.get<Point[]>("point");
    }
}