import { Comment } from "./comment.model";

export interface Point {
  id: number;
  x: number;
  y: number;
  radius: number;
  color: string;
  comments: Comment[];
}
