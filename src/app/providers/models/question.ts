export enum PubQuestionType {
  Checkbox = "checkbox",
  Input = "input",
  Radio = "radio",
  Range = "range",
}

export class PubQuestion {
  id: number;
  question_type: PubQuestionType;
  question: string;
}
