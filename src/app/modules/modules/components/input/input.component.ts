import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  standalone: true,
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.sass']
})
export class InputComponent {

  @Input() type!: string;
  @Input() answer?: string;

  @Output() changeAnswer = new EventEmitter<string>();

  change(target: EventTarget | null) {
    if (!target) return ; // not sure if this is necessary

    this.answer = (target as HTMLInputElement).value;
    this.changeAnswer.emit(this.answer);
  }
}
