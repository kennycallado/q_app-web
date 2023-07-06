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
  content?: string;
  question?: PubQuestion;
}
