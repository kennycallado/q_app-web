import { register } from 'swiper/element/bundle'

import { CommonModule } from '@angular/common';
import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, Signal, ViewEncapsulation, inject, signal } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { PaperService } from 'src/app/providers/services/papers_api';
import { PubPaper } from 'src/app/providers/models/paper';
import { MediaComponent } from '../media/media.component';
import { InputComponent } from '../input/input.component';
import { PubAnswer } from 'src/app/providers/models/answer';

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
  #router     = inject(Router)
  #route      = inject(ActivatedRoute)
  #paperSvc   = inject(PaperService)

  paper: Signal<PubPaper>

  allowSlideNext: boolean = true;
  allowSlidePrev: boolean = true;

  reachedEnd: boolean = false;
  completed: boolean = false;

  answerFromQuestionId(question_id: number) {
    return this.paper().answers.find(a => a.question_id == question_id)
  }

  changeAnswer(answer: PubAnswer) {
    // check if the answer.question_id is already in the paper
    if (this.paper().answers.find(a => a.question_id == answer.question_id)) {
      // if it is, replace it
      this.paper().answers = this.paper().answers.map(a => {
        if (a.question_id == answer.question_id) {
          return answer
        }
        return a
      })
    } else {
      // if it is not, add it
      this.paper().answers.push(answer)
    }

    if (this.checkCompleted()) this.completed = true
    return ;
  }

  checkCompleted() {
    if (this.paper().resource.resource_type === 'module') return true
    else if (this.paper().resource.resource_type === 'slides') {
      let n_questions: number = 0

      for (const slide of this.paper().resource.content.slides) {
        if (slide.slide_type === 'input') n_questions += 1
      }

      if (n_questions == this.paper().answers.length) return true
    }

    return false
  }

  submitAndExit() {
    if (!this.checkCompleted()) return ;

    this.#paperSvc.postPaper(this.paper())
    this.reachedEnd = false

    setTimeout(() => {
      this.#paperSvc.initPapers()
    }, 2000)

    this.#router.navigate(['module'])
    return ;
  }

  reachEnd() {
    if (!this.paper) return ;
    if (this.checkCompleted()) this.completed = true

    this.reachedEnd = true;
  }

  next(text: string) {
    if (!text) return ; // prevent double execution
  }

  prev(text: string) {
    if (!text) return ; // prevent double execution
  }

  ngOnInit(): void {
    this.reachedEnd = false;
    this.completed = false;

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
