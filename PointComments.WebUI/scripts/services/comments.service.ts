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

  public deleteComment(commentId: number): Point {
    this.point.comments = this.point.comments.filter(
      (c) => !c.id || c.id !== commentId
    );

    this.pointService.update(this.point);

    return this.point;
  }

  public addComment(comment: Comment): Point {
    if (!this.point.comments || this.point.comments.length === 0) {
        comment.id = 1;
        this.point.comments = [comment];
    }
    else {
        comment.id = this.point.comments[this.point.comments.length - 1].id + 1;
        this.point.comments.push(comment);
    }

    this.pointService.update(this.point);

    return this.point;
  }
}
