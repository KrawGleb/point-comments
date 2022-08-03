import { Comment } from "./comment.model";

export interface Point {
  x: number;
  y: number;
  radius: number;
  color: string;
  comments: Comment[];
}
