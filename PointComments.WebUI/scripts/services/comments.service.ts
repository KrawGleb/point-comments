import { Comment } from "../models/comment.model";
import { Point } from "../models/point.model";
import { PointsService } from "./points.service";

export class CommentsService {
  private readonly point: Point;
  private readonly pointService: PointsService;

  constructor(point: Point) {
    this.point = point;
    this.pointService = new PointsService();
  }

  public deleteComment(commentId: number): Promise<Point> {
    this.point.comments = this.point.comments.filter(
      (c) => !c.id || c.id !== commentId
    );

    const point = this.pointService.update(this.point);
    
    return point;
  }

  public async addComment(comment: Comment): Promise<Point> {
    this.point.comments = this.point.comments ?? [];
    this.point.comments.push(comment);

    const point = await this.pointService.update(this.point);

    return point;
  }
}
