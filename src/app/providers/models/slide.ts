import { Media } from "./media";
import { PubQuestion } from "./question";

export enum PubSlideType {
  Content = "content",
  Input = "input",
}

export class PubSlide {
  id: number;
  slide_type: PubSlideType;
  title: string;
  description: string;
  media?: Media;
  content?: string;
  question?: PubQuestion;
}
