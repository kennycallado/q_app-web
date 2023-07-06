import { register } from 'swiper/element/bundle'

import { CommonModule } from '@angular/common';
import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, Signal, ViewEncapsulation, inject, signal } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { DEFAULT_PICTURE_URL } from 'src/app/providers/constants';
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
  // imports: [CommonModule, InputComponent, MediaComponent],
  imports: [CommonModule, MediaComponent]
})
export class SliderComponent implements OnInit, AfterViewInit{
  #router   = inject(Router)
  #route    = inject(ActivatedRoute)
  #paperSvc = inject(PaperService)

  paper: Signal<PubPaper>
  answer: string = ''

  // timeStamp: number = Date.now()
  // default_picture = DEFAULT_PICTURE_URL

  allowSlideNext: boolean = true;
  reachedEnd: boolean = false;

  reachEnd() {
    this.reachedEnd = true;
    this.checkCompleted();
  }

  checkCompleted() {
    return true
  }

  submitAndExit() {
    /* some staffs */
    this.#router.navigate(['/module']);
  }

  next(event: string) {
    // clean the answer
    this.answer = ''

  }

  prev(event: string) {
    // clean the answer
    this.answer = ''

  }

  showResource() {
    console.log(this.paper())
  }

  ngOnInit(): void {
    this.#route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id')!);

      this.paper = signal(this.#paperSvc.papers().find(paper => paper.id == id))
      })
  }

  ngAfterViewInit(): void {
    register()
  }
}
