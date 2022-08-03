import { Comment } from "../models/comment.model";
import { Point } from "../models/point.model";
import { PointService } from "./point.service";

export class CommentsService {
  private readonly point: Point;
  private readonly pointService: PointService;

  constructor(point: Point) {
    this.point = point;
    this.pointService = new PointService();
  }

  public deleteComment(commentId: number): Promise<Point> {
    this.point.comments = this.point.comments.filter(
      (c) => !c.id || c.id !== commentId
    );

    return this.pointService.update(this.point);
  }

  public addComment(comment: Comment): Promise<Point> {
    this.point.comments = this.point.comments ?? [];
    this.point.comments.push(comment);

    return this.pointService.update(this.point).then((point) => point);
  }
}
