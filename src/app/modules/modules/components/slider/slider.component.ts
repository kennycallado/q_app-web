import { register } from 'swiper/element/bundle'

import { CommonModule } from '@angular/common';
import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, Signal, ViewChild, ViewEncapsulation, inject, signal } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { PaperService } from 'src/app/providers/services/papers_api';
import { PubPaper, PubPaperPush } from 'src/app/providers/models/paper';
import { MediaComponent } from '../media/media.component';
import { InputComponent } from '../input/input.component';

@Component({
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.sass'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, MediaComponent, InputComponent]
})
export class SliderComponent implements OnInit, AfterViewInit{
  #router   = inject(Router)
  #route    = inject(ActivatedRoute)
  #paperSvc = inject(PaperService)

  paperPush: PubPaperPush;
  paper: Signal<PubPaper>
  answer: string

  allowSlideNext: boolean = true;
  reachedEnd: boolean = false;

  changeAnswer(answer: string) {
    switch (answer) {
      case '0':
        this.answer = 'N/C';
        break;
      case '1':
        this.answer = 'Nada';
        break;
      case '2':
        this.answer = 'Poco';
        break;
      case '3':
        this.answer = 'Medio';
        break;
      case '4':
        this.answer = 'Bastante';
        break;
      case '5':
        this.answer = 'Mucho';
        break;
      case '6':
        this.answer = 'Totalmente';
        break;
    }

    if (answer === '0') {
      // this.slide!.answer = '';
      return ;
    }

    // this.submit(); // side effect ??
    return ;
  }

  reachEnd() {
    this.reachedEnd = true;
    this.checkCompleted();
  }

  checkCompleted() {
    return true
  }

  submitAndExit() {
    /* some staffs */
    this.answer = ''
    this.#router.navigate(['/module']);
  }

  next() {
    // clean the answer
    this.answer = ''

  }

  prev() {
    // clean the answer
    this.answer = ''

  }

  ngOnInit(): void {
    this.#route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id')!);

      this.paper = signal(this.#paperSvc.papers().find(paper => paper.id == id))
      })
  }

  ngAfterViewInit(): void {
    register()
    // quizá para agregar estilos
    // const swiperEl = document.querySelector('swiper-container');
  }
}
