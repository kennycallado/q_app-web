import { register } from 'swiper/element/bundle'

import { CommonModule } from '@angular/common';
import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, Signal, ViewEncapsulation, inject, signal } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { PaperService } from 'src/app/providers/services/papers_api';
import { PubPaper } from 'src/app/providers/models/paper';
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
export class FormsComponent implements OnInit, AfterViewInit{
  #router     = inject(Router)
  #route      = inject(ActivatedRoute)
  #paperSvc   = inject(PaperService)

  paper: Signal<PubPaper>
  answer: string

  allowSlideNext: boolean = true;
  reachedEnd: boolean = false;

  ngOnInit(): void {
    this.#route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id')!);

      this.paper = signal(this.#paperSvc.papers().find(paper => paper.id == id))
      console.log(this.paper())
    })
  }

  ngAfterViewInit(): void {
    register()
    // quizá para agregar estilos
    // const swiperEl = document.querySelector('swiper-container');
  }
}
