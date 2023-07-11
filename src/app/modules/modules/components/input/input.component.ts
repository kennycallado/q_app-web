import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PubAnswer } from 'src/app/providers/models/answer';
import { PubQuestion } from 'src/app/providers/models/question';

@Component({
  selector: 'app-input',
  standalone: true,
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.sass'],
  imports: [CommonModule]
})
export class InputComponent {

  @Input() answer?: PubAnswer
  @Input() question: PubQuestion

  @Output() changeAnswer = new EventEmitter<PubAnswer>();

  spellAnswer: string

  spell(answer: string) {
    switch (answer) {
      case '0':
        this.spellAnswer = 'N/C';
        break;
      case '1':
        this.spellAnswer = 'Nada';
        break;
      case '2':
        this.spellAnswer = 'Poco';
        break;
      case '3':
        this.spellAnswer = 'Medio';
        break;
      case '4':
        this.spellAnswer = 'Bastante';
        break;
      case '5':
        this.spellAnswer = 'Mucho';
        break;
      case '6':
        this.spellAnswer = 'Totalmente';
        break;
    }
  }

  show() {
    let answer = this.answer
    let question = this.question
    console.log({ answer })
    console.log({ question })
  }

  change(input: HTMLInputElement) {
    this.spell(input.value)

    this.answer.question_id = this.question.id;
    this.answer.answer = input.value;

    this.changeAnswer.emit(this.answer);
  }

  ngOnInit(): void {
    if (!this.answer) { this.answer = new PubAnswer() }

    this.spell(this.answer.answer)
  }
}
