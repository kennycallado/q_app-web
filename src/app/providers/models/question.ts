export class Question {
  id: number;
  question_type: QuestionType;
  content: string;
}

export class NewQuestion {
  question_type: QuestionType;
  content: NewQuestionContent
}

export class NewQuestionContent {
  locale: string;
  question: string;
}

export enum QuestionType {
  Checkbox = 'checkbox',
  Input = 'input',
  Radio = 'radio',
  Range = 'range',
}
